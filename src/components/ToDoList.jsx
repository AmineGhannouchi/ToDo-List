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
    function handelUpToDo(index) {
        if (index === 0) return;
        [todo[index],todo[index-1]] = [todo[index-1],todo[index]];
        setToDo([...todo]);
    }
    function handelDownToDo(index) {
        if (index === todo.length - 1) return;
        [todo[index],todo[index+1]] = [todo[index+1],todo[index]];
        setToDo([...todo]);

    }
    function handelStatusToDo(index) {
        todo[index].status = !todo[index].status;
        setToDo([...todo]);
        if (todo[index].status) {
            document.getElementsByClassName("v"+index)[0].style.textDecoration = "line-through";
        }else{
            document.getElementsByClassName("v"+index)[0].style.textDecoration = "none";
        }

    }
    return (
        <>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAddToDo}>Add</button>
        
        <ul>
            {todo.map((item,index) => (
                <li className={"v"+index} key={index}>
                {item.task}
                <button onClick={()=>handelDeleteToDo(index)}>Delete</button>
                <button onClick={()=>handelUpToDo(index)}>Up</button>
                <button onClick={()=>handelDownToDo(index)}>Down</button>
                <button onClick={()=>handelStatusToDo(index)}>Status</button>
                </li>
            ))}
        </ul>
        </>
    );
}
export default ToDoList;