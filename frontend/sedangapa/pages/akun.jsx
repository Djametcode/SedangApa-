import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Akun() {
  const route = useRouter();
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(true);
  };
  const closeNav = () => {
    setNav(false);
  };
  const accId = Cookies.get("id");
  const token = Cookies.get("token");

  const getAccountDetail = async () => {
    try {
      const response = await axios.get(
        `https://copper-camel-kilt.cyclic.app/api/v9/sedang-apa/profile/get-user/${accId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      console.log(result);
      setAcc(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccountDetail();
  }, []);
  return (
    <>
      <div className=" font-quick max-sm:pl-0 pl-72 sticky top-0 bg-cyan-500 h-24 max-sm:h-20 flex flex-col justify-center">
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
                href="/akun"
              >
                Akun
              </Link>
            </div>
            <div
              onClick={async () => {
                await Cookies.remove("username");
                await Cookies.remove("token");
                await Cookies.remove("id");
                await route.push("/");
              }}
              className=" cursor-pointer absolute bottom-4 left-4"
            >
              <p className=" bg-slate-300 p-2 rounded-xl shadow-md text-black">
                Log Out
              </p>
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
            Akun
          </h2>
        </div>
      </div>
      <div className=" flex gap-2 font-quick bg-slate-100 p-4 border-b-2"></div>
    </>
  );
}
