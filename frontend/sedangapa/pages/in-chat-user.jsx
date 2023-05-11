import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InChat() {
  const router = useRouter();
  const [text, setText] = useState();
  const [chat, setChat] = useState([]);
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
      console.log(participants);
      console.log(message);
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

  const sendMessagee = async () => {
    event.preventDefault();
    try {
      const response = await axios.postForm(
        `http://localhost:3000/api/v9/sedang-apa/profile/send-chat/${Cookies.get(
          "chatId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        data
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" max-sm:pl-0 pl-72 bg-cyan-500 sticky top-0 flex flex-col justify-center text-center text-white font-extrabold h-24">
        {user2.map((item) => (
          <div className=" pl-10 flex gap-4">
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
      <div className=" pl-72 h-screen w-screen bg-slate-200">
        <div className=" flex flex-col">
          <div>
            {chat.map((item) => (
              <div className=" pl-3 pt-3 pr-5">
                <div className=" bg-slate-100 flex p-2 rounded-xl">
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
        </div>
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
