import React, { useState } from "react";


function ToDoList() {
    const [todo, setToDo] = useState([]);
    const [task, setTask] = useState("");

    function handleAddToDo() {
        if (task.trim() != "") {
            const todos = {task:task,status: false};
            setToDo(prevToDo =>[...prevToDo,todos]);
        }
    }
    function handelDeleteToDo(index) {
        const updatedToDo = todo.filter((_, i) => i !== index);
        setToDo(updatedToDo);
    }
    function handelUpToDo(index) {}
    function handelDownToDo(index) {}
    function handelStatusToDo() {}
    return (
        <>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAddToDo}>Add</button>
        
        <ul>
            {todo.map((item,index) => (
                <li key={index}>
                {item.task}
                <button onClick={()=>handelDeleteToDo(index)}>Delete</button>
                <button onClick={()=>handelUpToDo(index)}>Up</button>
                <button onClick={()=>handelDownToDo(index)}>Down</button>
                <button onClick={handelStatusToDo}>Status</button>
                </li>
            ))}
        </ul>
        </>
    );
}
export default ToDoList;