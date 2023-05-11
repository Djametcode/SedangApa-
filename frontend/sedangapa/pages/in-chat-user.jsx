import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InChat() {
  const router = useRouter();
  const [text, setText] = useState();
  const [chat, setChat] = useState([]);
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
        chat: { message },
      } = result;
      setChat(message);
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

  const sendMessagee = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v9/sedang-apa/profile/send-chat/${Cookies.get(
          "chatId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
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
      <div className=" pl-72 bg-cyan-500 sticky top-0 flex flex-col justify-center text-center text-white font-extrabold h-24">
        <h1 className=" text-2xl">Pesan</h1>
      </div>
      <div className=" pl-72 h-screen w-screen">
        <div className=" flex flex-col">
          <div className=" h-32 first-letter: flex flex-col justify-center bg-slate-200">
            <form className="flex fixed bottom-5 gap-2 justify-center">
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
          <div>
            {chat.map((item) => (
              <p>{item.text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

InChat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
