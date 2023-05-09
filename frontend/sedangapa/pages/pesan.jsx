import Layout from "@/components/layout";

export default function Pesan() {
  return (
    <div>
      <h2>Update soon</h2>
    </div>
  );
}

Pesan.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
