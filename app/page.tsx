import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-start p-4">
      <Link
        className="btn bg-yellow-300  hover:bg-yellow-400 "
        href="/login"
      >
        Login
      </Link>
    </main>
  );
}
