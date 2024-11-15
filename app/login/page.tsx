"use client";
import React, { use, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../api/users/schema";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof schema>;
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: FormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred");
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(result));
      router.push("/home");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <form
          className="mt-4"
          // onSubmit={handleSubmit(() => {
          //   router.push("/home");
          // })}
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="form-control max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full max-w-xs text-black"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="form-control max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs text-black"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-yellow-300  hover:bg-yellow-400 w-full mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
