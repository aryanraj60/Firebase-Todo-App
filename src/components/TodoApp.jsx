import React, { useEffect, useState } from "react";
import Todo from "@/components/Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "@/utils/Firebase";
export const TodoApp = ({ user }) => {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoItem) {
      db.collection("users").doc(user).collection("todos").add({
        todoText: todoItem,
        completed: false,
      });
      setTodoItem("");
    }
  };

  useEffect(() => {
    const todoRef = db.collection("users").doc(user).collection("todos");
    const unsubscribe = todoRef.onSnapshot((snapshot) => {
      let allTodos = [];
      snapshot.docs.map((doc) => {
        allTodos.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTodos(allTodos);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-slate-100 max-w-[600px] h-full overflow-y-auto m-auto w-full rounded-md shadow-xl p-4">
      <div>
        <h3 className="text-3xl font-bold text-center text-blue-800 p-2">
          Todo App
        </h3>
        <form className="flex justify-between gap-2" onSubmit={handleSubmit}>
          <input
            className="p-2 w-full text-xl outline-none rounded-md border"
            type="text"
            placeholder="Add Todo"
            value={todoItem}
            onChange={(e) => {
              setTodoItem(e.target.value);
            }}
          />
          <button className="p-2 border" type="submit">
            <AiOutlinePlus size={25} />
          </button>
        </form>
        <ul>
          {todos?.map((todo) => (
            <Todo key={todo.id} todo={todo} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};
