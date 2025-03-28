import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My CRM</h1>
      <Link href="/login">
        <button className="bg-blue-500 text-white p-2 rounded-md">Login</button>
      </Link>
    </div>
  );
}
