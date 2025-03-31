import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-sm py-[40vh] text-center">
      <h1 className="text-3xl font-bold my-2">Welcome to My CRM</h1>
      <Link href="/login">
        <button className="bg-blue-500 text-white p-2 rounded-md w-1/3 hover:bg-red-500 transition-all">
          Login
        </button>
      </Link>
    </div>
  );
}
