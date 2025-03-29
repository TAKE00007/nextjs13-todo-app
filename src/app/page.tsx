"use client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["買い物", "タスク整理"]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);//evetの値がtodoTextと同じ
  const onClickAdd= () => {
    if (todoText === "") return;
    const newTodos = [...todos, todoText];
    setTodos(newTodos);
    setTodoText("");
  }
  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <main>
        <h1 className="font-bold m-2">ToDO</h1>
        <div className="flex m-2">
          <input type="text" placeholder="新しいタスクを入力" value={todoText} onChange={onChangeTodoText}/>
          <button onClick={onClickAdd}>追加</button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg m-2 w-xs">
          <h2 className="text-center m-3 font-semibold">今日やること</h2>
          <ul className="flex-row m-2">
            {todos.map((todo) => {
              return (
                <div className="flex m-2">
                  <input type="checkbox" />
                  <li key={todo}>{todo}</li>
                </div>
              )
            })}
          </ul>
        </div>
        <div className="border-2 border-gray-500 rounded-lg m-2 w-xs">
          <h2 className="text-center m-3 font-semibold">仕事</h2>
          <ul>
            <div className="flex m-2">
              <input type="checkbox" />
              <li>タスク整理</li>
            </div>
          </ul>
        </div>

        
      </main>
  </>
  );
}
