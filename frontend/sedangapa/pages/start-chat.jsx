import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MulaiChat() {
  const [user, setUser] = useState([]);
  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "hhttps://copper-camel-kilt.cyclic.app/api/v9/sedang-apa/get-all-user"
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
              <div className=" flex flex-col justify-center cursor-pointer">
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
    </div>
  );
}

MulaiChat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
