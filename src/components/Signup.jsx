import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`backdrop-blur-[25px] backdrop-saturate-[2] bg-[rgba(17,25,40,0.5)] rounded-xl border border-white/10 mx-auto w-full max-w-lg p-10 my-10 hover:shadow-[0_0_10px_#0ae0f5,_0_0_20px_#0ae0f5] duration-300`}
      >
        <div className="mb-2 font-bold tracking-wider font-sans pb-5 capitalize text-4xl flex justify-center items-center ">
          Mega Blog
        </div>

        <h2 className="text-center text-2xl font-bold  text-gray-400 leading-tight">
          Sign Up to create Account
        </h2>
        <p className="mt-2 text-center text-base text-gray-400/90">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium primary transition-all hover:underline duration-200"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your Password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full hover:scale-105 duration-300"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
