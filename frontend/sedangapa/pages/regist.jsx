import Link from "next/link";
import { useState } from "react";

export default function RegistPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    username: username,
    email: email,
    password: password,
  };
  console.log(data);

  return (
    <div className=" font-quick bg-slate-400 h-screen w-screen flex  flex-col justify-center">
      <div className="">
        <div className=" flex justify-center -translate-y-10">
          <h1 className=" text-3xl">Create account</h1>
        </div>
        <div className=" flex justify-center">
          <form
            className=" w-[350px] h-[300px] pl-6 pr-6 rounded-xl bg-cyan-600 shadow-xl flex flex-col gap-2 justify-center"
            action="#"
          >
            <input
              className=" p-2 rounded-lg focus:outline-none bg-slate-300"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className=" p-2 rounded-lg focus:outline-none bg-slate-300"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className=" p-2 rounded-lg focus:outline-none bg-slate-300"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className=" flex focus: justify-center">
              <button className=" bg-slate-300 p-2 rounded-lg">create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
