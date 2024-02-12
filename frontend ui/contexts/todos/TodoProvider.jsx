import React, { useState } from "react";
import TodoContext from "./TodoContext";

const TodoProvider = ({ children }) => {
    const randomColors = ['#AB5A5C', '#602899', '#E8088A', '#0F1283', '#F62D17'];
    const randomQuotes = [
        "The only way to do great work is to love what you do.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "The only source of knowledge is experience.",
        "The only thing we have to fear is fear itself.",
    ];

    const [todos, setTodos] = useState([]);
    const [createTodo, setTodo] = useState({
        title : '',
        description : '',
        userId : '',
        completed : false
    });

    const [triggerReload , setTriggerReload] = useState(true);

    return (<TodoContext.Provider
        value={{ todos, setTodos , randomColors, randomQuotes,createTodo, setTodo,triggerReload , setTriggerReload}}
    >
        {children}
    </TodoContext.Provider>);
}

export default TodoProvider;