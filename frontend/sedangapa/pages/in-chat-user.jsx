import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InChat() {
  const router = useRouter();
  const [text, setText] = useState();
  const [chat, setChat] = useState([]);
  console.log(chat);
  const [user2, setUser2] = useState([]);

  const getCurrentChat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v9/sedang-apa/profile/chat/${Cookies.get(
          "chatId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      const {
        chat: { message, participants },
      } = result;

      setChat(message);
      setUser2(participants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentChat();
  }, []);

  const data = {
    text: text,
  };
  console.log(data);
  const token = Cookies.get("token");
  const chatId = Cookies.get("chatId");
  const sendMessagee = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v9/sedang-apa/profile/send-chat/${chatId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      await getCurrentChat();
    } catch (error) {
      console.log(error);
    }
  };
  const username = Cookies.get("username");

  return (
    <div>
      <div className=" max-sm:pr-9 max-sm:pl-0 pl-72 bg-cyan-500 sticky top-0 flex flex-col justify-center text-center text-white font-extrabold h-24">
        {user2.map((item) => (
          <div className=" pl-10 flex gap-5">
            <div
              onClick={async () => {
                await Cookies.remove("chatId");
                await router.push("/pesan-list");
              }}
              className=" cursor-pointer flex flex-col justify-center"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className=" w-8 h-8"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                />
              </svg>
            </div>
            <img
              className=" w-16 h-16 rounded-full"
              src={item.username2.avatar}
              alt=""
              srcset=""
            />
            <div className=" flex flex-col justify-center text-xl">
              <p>{item.username2.username}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" pl-72 max-sm:pl-0 h-screen w-screen bg-slate-200">
        {chat.map((item) => (
          <div
            style={{
              justifyContent:
                item.sender.username === username ? "end" : "start",
            }}
            className=" flex p-2"
          >
            <div className=" bg-slate-100 flex justify-center p-2 rounded-xl">
              <img
                key={item.id}
                className=" w-12 h-12 rounded-full"
                src={item.sender.avatar}
                alt="text"
              />
              <div className=" flex flex-col justify-center">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex fixed bottom-0 max-sm:right-8 h-24 flex-col right-52">
        <form className="flex gap-2 justify-center">
          <input
            className=" p-2 w-64 rounded-xl focus:outline-none"
            type="text"
            placeholder="Pesan .."
            onChange={(e) => setText(e.target.value)}
          />
          <div className=" flex flex-col justify-center">
            <button
              onClick={sendMessagee}
              className=" rounded-xl text-slate-500 bg-white p-3"
            >
              kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

InChat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
