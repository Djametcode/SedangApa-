import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InChat() {
  const [user, setUser] = useState([]);
  const router = useRouter();
  const [text, setText] = useState();

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
      console.log(result);
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
    <div className=" bg-slate-300 h-screen w-screen flex flex-col">
      <div className=" sticky top-0 bg-cyan-500 h-24 flex flex-col justify-center">
        <h2 className=" text-center text-2xl font-extrabold text-white">
          Pesan
        </h2>
      </div>
      <div className=" -translate-x-52 flex gap-2 w-screen justify-center absolute bottom-4">
        <form action="#">
          <input
            className=" p-3 rounded-xl w-[1000px] focus:outline-none"
            type="text"
            placeholder="pesan"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <div className=" flex flex-col justify-center">
          <button onClick={sendMessagee} className=" p-3 rounded-xl bg-white">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

InChat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
