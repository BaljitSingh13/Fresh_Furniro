"use client";
import React, { useState } from "react";
import Banner from "@/components/shared/Banner";
import Shared_Section from "@/components/shared/Shared_Section";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type Contact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {

  const pageTitle="Contact"
 const crumbs= { title: "Contact", link: "/contact" }
  const { register, handleSubmit, formState } = useForm<Contact>();
  const { errors } = formState;
  const [contactUs, setContactUs] = useState<Contact>();

  const onSubmit = (data: Contact,event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactUs(data); 
    console.log(data,"contact us data in console");
  };

  return (
    <div>
      <Shared_Section pageTitle={pageTitle} crumbs={crumbs}/>
      <div className="xl:pt-[98px] xl:px-[191px] lg:pt-[88px] lg:px-[170px] md:pt-[78px]  md:px-[140px] sm:pt-[48px] sm:px-[80px] xs:pt-[28px]  xs:px-[50px]">
        <div className="xl:text-center xl:m-auto lg:text-center lg:m-auto md:text-center md:m-auto  sm:text-center sm:m-auto xs:text-center xs:m-auto ">
          <h1 className="xl:font-semibold xl:text-[36px] xl:leading-[54px] lg:font-semibold lg:text-[36px] lg:leading-[54px] md:font-semibold md:text-[36px] md:leading-[54px] sm:font-semibold sm:text-[26px] sm:leading-[45px] xs:font-semibold xs:text-[20px] xs:leading-[40px]">
            Get In Touch With Us
          </h1>
          <p className="text-light ">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email.
          </p>
          <p className="text-light ">Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        </div>

        <div className=" xl:flex xl:flex-row xl:gap-[30px] lg:flex lg:flex-row lg:gap-[28px] md:flex md:flex-row md:gap-[28px] sm:flex sm:flex-col sm:gap-[26px] xs:flex xs:flex-col xs:gap-[8px]">
          {/* left part */}
          <div className="xl:pt-[115px] xl:w-[45%] lg:pt-[105px] lg:w-[45%] md:pt-[95px] md:w-[45%] sm:pt-[52px] sm:w-[100%] xs:pt-[42px] xs:w-[100%] xl:m-0 lg:m-0 md:m-0 sm:m-auto xs:m-0">
            {/* address */}
            <div className="xl:flex xl:flex-row xl:gap-5 xl:mb-[42px] lg:flex lg:flex-row lg:gap-5 lg:mb-[38px] md:flex md:flex-row md:gap-4 md:mb-[33px] sm:flex sm:flex-col sm:gap-3 sm:mb-[28px] xs:flex xs:flex-col xs:gap-3 xs:mb-[16px]  ">
              <svg
                width="28"
                height="28"
                viewBox="0 0 22 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.120087C8.08369 0.123477 5.28779 1.26659 3.22564 3.29867C1.16348 5.33075 0.00345217 8.08587 1.17029e-05 10.9597C-0.00348119 13.3081 0.774992 15.5929 2.21601 17.4634C2.21601 17.4634 2.51601 17.8527 2.56501 17.9088L11 27.7118L19.439 17.9039C19.483 17.8517 19.784 17.4634 19.784 17.4634L19.785 17.4605C21.2253 15.5907 22.0034 13.3071 22 10.9597C21.9966 8.08587 20.8365 5.33075 18.7744 3.29867C16.7122 1.26659 13.9163 0.123477 11 0.120087ZM11 14.9013C10.2089 14.9013 9.43553 14.6702 8.77773 14.237C8.11993 13.8039 7.60724 13.1883 7.30449 12.4681C7.00174 11.7478 6.92253 10.9553 7.07687 10.1907C7.23121 9.42608 7.61217 8.72374 8.17158 8.17249C8.73099 7.62124 9.44373 7.24583 10.2197 7.09374C10.9956 6.94165 11.7998 7.01971 12.5307 7.31804C13.2616 7.61638 13.8864 8.12159 14.3259 8.7698C14.7654 9.418 15 10.1801 15 10.9597C14.9987 12.0047 14.5768 13.0065 13.827 13.7454C13.0771 14.4843 12.0605 14.9 11 14.9013Z"
                  fill="black"
                />
              </svg>

              <div>
                <h2 className="font-medium text-2xl leading-[36px]">Address</h2>
                <span>Furniro - Furniture Store in Sector 17C, Chandigarh</span>
              </div>
            </div>

            {/* Contact Number */}
            <div className="xl:flex xl:flex-row xl:gap-5 xl:mb-[42px] lg:flex lg:flex-row lg:gap-5 lg:mb-[38px] md:flex md:flex-row md:gap-4 md:mb-[33px] sm:flex sm:flex-col sm:gap-3 sm:mb-[28px] xs:flex xs:flex-col xs:gap-3 xs:mb-[16px] ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.6091 18.425L17.5279 13.805C17.2877 13.5867 16.972 13.4703 16.6476 13.4803C16.3232 13.4903 16.0154 13.626 15.7891 13.8587L12.7979 16.935C12.0779 16.7975 10.6304 16.3462 9.14035 14.86C7.65035 13.3687 7.1991 11.9175 7.06535 11.2025L10.1391 8.20999C10.3721 7.9839 10.508 7.67602 10.5181 7.3515C10.5281 7.02698 10.4115 6.71129 10.1929 6.47124L5.5741 1.39124C5.35541 1.15044 5.05145 1.00437 4.72679 0.984068C4.40214 0.963762 4.08235 1.07082 3.83535 1.28249L1.12285 3.60874C0.906741 3.82564 0.777752 4.11431 0.760352 4.41999C0.741602 4.73249 0.384103 12.135 6.1241 17.8775C11.1316 22.8837 17.4041 23.25 19.1316 23.25C19.3841 23.25 19.5391 23.2425 19.5804 23.24C19.886 23.2229 20.1745 23.0933 20.3904 22.8762L22.7154 20.1625C22.9279 19.9163 23.0357 19.5968 23.0159 19.2721C22.996 18.9475 22.85 18.6435 22.6091 18.425Z"
                  fill="black"
                />
              </svg>

              <div>
                <h2 className="font-medium text-2xl leading-[36px]">Phone</h2>
                <p className="font-normal text-base ">Mobile:+(84)546-6789</p>
                <p>Hotline:+(84)546-6789</p>
              </div>
            </div>

            {/* Working Time */}
            <div className="xl:flex xl:flex-row xl:gap-5 xl:mb-[42px] lg:flex lg:flex-row lg:gap-5 lg:mb-[38px] md:flex md:flex-row md:gap-4 md:mb-[33px] sm:flex sm:flex-col sm:gap-3 sm:mb-[28px] xs:flex xs:flex-col xs:gap-3 xs:mb-[16px] ">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 11.5C23 14.55 21.7884 17.4751 19.6317 19.6317C17.4751 21.7884 14.55 23 11.5 23C8.45001 23 5.52494 21.7884 3.36827 19.6317C1.2116 17.4751 0 14.55 0 11.5C0 8.45001 1.2116 5.52494 3.36827 3.36827C5.52494 1.2116 8.45001 0 11.5 0C14.55 0 17.4751 1.2116 19.6317 3.36827C21.7884 5.52494 23 8.45001 23 11.5ZM11.5 5.03125C11.5 4.84063 11.4243 4.65781 11.2895 4.52302C11.1547 4.38823 10.9719 4.3125 10.7812 4.3125C10.5906 4.3125 10.4078 4.38823 10.273 4.52302C10.1382 4.65781 10.0625 4.84063 10.0625 5.03125V12.9375C10.0625 13.0642 10.0961 13.1886 10.1597 13.2982C10.2233 13.4077 10.3147 13.4985 10.4247 13.5614L15.456 16.4364C15.6211 16.5256 15.8146 16.5467 15.995 16.4952C16.1755 16.4437 16.3287 16.3236 16.4218 16.1607C16.5149 15.9977 16.5406 15.8048 16.4933 15.6232C16.4461 15.4415 16.3297 15.2856 16.169 15.1886L11.5 12.5206V5.03125Z"
                  fill="black"
                />
              </svg>

              <div>
                <h2 className="font-medium text-2xl leading-[36px]">
                  Working Time
                </h2>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* right part */}
          <div className="xl:pt-[119px] xl:pb-[63px] xl:pl-[52px] xl:w-[55%] lg:pt-[109px] lg:pb-[63px] lg:pl-[42px] lg:w-[55%] md:pt-[99px] md:pb-[63px] md:pl-[32px] md:w-[55%] sm:pt-[0px] sm:px-[0px] sm:pb-[43px] sm:w-[100%] xs:pt-[29px] xs:px-[0px] xs:pb-[23px] xs:w-[100%] mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              // className="border-2 border-black"
            >
              <div className="xl:flex xl:flex-col xl:gap-9 lg:flex lg:flex-col lg:gap-8 md:flex md:flex-col md:gap-7 sm:flex sm:flex-col sm:gap-6 xs:flex xs:flex-col xs:gap-4   ">
                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[10px] ">
                  <label about="yourName" className="font-medium">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    id="yourName"
                    {...register("name", {
                      pattern: {
                        value:
                          /^[a-zA-Z]{4}/,             // to verify that name should not contain empty space format
                        message: "Name must have 4 letters",
                      },

                    })}
                    className=" border-2 xl:h-[65px] xl:pl-7 xl:rounded-[10px] lg:h-[60px] lg:pl-6 lg:rounded-[8px] md:h-[55px] md:pl-5 md:rounded-[6px] sm:h-[50px] sm:pl-4 sm:rounded-[6px] xs:h-[40px] xs:pl-4 xs:rounded-[6px] xl:text-lg lg:text-lg md:text-lg sm:text-base xs:text-base"
                  />
                  {errors?.name && (
                    <span className="text-red-500">
                      {errors?.name?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[10px]">
                  <label about="email" className="font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    id="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, // to verify that it should be in email format
                        message: "Invalid Email",
                      },

                      // to validate that use enter a real email id
                      validate: (fieldValue) => {
                        return (
                          fieldValue !== "admin@example.com" ||
                          "Enter different email"
                        );
                      },

                      required: "Email is required",
                    })}
                    className=" border-2 xl:h-[65px] xl:pl-7 xl:rounded-[10px] lg:h-[60px] lg:pl-6 lg:rounded-[8px] md:h-[55px] md:pl-5 md:rounded-[6px] sm:h-[50px] sm:pl-4 sm:rounded-[6px] xs:h-[40px] xs:pl-4 xs:rounded-[6px] xl:text-lg lg:text-lg md:text-lg sm:text-base xs:text-base"
                  />
                  {errors?.email && (
                    <span className="text-red-500">
                      {errors?.email?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[10px]">
                  <label about="subject" className="font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="This is an optional"
                    id="subject"
                    {...register("subject")}
                    className=" border-2 xl:h-[65px] xl:pl-7 xl:rounded-[10px] lg:h-[60px] lg:pl-6 lg:rounded-[8px] md:h-[55px] md:pl-5 md:rounded-[6px] sm:h-[50px] sm:pl-4 sm:rounded-[6px] xs:h-[40px] xs:pl-4 xs:rounded-[6px] xl:text-lg lg:text-lg md:text-lg sm:text-base xs:text-base"
                  />
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[10px]">
                  <label about="message" className="font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                      // pattern: {
                      //   value:
                      //     /^[a-zA-Z0-9]{50}/,             // to verify that name should not contain empty space format
                      //   message: "Message must be of at least 50 words",
                      // },
                    })}
                    className=" border-2 xl:h-[65px] xl:pl-7 xl:rounded-[10px] lg:h-[60px] lg:pl-6 lg:rounded-[8px] md:h-[55px] md:pl-5 md:rounded-[6px] sm:h-[50px] sm:pl-4 sm:rounded-[6px] xs:h-[40px] xs:pl-4 xs:rounded-[6px] xl:pt-4 lg:pt-4 md:pt-3 sm:pt-2 xs:pt-1"
                  />
                  {errors?.message && (
                    <span className="text-red-500">
                      {errors?.message?.message}*
                    </span>
                  )}
                </div>

                <Button className=" bg-dark text-[#ffffff] xl:text-lg xl:w-[200px] xl:h-[55px] lg:text-lg lg:w-[180px] lg:h-[50px] md:lg:text-base md:w-[160px] md:h-[45px] sm:lg:text-base sm:w-[140px] sm:h-[40px] xs:w-[120px] xs:h-[35px] xs:text-base hover:bg-dark xl:mt-[10px] lg:mt-[8px] md:mt-[6px] sm:mt-[4px] xs:mt-[2px] rounded-[5px] ">
                  Submit{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default Contact;
