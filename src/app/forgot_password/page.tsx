"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

type loginData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const router = useRouter();
  const {formState } = useForm<loginData>();                                    //  register, handleSubmit
  const { errors } = formState;

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const resetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
           toast.success("Check your mail")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="  bg-hero-section xl:h-[716px] lg:h-[700px] md:h-[600px] sm:h-[575px] xs:h-[400px] w-auto flex justify-center items-center">
        <div className=" bg-skincolor flex justify-center rounded-xl  xl:h-[350px] xl:w-[400px] lg:h-[310px] lg:w-[380px] md:h-[280px] md:w-[350px] sm:h-[260px] sm:w-[300px]  xs:h-[240px] xs:w-[280px]">
          <div className="flex flex-col py-10 xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-2">
            <span className="font-bold leading-10 text-center xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl">
             Reset Password
            </span>

            <form
              className="flex flex-col justify-center items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-4 xs:gap-3"
              onSubmit={resetPassword}
            >
              <div className="flex flex-col gap-2">
                <label
                  about="email"
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Enter your Email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />
              </div>

              <Button
                type="submit"
                className="  lg:text-lg md:text-lg sm:text-base text-white bg-dark  border-none rounded-lg hover:bg-dark text-center xl:w-[180px] lg:w-[170px] md:w-[160px] sm:w-[150px] xs:[140px] xl:h-9 lg:h-8 md:h-7 sm:h-6 xs:h-5"
              >
                Rest Password
              </Button>
            </form>

            <div className="inline-flex items-center justify-center w-full pt-3">
              <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-skincolor left-1/2 dark:text-white dark:bg-gray-900 md:text-base xs:text-sm">
                or
              </span>
            </div>

            <span className="font-semibold text-center xl:text-lg lg:text-lg md:text-base sm:text-base xs:text-sm pt-2">
              <Link href="/sign_in">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
