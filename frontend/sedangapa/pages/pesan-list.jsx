import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PesanList() {
  const route = useRouter();
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(true);
  };
  const closeNav = () => {
    setNav(false);
  };

  const token = Cookies.get("token");
  const [participants, setParticipants] = useState([]);

  const getAllMyChat = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v9/sedang-apa/profile/get-my-chat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      const { chat } = result;
      console.log(chat);
      setParticipants(chat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMyChat();
  }, []);
  return (
    <>
      <div className=" w-screen max-sm:pl-0 pl-72 sticky top-0 bg-cyan-500 h-24 max-sm:h-20 flex flex-col justify-center">
        {nav && (
          <div className=" md:hidden fixed left-0 top-0 bg-slate-100 shadow-lg z-30 h-screen w-80 p-2">
            <div
              onClick={closeNav}
              className=" cursor-pointer absolute top-2 right-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className=" flex flex-col gap-4 translate-y-8 p-5 text-slate-500 text-sm">
              <Link
                className=" p-3 bg-slate-200 rounded-lg shadow-lg"
                href="/landing"
              >
                Beranda
              </Link>
              <Link
                className=" p-3 bg-slate-200 rounded-lg shadow-lg"
                href="/pesan"
              >
                Chat
              </Link>
              <Link
                className=" p-3 bg-slate-200 rounded-lg shadow-lg"
                href="/landing"
              >
                Akun
              </Link>
            </div>
          </div>
        )}
        <div>
          <div onClick={toggleNav} className=" cursor-pointer absolute left-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-8 h-8 text-slate-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <h2 className=" text-center text-2xl font-extrabold text-white">
            Pesan
          </h2>
        </div>
      </div>
      <div className=" max-sm:pl-0 flex flex-col gap-3 pl-72 bg-slate-300 h-screen">
        {participants.map((items) =>
          items.participants.map((item) => (
            <div
              onClick={async () => {
                await Cookies.set("chatId", items._id);
                await route.push("/in-chat-user");
              }}
              className=" cursor-pointer flex gap-3 p-4"
            >
              <img
                className=" w-16 h-16 rounded-full"
                src={item.username2.avatar}
                alt=""
                srcset=""
              />
              <div className=" flex flex-col justify-center">
                <p>{item.username2.username}</p>
              </div>
            </div>
          ))
        )}
      </div>
      ;
    </>
  );
}

PesanList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
