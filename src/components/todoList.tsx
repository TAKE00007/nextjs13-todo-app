"use client";
import { useState } from "react";

type TodoListProps = {
    defaultTitle: string;
    defaultTodos: string[];
}

export const TodoList = ({ defaultTitle="今日やること", defaultTodos = ["買い物", "タスク整理", ""] }: TodoListProps) => {
    const [isEditing, setIsEditing] = useState(false);// 編集モードの状態
    const [todoText, setTodoText] = useState("");
    const [title, setTitle] = useState(defaultTitle);
    const [todos, setTodos] = useState(defaultTodos);
    const [editingIndex, setEditingIndex] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [completeTodos, setCompleteTodos] = useState(new Set());

    const onChangeTodoText = (event : String) => setTodoText(event.target.value);//evetの値がtodoTextと同じ
    const onClickAdd= () => {
        if (todoText === "") return;
        const newTodos = [...todos, todoText];
        setTodos(newTodos);
        setTodoText("");
    }
    const toggleComplete = (index : Number) => {
        setCompleteTodos((prev) => {
          const newCompleted = new Set(prev);
          // indexがすでに完了リストにある場合は削除、なければ追加
          if (newCompleted.has(index)) {
            newCompleted.delete(index);
          } else {
            newCompleted.add(index);
          }
          return newCompleted;
        })
      }
    
    const handleEdit = (index) => {
    setEditingIndex(index);
    setInputValue(todos[index]);
    }

    const handleChange = (e) => {
    setInputValue(e.target.value);
    }

    const handleBlurOrEnter = (index) => {
    if (inputValue.trim() === "") return;

    const newTodos = [...todos];
    newTodos[index] = inputValue;

    if (index === todos.length-1) {
        newTodos.push("");//最後の空タスクを編集した場合、新しいからタスクを追加
    }

    setTodos(newTodos);
    setEditingIndex(null);
    setInputValue("");
    }

    return (
        <div className="border-2 border-gray-500 rounded-lg m-2 w-xs">
            <h2
                className="text-center m-3 font-semibold cursor-pointer hover:underline hover:text-blue-500 hover:font-bold"
                onClick={(e) => {
                e.stopPropagation(); // クリックイベントの伝播を止める
                setIsEditing(true)
                }} // タイトルをクリックで編集モードに
            >
                    {title}
            </h2>

            <ul className="flex-row m-2">
                {todos.map((todo, index) => {
                    return (
                    <li key={index} className="flex space-x-2">
                        <input 
                        type="checkbox" 
                        checked={completeTodos.has(index)} // チェックをするとtrueになる
                        onChange={ () => {toggleComplete(index)}}
                        />
                        {editingIndex === index ? (
                        <input
                            type="text"
                            value={inputValue}
                            autoFocus
                            onChange={handleChange}
                            onBlur={() => handleBlurOrEnter(index)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") handleBlurOrEnter(index);
                            }}
                        />
                        ) : (
                        <span
                            className={`cursor-pointer ${
                            todo === "" ? "text-gray-500 font-bold hover:underline hover:text-blue-500" : "" 
                            } ${
                            completeTodos.has(index) ? "line-through text-gray-500" : ""
                            }`}  
                            onClick={() => handleEdit(index)}
                        >
                            {todo || "+ 新しいタスク"}
                        </span>
                        )}  
                    </li>
                    )
                })}
            </ul>
            </div>
    )}

    export default TodoList;
