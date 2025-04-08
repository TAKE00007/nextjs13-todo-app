"use client";
import TodoList from "@/components/todoList";
import Head from "next/head";
import Image from "next/image";
import { ServerInsertedHTMLContext } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [todoLists, setTodoLists] = useState<string[]>(["今日やること"]);
  const [isEditing, setIsEditing] = useState(false);// 編集モードの状態
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["買い物", "タスク整理", ""]);
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
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <main>
        <h1 className="font-bold m-2">ToDO</h1>
        <div>
          <input type="text" placeholder="新しいタイトルを入力" value={todoText} onChange={onChangeTodoText}/>
          <button onClick={onClickAdd}>追加</button>
        </div>

        <TodoList />

      </main>
  </>
  );
}
