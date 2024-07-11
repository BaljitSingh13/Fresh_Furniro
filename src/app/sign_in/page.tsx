'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type loginData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<loginData>();
  const { errors } = formState;

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential != null) {
          toast.success('Logged in successfully');
          localStorage.setItem('isLoggedIn', 'true');
          // console.log(userCredential.user.getIdToken(),"usercredentials");
          // console.log(auth, "auth");
          router.push('/');
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
        <div className=" bg-skincolor flex justify-center rounded-xl  xl:h-[500px] xl:w-[400px] lg:h-[450px] lg:w-[380px] md:h-[420px] md:w-[350px] sm:h-[380px] sm:w-[300px]  xs:h-[350px] xs:w-[280px]">
          <div className="flex flex-col py-10 xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-2">
            <span className="font-bold leading-10 text-center xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl">
              Sign In
            </span>

            <form
              className="flex flex-col justify-center items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-4 xs:gap-3"
              onSubmit={signIn}
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
                  // {...register("email", {
                  //   required: "Email is Required",
                  // })}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />
                {/* {errors?.email && (
                  <span className="text-red-500">
                    {errors?.email?.message}*
                  </span>
                )} */}
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
                  id="password"
                  value={password}
                  placeholder="Enter your Password"
                  onChange={(event) => setPassword(event.target.value)}
                  // {...register("password", {
                  //   required: "Password is Required",
                  // })}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem]"
                />

                {/* {errors?.password && (<span className="text-red-500"> {errors?.password?.message}*</span>
                )} */}

                <span className="text-right xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm ">
                  <Link href="/forgot_password">Forgot password?</Link>
                </span>
              </div>

              <Button
                type="submit"
                className=" xl:text-xl lg:text-xl md:text-lg sm:text-lg  text-white bg-dark  border-none rounded-lg hover:bg-dark text-center xl:w-[180px] lg:w-[170px] md:w-[160px] sm:w-[150px] xs:[140px] xl:h-10 lg:h-9  md:h-8 sm:h-7 xs:h-6"
              >
                Sign In
              </Button>
            </form>
            {/*             
            <div className=" flex flex-col justify-center items-center gap-1">
              <span>or sign in using</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="xl:h-[38px] xl:w-[38px] lg:h-[35px] lg:w-[35px] md:h-[30px] md:w-[30px] sm:h-[28px] sm:w-[28px]"
                viewBox="0 0 48 48"
                width="38px"
                height="38px"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </div> */}
            <div className="inline-flex items-center justify-center w-full pt-3">
              <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-skincolor left-1/2 dark:text-white dark:bg-gray-900 md:text-base xs:text-sm">
                or
              </span>
            </div>

            <span className="font-semibold text-center xl:text-lg lg:text-lg md:text-lg sm:text-base xs:text-sm pt-2">
              <Link href="/sign_up">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
