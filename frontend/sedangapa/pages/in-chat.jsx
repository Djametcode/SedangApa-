import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InChat() {
  const [user, setUser] = useState([]);
  const router = useRouter();

  const getMyChat = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v9/sedang-apa/profile/get-my-chat",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      const { chat } = result;
      const formatchats = chat.map((item) => ({
        id: item._id,
        participants: item.participants.map((item) => ({
          user2: {
            username: item.username2.username,
            avatar: item.username2.avatar,
          },
        })),
      }));
      setUser(formatchats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyChat();
  }, []);

  const gotochat = () => {
    router.push("/in-chat-user");
  };
  return (
    <div className=" bg-slate-300 h-screen w-screen flex flex-col">
      <div className=" sticky top-0 bg-cyan-500 h-24 flex flex-col justify-center">
        <h2 className=" text-center text-2xl font-extrabold text-white">
          Pesan
        </h2>
      </div>
      <div className=" flex flex-col gap-2 p-3">
        {user.map((item) => (
          <div
            onClick={async function goToChats() {
              await Cookies.set("chatId", item.id);
              await gotochat();
            }}
            className=" bg-slate-100 shadow-xl rounded-lg flex gap-3 p-4 border-b border-slate-400"
          >
            <img
              className=" w-14 h-14 rounded-full"
              src={item.participants[0].user2.avatar}
              alt=""
            />
            <div className=" flex flex-col justify-center">
              <p>{item.participants[0].user2.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

InChat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
