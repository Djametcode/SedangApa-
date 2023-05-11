import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Pesan() {
  const [user, setUser] = useState([]);
  const route = useRouter();
  const [userId, setUserId] = useState();
  const token = Cookies.get("token");

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v9/sedang-apa/get-all-user"
      );
      const result = await response.data;
      const { formatUser } = result;
      setUser(formatUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const [contact, toggleContact] = useState(false);
  const [btn, setBtn] = useState("flex");

  const showContact = () => {
    toggleContact(true);
    setBtn("none");
  };

  const data = {
    username2: userId,
  };

  const startChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v9/sedang-apa/profile/create-chat",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      const {
        msg,
        savedChat: { _id: chats },
      } = result;
      await Cookies.set("chatId", chats);
      await route.push("/in-chat-user");
    } catch (error) {
      console.log(error);
    }
  };

  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(true);
  };
  const closeNav = () => {
    setNav(false);
  };
  return (
    <>
      <div className=" max-sm:pl-0 pl-72 sticky top-0 bg-cyan-500 h-24 max-sm:h-20 flex flex-col justify-center">
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
            {/* <div className=" absolute bottom-8 text-slate-500 flex gap-1 text-sm">
          <p>&copy; copyright 2023</p>
          <p>Djamet coder</p>
        </div> */}
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
      <div className=" max-sm:pl-0 pl-72 bg-slate-300 h-screen w-screen flex justify-center flex-col">
        {contact && (
          <div className="flex justify-center z-20">
            <div className=" flex justify-center gap-3 h-[400px] w-[400px] bg-slate-200 rounded-2xl shadow-xl p-4">
              {user.map((item) => (
                <div
                  key={item.id}
                  onClick={async function activity() {
                    await setUserId(item.id);
                    await startChat();
                  }}
                  className=" flex flex-col justify-center cursor-pointer"
                >
                  <img
                    className=" text-center w-12 h-12 rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                  <p>{item.username}</p>
                </div>
              ))}
              <div>
                <div className=" absolute right-4 top-2">
                  <svg
                    fill="black"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ display: `${btn}` }} className=" flex justify-center">
          <button
            onClick={showContact}
            className=" p-2 rounded-xl bg-slate-100"
          >
            + create new chat
          </button>
        </div>
      </div>
    </>
  );
}

Pesan.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
