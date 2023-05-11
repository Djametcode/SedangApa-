import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const route = useRouter();
  const [warning, setWarning] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();
  const [text, toggleText] = useState(false);

  const loginData = {
    email: email,
    password: password,
  };
  console.log(loginData);

  const handleLogin = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v9/sedang-apa/login",
        loginData
      );
      const result = await response.data;
      const { msg, user, token } = result;
      console.log(user);
      await Cookies.set("id", user._id);
      await Cookies.set("token", token);
      await Cookies.set("username", user.username);
      await setWarning(msg);
      await toggleText(true);
      route.push("/landing");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" font-quick h-screen w-screen flex flex-col justify-center bg-slate-200">
      <div className=" flex justify-center">
        <form
          className=" max-sm:w-80 max-sm:h-72 w-[400px] h-[400px] rounded-xl shadow-lg max-sm:shadow-md bg-slate-200 flex flex-col gap-2 justify-center pl-20 pr-20"
          action="#"
        >
          <div className=" -translate-y-9 flex justify-center text-2xl font-extrabold">
            <h1>Login</h1>
          </div>
          <div className=" flex justify-center">
            <div className=" flex flex-col gap-2">
              <input
                className=" max-sm:w-56 text-sm p-2 rounded-xl focus:outline-none"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className=" max-sm:w-56 text-sm p-2 rounded-xl focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            {text && (
              <p className=" text-center text-sm text-green-500">
                Berhasil login !
              </p>
            )}
          </div>
          <div className=" flex justify-center">
            <button
              onClick={handleLogin}
              className=" bg-slate-100 p-2 rounded-xl text-sm"
            >
              Login
            </button>
          </div>
          <div className=" text-center text-xs flex justify-center gap-2">
            <p className=" max-sm:hidden">Bekum punya akun? </p>
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
