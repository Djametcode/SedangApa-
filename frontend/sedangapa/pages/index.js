import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginData = {
    email: email,
    password: password,
  };
  console.log(loginData);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v9/sedang-apa/login",
        loginData
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" font-quick h-screen w-screen flex flex-col justify-center bg-slate-200">
      <div className=" flex justify-center">
        <form
          className=" w-[400px] h-[400px] rounded-xl shadow-lg bg-slate-200 flex flex-col gap-2 justify-center pl-20 pr-20"
          action="#"
        >
          <div className=" -translate-y-9 flex justify-center text-2xl font-extrabold">
            <h1>Login</h1>
          </div>
          <input
            className=" p-2 rounded-xl focus:outline-none"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" p-2 rounded-xl focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className=" flex justify-center">
            <button
              onClick={handleLogin}
              className=" bg-slate-100 p-2 rounded-xl text-sm"
            >
              Login
            </button>
          </div>
          <div className=" text-center text-xs flex justify-center gap-2">
            <p>Bekum punya akun? </p>
            <Link href="/regist">Buat akun disini</Link>
          </div>
        </form>
      </div>
      <div className=" absolute bottom-5 flex justify-center w-screen gap-3 text-sm">
        <p>&copy; copyright 2023</p>
        <p>Djamet Coder</p>
      </div>
    </div>
  );
}
