import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Link
        className="btn bg-yellow-300  hover:bg-yellow-400 justify-end p-4 m-4"
        href="/login"
      >
        Logout
      </Link>
      <div className="text-black m-4">Welcome user</div>
    </>
  );
};

export default page;
