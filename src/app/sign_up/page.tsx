"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

type newUser = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitUp = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential != null) {
          console.log('userCredential:', userCredential)

          // to add user to te firebase storage
          addDoc(collection(db, "users"), {
            name: name,
            email: userCredential.user.email,
            id:userCredential.user.uid
            
          }).then((docRef)=>{
            // console.log( docRef.id,"Document written with ID: ");                        // It will print id of the user who has sign up
            // console.log( docRef,"Document written with ID: ");                        // It will print whole document reference
            toast.success("Account created successfully");
            router.push("/");
          })
        } else {
          toast.error("User already exists");
        }
      })
      .catch((err) => {
         toast.error(err.message);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="  bg-hero-section xl:h-[716px] lg:h-[700px] md:h-[600px] sm:h-[575px] xs:h-[550px] flex justify-center items-center">
        <div className=" bg-skincolor flex justify-center rounded-xl  xl:h-[540px] xl:w-[400px]  lg:h-[500px] lg:w-[380px] md:h-[480px] md:w-[350px] sm:h-[400px] sm:w-[300px]  xs:h-[380px] xs:w-[280px]">
          <div className="flex flex-col py-10 xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-2">
            <span className="font-bold leading-10 text-center xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl">
              Sign Up
            </span>

            <form
              className="flex flex-col justify-center items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-4 xs:gap-3"
              onSubmit={onSubmitUp}
            >
              <div className="flex flex-col gap-2">
                <label
                  about="name"
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  about="email"
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  about="password"
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />
              </div>

              <Button
                type="submit"
                className=" xl:text-xl lg:text-xl md:text-lg sm:text-lg text-white bg-dark  border-none rounded-lg hover:bg-dark text-center xl:w-[180px] lg:w-[170px] md:w-[160px] sm:w-[150px] xs:[140px] xl:h-10 lg:h-9  md:h-8 sm:h-7 xs:h-6"
              >
                Sign Up
              </Button>
            </form>

            <div className="inline-flex items-center justify-center w-full pt-3">
              <hr className="w-64 h-px  bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-skincolor left-1/2 dark:text-white dark:bg-gray-900 md:text-base xs:text-sm">
                or
              </span>
            </div>

            <span className="font-semibold text-center xl:text-lg lg:text-lg md:text-lg sm:text-base xs:text-sm pt-2">
              <Link href="/sign_in">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
