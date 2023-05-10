import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
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

  const showContact = () => {
    toggleContact(true);
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
  return (
    <div className=" bg-slate-300 h-screen w-screen flex flex-col">
      <div className=" sticky top-0 bg-cyan-500 h-24 flex flex-col justify-center">
        <h2 className=" text-center text-2xl font-extrabold text-white">
          Pesan
        </h2>
      </div>
      {contact && (
        <div className="absolute bottom-52 flex translate-x-48 z-20">
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
      <div className=" flex justify-center translate-y-72">
        <button onClick={showContact} className=" p-2 rounded-xl bg-slate-100">
          + create new chat
        </button>
      </div>
    </div>
  );
}

Pesan.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
