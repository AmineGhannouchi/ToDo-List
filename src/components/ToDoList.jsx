import React, { useState } from "react";
import "./ToDoList.css";

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
            document.getElementById("id"+index).innerHTML = "❌";
        }else{
            document.getElementsByClassName("v"+index)[0].style.textDecoration = "none";
            document.getElementById("id"+index).innerHTML = "✅";
        }

    }
    return (
        <>
        <h1>ToDo List</h1>
        <input type="text" onChange={(e) => setTask(e.target.value)} placeholder="add element" />
        <button onClick={handleAddToDo}>Add</button>
        <table>
            <tr>
                <th>task</th>
                <th>delete</th>
                <th>up</th>
                <th>down</th>
                <th>status</th>
            </tr>
            {todo.map((item,index) => (
                <tr className={"v"+index} key={index}>
                    <td>{item.task}</td>
                    <td><button onClick={()=>handelDeleteToDo(index)}>🚮</button></td>
                    <td><button onClick={()=>handelUpToDo(index)}>👆</button></td>
                    <td><button onClick={()=>handelDownToDo(index)}>👇</button></td>
                    <td><button id={"id"+index} onClick={()=>handelStatusToDo(index)}>✅</button></td>
                </tr>
            ))}
        
        </table>
        </>
    );
}
export default ToDoList;