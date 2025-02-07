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

    function handelEditToDo(index) {
        //create an input to change emement
        const input = document.createElement("input");
        const p = document.getElementsByClassName("v"+index)[0].children[0];
        document.getElementsByClassName("v"+index)[0].removeChild(p);
        input.value = todo[index].task;
        document.getElementsByClassName("v"+index)[0].insertBefore(input, document.getElementsByClassName("v"+index)[0].firstChild);

        input.focus();
        input.onblur = () => {
            todo[index].task = input.value;
            setToDo([...todo]);
            //remove input
            document.getElementsByClassName("v"+index)[0].removeChild(input);
            //adding a first child in classname "v"+index with value "task"
            const p = document.createElement("p");
            p.innerHTML = todo[index].task;
            //adding p in first place of class "v"+index with value of task
            document.getElementsByClassName("v"+index)[0].insertBefore(p, document.getElementsByClassName("v"+index)[0].firstChild);

        }
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
                    <td>
                        <p>{item.task}</p>
                    </td>
                    <td><button onClick={()=>handelDeleteToDo(index)}>🚮</button></td>
                    <td><button onClick={()=>handelUpToDo(index)}>👆</button></td>
                    <td><button onClick={()=>handelDownToDo(index)}>👇</button></td>
                    <td><button onClick={()=>handelEditToDo(index)}>📝</button></td>
                    <td><button id={"id"+index} onClick={()=>handelStatusToDo(index)}>✅</button></td>
                </tr>
            ))}
        
        </table>
        </>
    );
}
export default ToDoList;