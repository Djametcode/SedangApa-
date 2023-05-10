import Layout from "@/components/layout";
import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";

const Extends = ({ data }) => {
  const { text, createdBy } = data;
  return (
    <div className=" p-3 h-[300px] w-[500px] bg-slate-100 rounded-xl">
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
  const [post, setPost] = useState([]);
  console.log(post);
  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v9/sedang-apa/get-all-post"
      );
      const result = await response.data;
      const { post } = result;
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className=" flex flex-col gap-3">
      <div className=" flex flex-col gap-2">
        <Posts data={post} />
      </div>
    </div>
  );
}

Landing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
