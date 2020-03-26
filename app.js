const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const app = express()
app.use(cors())

/*
mongoose.connect("mongodb://127.0.0.1:27017/quiz", {useNewUrlParser: true ,
                                                            useCreateIndex:true ,
                                                            useFindAndModify:false,
                                                            useUnifiedTopology: true}).catch(error=>console.log(error));
*/
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/quiz",{
                                                                                useNewUrlParser: true ,
                                                                                useCreateIndex:true ,
                                                                                useFindAndModify:false,
                                                                                useUnifiedTopology: true
                                                                                    }) 
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

app.use(express.json());

// INSERT QUIZ TO DATABASE
app.post("/enterQuiz", async (req,res)=>{
    try{
       // console.log(req.body)
        
        const newQuiz = new Quiz(req.body)
        await newQuiz.save()
        res.status(201).json({msg:"Quiz has been added to the database"})
        
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }   
})

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

// UPDATE QUIZ
app.put("/updateQuiz/:id", async(req,res)=>{
    try{
       const quiz_id = req.params.id
      
       const{question, multipleChoise, answer} = req.body
    
       const quiz = await Quiz.findOne({quiz_id})

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