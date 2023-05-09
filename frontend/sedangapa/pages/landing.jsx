import Layout from "@/components/layout";
import axios from "axios";
import { useEffect } from "react";

export default function Landing() {
  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v9/sedang-apa/get-all-post"
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div className=" p-2">
      <div>
        <h1>Update soon</h1>
      </div>
    </div>
  );
}

Landing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
