import React,{useState} from 'react'

const AdminAddNewMultipleChoise = ({choosedQuiz, setAddNewMultipleChoise, sendUpdateToServer, cancelUpdate, index}) => {
    const[multipleChoise, setMultipleChoise] = useState("")

    const handleAddNewMultipleChoise = (e) =>{
        setMultipleChoise(e.target.value)
    }

    const submitAddNewMultipleChoise =(e)=>{
        e.preventDefault()
            const choosedQuizCopy = choosedQuiz
            choosedQuizCopy.multipleChoise[index].choises.push(multipleChoise)
            setAddNewMultipleChoise(false)
        sendUpdateToServer()
    }

    const cancelAddMultipleChoise = ()=>{
        setAddNewMultipleChoise(false)
        cancelUpdate()
    }
    return (
        <div>
           <form>
                <input type="text" name="multipleChoise" onChange={handleAddNewMultipleChoise}  required />
                <button type="submit" onClick={submitAddNewMultipleChoise}>Submit</button>
                <button onClick={cancelAddMultipleChoise}>Cancel</button>
            </form>        
        </div>
    )
}

export default AdminAddNewMultipleChoise
