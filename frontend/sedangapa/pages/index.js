import Link from "next/link";

export default function Home() {
  return (
    <div className=" font-quick bg-slate-400 h-screen w-screen flex  flex-col justify-center">
      <div className="">
        <div className=" flex justify-center -translate-y-10">
          <h1 className=" text-3xl">Welcome</h1>
        </div>
        <div className=" flex justify-center">
          <form
            className=" w-[350px] h-[300px] pl-6 pr-6 rounded-xl bg-slate-200 shadow-xl flex flex-col gap-2 justify-center"
            action="#"
          >
            <input
              className=" p-2 rounded-lg focus:outline-none bg-slate-300"
              type="text"
              placeholder="Email"
            />
            <input
              className=" p-2 rounded-lg focus:outline-none bg-slate-300"
              type="password"
              placeholder="Password"
            />
            <div className=" flex justify-center">
              <button className=" bg-slate-300 p-2 rounded-lg">Login</button>
            </div>
            <div className=" text-center text-xs translate-y-5">
              <p>Belum punya akun?</p>
              <Link className=" text-blue-600 underline" href="/">
                Registrasi
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
