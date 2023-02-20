import React from "react";
import { auth, provider } from "@/utils/Firebase";

const Login = ({ setUser }) => {
  const handleLogin = () => {
    auth.signInWithPopup(provider).then((result) => {
      setUser(result.user.uid);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-slate-200">
      <div>
        <button
          onClick={handleLogin}
          className="px-3 py-2 bg-blue-600 text-xl rounded-lg"
        >
          SignIn With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
