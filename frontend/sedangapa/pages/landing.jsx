import Layout from "@/components/layout";

export default function Landing() {
  return (
    <div>
      <div>
        <h1>Sedang Apa</h1>
      </div>
    </div>
  );
}

Landing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
