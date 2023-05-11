import Layout from "@/components/layout";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Extends = ({ data }) => {
  const { text, createdBy } = data;
  return (
    <div className=" max-sm:h-72 max-sm:w-96 p-3 h-[300px] w-[500px] bg-slate-100 shadow-xl rounded-xl">
      <div className=" flex gap-4 border-b pb-2">
        <div>
          <img
            className=" w-14 h-14 object-cover rounded-full"
            src={createdBy.avatar}
            alt=""
          />
        </div>
        <div className=" flex flex-col justify-center">
          <p>{createdBy.username}</p>
        </div>
      </div>
      <div className=" pt-2 p-3 text-sm">
        <p>{text}</p>
      </div>
    </div>
  );
};
const Posts = ({ data }) => {
  const result = data.map((item) => <Extends data={item} key={item._id} />);
  return <>{result}</>;
};

export default function Landing() {
  const [text, setText] = useState();
  const [post, setPost] = useState([]);
  const route = useRouter();
  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "https://copper-camel-kilt.cyclic.app/api/v9/sedang-apa/get-all-post"
      );
      const result = await response.data;
      console.log(result);
      const { post } = result;
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    text: text,
  };
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      route.push("/");
    }
    getAllPost();
  }, []);

  const postSomething = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://copper-camel-kilt.cyclic.app/api/v9/sedang-apa/profile/create-post",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      getAllPost();
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
    <div className=" max-sm:pl-0 pl-72 bg-slate-100 h-screen w-screen">
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
      <div className=" flex flex-col">
        <div className=" bg-cyan-500 sticky top-0 flex flex-col justify-center text-center text-white font-extrabold max-sm:h-20 h-24">
          <div className=" md:hidden">
            <div
              onClick={toggleNav}
              className=" cursor-pointer absolute left-5"
            >
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
          </div>
          <h1 className=" text-2xl">Beranda</h1>
        </div>
        <div className=" h-28 bg-slate-200 flex justify-center">
          <form className=" flex flex-col justify-center p-2">
            <input
              className=" p-3 max-sm:w-60 w-80 rounded-xl focus:outline-none"
              type="text"
              placeholder="Kamu sedang apa?"
              onChange={(e) => setText(e.target.value)}
            />
          </form>
          <div className=" flex flex-col justify-center">
            <button
              onClick={postSomething}
              className=" rounded-xl text-slate-500 bg-white p-3"
            >
              Posting
            </button>
          </div>
        </div>
        <div className=" flex justify-center p-3 bg-slate-200">
          <div className=" flex flex-col gap-2">
            <Posts data={post} />
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
