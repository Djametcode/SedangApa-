import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Regist() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [text, toggleText] = useState(false);
  const [warning, setWarning] = useState();

  const route = useRouter();

  const formData = {
    username: username,
    email: email,
    password: password,
  };

  const registAccount = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v9/sedang-apa/regist",
        formData
      );
      const result = await response.data;
      const { msg, data } = result;
      await setWarning(msg);
      await toggleText(true);
      setInterval(() => {
        route.push("/");
      }, 3000);
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
            <h1>Create Account</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            className=" text-sm p-2 rounded-xl focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className=" text-sm p-2 rounded-xl focus:outline-none"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" text-sm p-2 rounded-xl focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className=" flex justify-center">
            <button
              onClick={registAccount}
              className=" bg-slate-100 p-2 rounded-xl text-sm"
            >
              Create
            </button>
          </div>
          <div className=" text-center text-sm text-green-500">
            {text && <p>{warning}</p>}
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
