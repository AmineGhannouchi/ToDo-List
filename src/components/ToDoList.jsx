import React, { useState ,useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
    const [todo, setToDo] = useState(() => {
        const savedTasks = localStorage.getItem("todo");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    // Sauvegarde automatique dans localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    function handleAddToDo() {
        if (task.trim() != "") {
            const todos = {task:task,status: false};
            setToDo(prevToDo =>[...prevToDo,todos]);
            document.getElementById("inputNewTask").value = "";
        }
    }
    function handelDeleteToDo(index) {
        const updatedToDo = todo.filter((_, i) => i !== index);
        setToDo(updatedToDo);
    }
    function handelUpToDo(index) {
        if (index === 0) return;
        const updatedToDo = [...todo];

        [updatedToDo[index],updatedToDo[index-1]] = [updatedToDo[index-1],updatedToDo[index]];
        setToDo(updatedToDo);
    }
    function handelDownToDo(index) {
        if (index === todo.length - 1) return;
        const updatedToDo= [...todo];
        [updatedToDo[index],updatedToDo[index+1]] = [updatedToDo[index+1],updatedToDo[index]];
        setToDo(updatedToDo);
    }

    function handelEditToDo(index) {
        //create an input to change emement
        const table = document.getElementsByClassName("v"+index);
        const input = document.createElement("input");
        table[0].children[0].style.display="none";
        input.value = todo[index].task;
        table[0].insertBefore(input, table[0].firstChild);

        input.focus();

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                const tempTodo=[...todo]; //copy of todo
                tempTodo[index].task = input.value;
                table[0].removeChild(input);
                table[0].children[0].style.display="block";

                setToDo(tempTodo);
            }
        }
    }


    function handelStatusToDo(index) {
        todo[index].status = !todo[index].status;
        setToDo([...todo]);
        if (todo[index].status) {
            document.getElementById("id"+index).innerHTML = "❌";
        }else{
            document.getElementById("id"+index).innerHTML = "✅";
        }
    }
    return (
        <>
        <h1>ToDo List</h1>
        <input id="inputNewTask" onKeyDown={(e) => e.key === "Enter" && handleAddToDo()} type="text" onChange={(e) => setTask(e.target.value)} placeholder="add element" />
        <button onClick={handleAddToDo}>Add</button>
        <table>
            <thead>
                <tr>
                    <th>task</th>
                    <th>delete</th>
                    <th>up</th>
                    <th>down</th>
                    <th>edit</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {todo.map((item,index) => (
                    <tr className={"v"+index} key={index}>
                        <td>
                            <p style={{ textDecoration: item.status ? "line-through" : "none" }}>{item.task}</p>
                        </td>
                        <td><button onClick={()=>handelDeleteToDo(index)}>🚮</button></td>
                        <td><button onClick={()=>handelUpToDo(index)}>👆</button></td>
                        <td><button onClick={()=>handelDownToDo(index)}>👇</button></td>
                        <td><button id={"edit"+index} onClick={()=>handelEditToDo(index)}>📝</button></td>
                        <td><button id={"id"+index} onClick={()=>handelStatusToDo(index)}>✅</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}
export default ToDoList;