import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Layout({ children }) {
  const [beranda, setBeranda] = useState("");
  const [txtBeranda, setTextBeranda] = useState("");
  const [pesan, setPesan] = useState("");
  const [txtPesan, setTxtPesan] = useState("");
  const [akun, setAkun] = useState("");
  const [textAkun, setTxtAkun] = useState("");
  const [setting, setSetting] = useState("");
  const [textSetting, setTxtSetting] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/pesan") {
      setPesan("slateGrey");
      setTxtPesan("white");
      setBeranda("");
      setTextBeranda("");
    }
    if (router.pathname === "/landing") {
      setBeranda("slateGrey");
      setTextBeranda("white");
      setPesan("");
      setTxtPesan("");
    }
  });
  const logOutHandle = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("chatId");
    Cookies.remove("username");
    router.push("/");
  };
  const [nav, toggleNav] = useState(false);
  return (
    <div className="font-quick flex max-sm:block">
      <div className=" flex flex-col fixed max-sm:hidden left-0 z-20">
        <div className=" flex pl-6 gap-1 w-72 h-24 bg-lime-500">
          <div className=" flex flex-col justify-center">
            <h1 className=" pl-5 text-white text-2xl">SedangApa</h1>
          </div>
          <div className=" flex flex-col justify-center">
            <svg
              className=" w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
        </div>
        <div className="">
          <div className=" bg-slate-100 h-screen w-72 flex flex-col gap-2 pb-6 p-10 pt-6 text-base">
            <div className=" flex justify-start">
              <div className="  flex flex-col gap-5">
                <div
                  style={{
                    backgroundColor: `${beranda}`,
                    color: `${txtBeranda}`,
                  }}
                  className=" flex gap-5 rounded-3xl"
                >
                  <div className=" bg-slate-500 rounded-full p-2 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6 text-slate-400 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div className=" flex flex-col justify-center">
                    <Link href="/landing">Beranda</Link>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: `${pesan}`, color: `${txtPesan}` }}
                  className=" flex gap-5 rounded-3xl transition-all"
                >
                  <div className=" bg-slate-500 rounded-full p-2 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <div className=" flex flex-col justify-center">
                    <Link href="/pesan">Chat</Link>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: `${akun}`,
                    color: `${textAkun}`,
                  }}
                  className=" flex gap-5"
                >
                  <div className=" bg-slate-500 rounded-full p-2 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className=" flex flex-col justify-center">
                    <Link href="/">Akun</Link>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: `${setting}`,
                    color: `${textSetting}`,
                  }}
                  className=" flex gap-5"
                >
                  <div className=" bg-slate-500 rounded-full p-2 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className=" flex flex-col justify-center">
                    <Link href="/">Pengaturan</Link>
                  </div>
                </div>
                <div className=" flex absolute bottom-40 flex-col bg-slate-300 rounded-xl justify-center p-3 w-44 h-16">
                  <div className=" flex justify-start gap-1">
                    <div className=" flex flex-col justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="slateGrey"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="white"
                        className=" w-14 h-14"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className=" flex flex-col justify-center">
                      <div className=" flex gap-1 over-scroll">
                        <p className=" text-base text-center">User</p>
                        <button
                          onClick={logOutHandle}
                          className=" bg-red-400 p-1 rounded-md t text-xs text-center"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
