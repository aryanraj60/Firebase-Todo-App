import Head from "next/head";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
import { TodoApp } from "@/components/TodoApp";
import { db } from "@/utils/Firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="App p-4 h-screen bg-gradient-to-r from-[#3f5efb] to-[#fc466b]">
      <TodoApp user={user} />
    </div>
  );
}
