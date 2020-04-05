const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config()
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const app = express()
app.use(cors())

const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/quiz",{
                                                                                useNewUrlParser: true ,
                                                                                useCreateIndex:true ,
                                                                                useFindAndModify:false,
                                                                                useUnifiedTopology: true
                                                                                    }) 

/* QUIZ MODEL*/
autoIncrement.initialize(connection); 

const quizSchema = new Schema({

    quiz_id:{
        type:Number
    },
    quizTittle:{
        type:String
        //required:true,
        //trim:true
    },
    question:{
        type:Array
    },
    multipleChoise:{
        type:Array
    },
    answer:{
       type:Array
    }
})

quizSchema.plugin(autoIncrement.plugin, {
    model:'quiz',
    field: 'quiz_id', 
    startAt: 1, 
    increment: 1 
   });

const Quiz = connection.model("quiz", quizSchema)
/* QUIZ MODEL*/

/* ADMINUSERS MODEL*/
const adminUserSchema = new Schema({

    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },    
})

const adminUser = connection.model("adminusers", adminUserSchema)
/* ADMINUSERS MODEL*/

app.use(express.json());

const auth = async(req, res, next)=>{
    const token=req.header("x-auth-token");
    //console.log(token)
        if(!token){
            return res.status(401).json({msg:"Access denied"})
        }
        try{
            const decoded=jwt.verify(token, process.env.JWT_SECRET)
                const isAuthenticated=decoded.isAdmin;
                    if(!isAuthenticated){
                        return res.status(401).json({msg:"Access denied"})
                    }
               
                next();
        }catch(error){
            console.log(error)
            res.status(500).json({msg:"Server Error"})
        } 
}

//GET ALL QUIZES FROMDATABASE 
app.get("/getAllQuiz", async(req, res)=>{
    try{
        const allQuiz = await Quiz.find({},"-answer")
            if(!allQuiz){
                return res.status(404).json({msg:"There are 0 quiz at the momment"})
            }
        return res.status(200).json(allQuiz)
        
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }   
})

//GET CORRECT ANSWER BY QUIZ
app.get("/getCorrectAnswer/:quiz_id", async(req, res)=>{
    const quiz_id = req.params.quiz_id
    const {submittedAnswer, innerIndex} = req.query
    //console.log(quiz_id, submittedAnswer, quizIndex, innerIndex)
    try{
        const quiz = await Quiz.findOne({quiz_id})
        const correctAnswer = quiz.answer[innerIndex]
            //console.log(submittedAnswer, correctAnswer)
            if(submittedAnswer === correctAnswer){
                return res.status(200).json({msg:"submitted answer is correct"})
            }else{
                return res.status(200).json({msg:"submitted answer is wrong"})
            }
       
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }      
})


//ADMIN DASHBOARD
//GET ALL QUIZES FROM DATABASE ADMIN DASHBOARD

app.get("/getAllQuiz/admin", async(req, res)=>{
    try{
        const allQuiz = await Quiz.find({})
            if(!allQuiz){
                return res.status(404).json({msg:"There are 0 quiz at the momment"})
            }
        return res.status(200).json(allQuiz)
        
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }   
})

//INSERT ADMIN USER TO DATABASE
app.post("/admin-signUp", async(req, res)=>{
    try{
        const {username, password}=req.body;
        const salt= await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

            const credentials = await new adminUser({username, password:hashedPassword})
           
            await credentials.save()

            res.status(201).json(credentials)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
})

//LOGIN ADMIN USER
app.post("/admin-login", async(req, res)=>{
    console.log("hittt")
    try{
        const {username,password}=req.body
      
        const foundUsername = await adminUser.findOne({username})
      
            if(!foundUsername){
                return res.status(401).json({msg:"Invalid Credentials"})
            }

            const passwordIsMatch= await bcrypt.compare(password, foundUsername.password)

            if(!passwordIsMatch){
                return res.status(401).json({msg:"Invalid Credentials"})
            }
            const payload={
                id:foundUsername._id,
                isAdmin:true
            }

            jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"10h"},(error, token)=>{
                if(error){
                    throw new Error;
                }
               
                res.status(200).json({token})
            })
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
})

// INSERT QUIZ TO DATABASE
app.post("/enterQuiz", auth , async (req,res)=>{
    try{
        console.log(req.body)
        const {quizTittle , finalQuestion, finalMultipleChoise, finalAnswer} = req.body

            if(quizTittle ==="" || finalQuestion.length === 0 || finalMultipleChoise.length=== 0 || finalAnswer.length ===0){
                return res.status(400).json({msg:"Quiz data were not ok! Please submit all forms "})
            }
            for(let i =0 ; i <finalMultipleChoise.length ; i++){
                if(finalMultipleChoise[i].choises.length < 2){
                    return res.status(400).json({msg:"Quiz data were not ok! Please submit all forms "})
                }
            }
            // if(finalQuestion.length !==finalMultipleChoise.length !==finalAnswer.length){
            //     return res.status(400).json({msg:"Quiz data were not ok! Please submit all forms "})
            // }
/*
            const areEqual=()=>{
                var len = arguments.length;
                for (let i = 1; i< len; i++){
                    console.log(arguments[i], arguments[i-1])
                   if ( arguments[i] !== arguments[i-1])
                      return false;
                }
                return true;
            }

            const equal= areEqual(finalQuestion.length, finalMultipleChoise.length, finalAnswer.length)

            if(equal === false){
                console.log(finalQuestion.length, finalMultipleChoise.length, finalAnswer.length)
                return res.status(400).json({msg:"Quiz data were not ok! Please submit all forms "})
            }
*/
            if(finalQuestion.length !== finalMultipleChoise.length || finalMultipleChoise.length !==finalAnswer.length || finalAnswer.length !==finalQuestion.length ){
                return res.status(400).json({msg:"Quiz data were not ok! Please submit all forms "})
            }

        const quiz = {}
        quiz.quizTittle = quizTittle
        quiz.question = finalQuestion
        quiz.multipleChoise= finalMultipleChoise
        quiz.answer = finalAnswer

        const newQuiz = new Quiz(quiz)
        const submittedQuiz = await newQuiz.save()
        res.status(201).json({msg:"Quiz has been added to the database", quiz:submittedQuiz})
        
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }   
})

// UPDATE QUIZ
app.put("/updateQuiz/:id", auth , async(req,res)=>{
    try{
       const quiz_id = req.params.id
      
       const{quizTittle, question, multipleChoise, answer} = req.body
    
       const quiz = await Quiz.findOne({quiz_id})
       
       quiz.quizTittle.push(quizTittle)
       quiz.question.push(question)
       quiz.multipleChoise.push(multipleChoise)
       quiz.answer.push(answer)

       const updatedQuiz = await Quiz.findOneAndUpdate(quiz_id, {question:quiz.question,
                                                                 multipleChoise: quiz.multipleChoise,
                                                                  answer: quiz.answer}, {new: true})
            res.status(200).json(updatedQuiz)
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }  
})


const port = 5000
app.listen(port, ()=>{
    console.log(`quiz server has started at port  ${port}`)
})