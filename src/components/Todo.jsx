import React from "react";
import { BsTrash } from "react-icons/bs";
import { db } from "@/utils/Firebase";

const Todo = ({ todo, user }) => {
  const handleDelete = async (todoId) => {
    const userTodoCollection = db
      .collection("users")
      .doc(user)
      .collection("todos");
    await userTodoCollection.doc(todoId).delete();
  };

  const toggleComplete = async (todoId) => {
    const userTodoCollection = db
      .collection("users")
      .doc(user)
      .collection("todos");
    await userTodoCollection.doc(todoId).update({
      completed: !todo.completed,
    });
  };

  return (
    <li
      className={`flex justify-between bg-slate-200 ${
        todo.completed && "bg-slate-400"
      } p-4 my-2 capitalize`}
    >
      <div className="flex gap-3">
        <input
          onChange={() => toggleComplete(todo.id)}
          checked={todo.completed ? true : false}
          type="checkbox"
          className="cursor-pointer"
        />
        <p
          onClick={() => toggleComplete(todo.id)}
          className={`${todo.completed && "line-through"} cursor-pointer`}
        >
          {todo.todoText}
        </p>
      </div>
      <button className="flex items-center cursor-pointer">
        <BsTrash
          size={20}
          onClick={() => {
            handleDelete(todo.id);
          }}
        />
      </button>
    </li>
  );
};

export default Todo;
