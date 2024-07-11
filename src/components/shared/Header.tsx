'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { auth } from '@/app/firebase.config';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import { Product } from '@/models/types';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '@/redux/cartSlice';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inside, setInside] = useState(auth);
  const [storage, setStorage] = useState(localStorage.getItem('isLoggedIn'));
  const router = useRouter();

  // shopping cart modal
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);

  let totalPrize = 0;
  const updatePrize = (subtotal: number) => {
    totalPrize = totalPrize + subtotal;
  };

  const sidebar = () => {
    setIsOpen(open != open);

    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  //****check user logedIn or not
  let logedIn = localStorage.getItem('isLoggedIn'); //"true"

  const testing = () => {
    logedIn = localStorage.getItem('isLoggedIn');

    if (logedIn === 'false') {
      toast.error('Please Login first');
      router.push('/sign_in');
    } 
  };

  // let logIn = () => {
  //   if(logedIn === 'false'){
  //     router.push('/sign_in');
  //   }
  // };

  let logOut = () => {
    setStorage('false');
    localStorage.setItem('isLoggedIn', 'false'); //isLoggedIn is a key and false is the value of that key
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleDelete = (id: string) => {
    console.log("product id is",id)
    dispatch(remove(id));
  };

  return (
    <nav className="relative  bg-gray-200 md:w-[100%] md:h-[100px] sm:w-[100%] sm:h-[60px] ">
      <div className=" h-[100%] md:flex md:justify-between md:pt-[33px] md:pr-[100px] md:pb-[30px] md:pl-[54px] md:items-center sm:flex sm:justify-between sm:pt-[20px] sm:pr-[25px] sm:pb-[15px] sm:pl-[15px] xs:flex xs:justify-between xs:py-[15px] xs:px-[18px] bg-white ">
        {/* left side */}
        <div className="md:hidden sm:visible xs:visible">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={sidebar}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <div
            className={` ${
              isOpen
                ? ' sm:visible sm:flex-col  xs:visible xs:flex-col'
                : 'sm:hidden xs:hidden'
            }`}
          >
            <ul
              onClick={sidebar}
              className="pt-[20px]"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:relative md:left-0 md:gap-[1rem] md:items-center md:top-0 sm:absolute sm:left-14  sm:top-[18px] sm:gap-[0.5rem] xs:absolute xs:left-14 xs:gap-[0.5rem] xs:top-[15px]">
          <Image
            src="/images/Meubel House_Logos-05.png"
            alt="Logo"
            height={32}
            width={50}
            className="md:h-8 md:w-12 sm:h-6 sm:w-10 xs:h-5 xs:w-9"
          />
          <h1 className="font-bold md:text-3xl sm:text-2xl xs:text-xl">
            Furniro
          </h1>
        </div>

        {/* Home Shop About Contact */}
        <div>
          <ul className=" md:flex md:flex-row md:items-center md:gap-[2rem] sm:hidden sm:flex-col sm:items-center sm:gap-[1rem] xs:hidden xs:flex-col xs:items-center xs:gap-[1rem]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* user,like,Contact */}
        <div>
          <ul className="flex md:flex-row md:gap-[2rem]  sm:gap-[1.5rem] sm:flex-row  xs:gap-[.5rem] xs:flex-row md:align-bottom sm:align-middle xs:align-bottom">
            <li onClick={testing}>
              <Link href="/profile">
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-[28px] lg:w-[28px] md:h-[26px] md:w-[26px] sm:h-[24px] sm:w-[24px] xs:h-[22px] xs:w-[20px]"
                >
                  <path
                    d="M21.3333 10V4.16669H23.6666V11.1667H21.3333M21.3333 15.8334H23.6666V13.5H21.3333M9.66665 11.1667C12.7816 11.1667 19 12.73 19 15.8334V19.3334H0.333313V15.8334C0.333313 12.73 6.55165 11.1667 9.66665 11.1667ZM9.66665 0.666687C10.9043 0.666687 12.0913 1.15835 12.9665 2.03352C13.8416 2.90869 14.3333 4.09568 14.3333 5.33335C14.3333 6.57103 13.8416 7.75802 12.9665 8.63319C12.0913 9.50836 10.9043 10 9.66665 10C8.42897 10 7.24198 9.50836 6.36682 8.63319C5.49164 7.75802 4.99998 6.57103 4.99998 5.33335C4.99998 4.09568 5.49164 2.90869 6.36682 2.03352C7.24198 1.15835 8.42897 0.666687 9.66665 0.666687ZM9.66665 13.3834C6.20165 13.3834 2.54998 15.0867 2.54998 15.8334V17.1167H16.7833V15.8334C16.7833 15.0867 13.1316 13.3834 9.66665 13.3834ZM9.66665 2.88335C9.01687 2.88335 8.3937 3.14148 7.93424 3.60094C7.47477 4.06041 7.21665 4.68357 7.21665 5.33335C7.21665 5.98313 7.47477 6.6063 7.93424 7.06577C8.3937 7.52523 9.01687 7.78335 9.66665 7.78335C10.3164 7.78335 10.9396 7.52523 11.3991 7.06577C11.8585 6.6063 12.1166 5.98313 12.1166 5.33335C12.1166 4.68357 11.8585 4.06041 11.3991 3.60094C10.9396 3.14148 10.3164 2.88335 9.66665 2.88335Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </li>

            <li onClick={testing}>
              <Link href="/favorite">
                <svg
                  width="26"
                  height="24"
                  viewBox="0 0 26 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-[28px] lg:w-[28px] md:h-[26px] md:w-[26px] sm:h-[24px] sm:w-[24px] xs:h-[22px] xs:w-[20px]"
                >
                  <path
                    d="M7.16668 1.5C3.94551 1.5 1.33334 4.08533 1.33334 7.275C1.33334 9.84983 2.35418 15.9608 12.4027 22.1383C12.5827 22.2479 12.7893 22.3058 13 22.3058C13.2107 22.3058 13.4173 22.2479 13.5973 22.1383C23.6458 15.9608 24.6667 9.84983 24.6667 7.275C24.6667 4.08533 22.0545 1.5 18.8333 1.5C15.6122 1.5 13 5 13 5C13 5 10.3878 1.5 7.16668 1.5Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>

            <li onClick={testing}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="md:pt-[2px] xs:pt-0 pr-0 pb-0 pl-0 h-0  align-middle "
                    >
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="lg:h-[28px] lg:w-[28px] md:h-[26px] md:w-[26px] sm:h-[24px] sm:w-[24px] xs:h-[22px] xs:w-[20px]"
                      >
                      <path
                        d="M24.2355 16.1926H7.95234L8.76991 14.5273L22.3543 14.5027C22.8137 14.5027 23.2074 14.1746 23.2894 13.7207L25.1707 3.19062C25.2199 2.91445 25.1461 2.63008 24.9656 2.41406C24.8764 2.30775 24.7652 2.22211 24.6396 2.16309C24.514 2.10407 24.377 2.07308 24.2383 2.07227L6.95702 2.01484L6.80937 1.32031C6.7164 0.877344 6.31718 0.554688 5.86328 0.554688H1.63867C1.38267 0.554688 1.13716 0.656381 0.956142 0.837398C0.775125 1.01841 0.673431 1.26393 0.673431 1.51992C0.673431 1.77592 0.775125 2.02143 0.956142 2.20245C1.13716 2.38346 1.38267 2.48516 1.63867 2.48516H5.08124L5.72656 5.55312L7.31523 13.2449L5.26992 16.5836C5.1637 16.727 5.09972 16.8972 5.08523 17.075C5.07073 17.2528 5.10629 17.4312 5.18788 17.5898C5.35195 17.9152 5.68281 18.1203 6.04921 18.1203H7.7664C7.40032 18.6065 7.20258 19.1988 7.20312 19.8074C7.20312 21.3551 8.46093 22.6129 10.0086 22.6129C11.5562 22.6129 12.8141 21.3551 12.8141 19.8074C12.8141 19.1977 12.6117 18.6043 12.2508 18.1203H16.6559C16.2898 18.6065 16.092 19.1988 16.0926 19.8074C16.0926 21.3551 17.3504 22.6129 18.898 22.6129C20.4457 22.6129 21.7035 21.3551 21.7035 19.8074C21.7035 19.1977 21.5012 18.6043 21.1402 18.1203H24.2383C24.7687 18.1203 25.2035 17.6883 25.2035 17.1551C25.2019 16.8994 25.0993 16.6546 24.9179 16.4743C24.7366 16.294 24.4913 16.1927 24.2355 16.1926ZM7.35898 3.91797L23.1035 3.96992L21.5613 12.6051L9.19374 12.627L7.35898 3.91797ZM10.0086 20.6715C9.53281 20.6715 9.14452 20.2832 9.14452 19.8074C9.14452 19.3316 9.53281 18.9434 10.0086 18.9434C10.4844 18.9434 10.8726 19.3316 10.8726 19.8074C10.8726 20.0366 10.7816 20.2564 10.6196 20.4184C10.4575 20.5805 10.2378 20.6715 10.0086 20.6715ZM18.898 20.6715C18.4223 20.6715 18.034 20.2832 18.034 19.8074C18.034 19.3316 18.4223 18.9434 18.898 18.9434C19.3738 18.9434 19.7621 19.3316 19.7621 19.8074C19.7621 20.0366 19.6711 20.2564 19.509 20.4184C19.347 20.5805 19.1272 20.6715 18.898 20.6715Z"
                        fill="black"
                        />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="xl:w-[417px] xl:h-[500px] lg:w-[417px] lg:h-[480px] md:w-[420px] md:h-[400px] sm:w-[390px] sm:h-[400px]  ">
                  <div className="flex flex-col xl:pr-0 xl:pl-0 xl:gap-5 lg:pr-0 lg:pl-0 lg:gap-4 md:pr-0 md:pl-0 md:gap-3 sm:pr-0 sm:pl-0 sm:gap-2 xs:pr-0 xs:pl-0 xs:gap-1 overflow-auto scroll-m-0 ">
                    <DialogHeader className="sticky top-1 bg-white">
                      <DialogTitle className="flex justify-between">
                        <span className="border-b-2 font-semibold lg:pb-4 lg:text-2xl lg:leading-9 md:pb-4 md:text-2xl md:leading-8 sm:pb-3 sm:text-xl sm:leading-7 xs:pb-2 xs:text-lg xs:leading-6">
                          Shopping Cart
                        </span>
                      </DialogTitle>
                    </DialogHeader>

                    {cartitems?.map((item, index: number) => (
                      <div
                        className="flex justify-between lg:py-4 md:gap-4 md:py-4 sm:gap-3 sm:py-3 xs:gap-3 xs:py-3"
                        key={index}
                      >
                        {/* item 1 */}
                        <div className="w-[100%] flex lg:justify-around md:justify-around md:gap-16 sm:gap-10 xs:gap-8 items-center ">
                          <div className=" bg-skincolor rounded-xl flex  items-center w-[76px]">
                            <img
                              src={item.items.imgUrls[0]}
                              alt={item.items.productName}
                              width={100}
                              height={100}
                              className="justify-center rounded-xl"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <span>{item.items.productName}</span>
                            <div className="flex justify-between gap-2">
                              <span>{item.counter} </span>
                              <span>X</span>
                              <span className="text-dark">
                                Rs.
                                {item.items.discount > item.items.mrp ||
                                item.items.discount !== 0
                                  ? item.items.discount
                                  : item.items.mrp}
                                {updatePrize(
                                  (item.items.discount > item.items.mrp ||
                                  item.items.discount !== 0
                                    ? item.items.discount
                                    : item.items.mrp) *
                                    (Number(item.counter) > 0
                                      ? item.counter
                                      : 1)
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Cross Icon */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleDelete(item.items.productId)}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.37 7.91545C13.5356 7.744 13.6272 7.51436 13.6252 7.276C13.6231 7.03764 13.5275 6.80963 13.3589 6.64107C13.1904 6.47252 12.9624 6.37691 12.724 6.37484C12.4856 6.37277 12.256 6.4644 12.0845 6.63L10 8.71455L7.91545 6.63C7.83159 6.54317 7.73128 6.47392 7.62037 6.42627C7.50946 6.37863 7.39016 6.35355 7.26946 6.3525C7.14875 6.35145 7.02904 6.37445 6.91731 6.42016C6.80559 6.46587 6.70409 6.53338 6.61873 6.61873C6.53338 6.70409 6.46587 6.80559 6.42016 6.91731C6.37445 7.02904 6.35145 7.14875 6.3525 7.26946C6.35355 7.39016 6.37863 7.50946 6.42627 7.62037C6.47392 7.73128 6.54317 7.83159 6.63 7.91545L8.71455 10L6.63 12.0845C6.54317 12.1684 6.47392 12.2687 6.42627 12.3796C6.37863 12.4905 6.35355 12.6098 6.3525 12.7305C6.35145 12.8513 6.37445 12.971 6.42016 13.0827C6.46587 13.1944 6.53338 13.2959 6.61873 13.3813C6.70409 13.4666 6.80559 13.5341 6.91731 13.5798C7.02904 13.6255 7.14875 13.6486 7.26946 13.6475C7.39016 13.6465 7.50946 13.6214 7.62037 13.5737C7.73128 13.5261 7.83159 13.4568 7.91545 13.37L10 11.2855L12.0845 13.37C12.256 13.5356 12.4856 13.6272 12.724 13.6252C12.9624 13.6231 13.1904 13.5275 13.3589 13.3589C13.5275 13.1904 13.6231 12.9624 13.6252 12.724C13.6272 12.4856 13.5356 12.256 13.37 12.0845L11.2855 10L13.37 7.91545Z"
                              fill="#9F9F9F"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPrize != 0 ? (
                    <div className="pr-8 pl-7 flex justify-between items-end">
                      <span>Subtotal</span>
                      <span>Rs.{totalPrize} </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center justify-start gap-2 ">
                      <svg
                        width="26"
                        height="23"
                        viewBox="0 0 26 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="xl:h-10 xl:w-10 lg:h-8 lg:w-8 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6"
                      >
                        <path
                          d="M24.2355 16.1926H7.95234L8.76991 14.5273L22.3543 14.5027C22.8137 14.5027 23.2074 14.1746 23.2894 13.7207L25.1707 3.19062C25.2199 2.91445 25.1461 2.63008 24.9656 2.41406C24.8764 2.30775 24.7652 2.22211 24.6396 2.16309C24.514 2.10407 24.377 2.07308 24.2383 2.07227L6.95702 2.01484L6.80937 1.32031C6.7164 0.877344 6.31718 0.554688 5.86328 0.554688H1.63867C1.38267 0.554688 1.13716 0.656381 0.956142 0.837398C0.775125 1.01841 0.673431 1.26393 0.673431 1.51992C0.673431 1.77592 0.775125 2.02143 0.956142 2.20245C1.13716 2.38346 1.38267 2.48516 1.63867 2.48516H5.08124L5.72656 5.55312L7.31523 13.2449L5.26992 16.5836C5.1637 16.727 5.09972 16.8972 5.08523 17.075C5.07073 17.2528 5.10629 17.4312 5.18788 17.5898C5.35195 17.9152 5.68281 18.1203 6.04921 18.1203H7.7664C7.40032 18.6065 7.20258 19.1988 7.20312 19.8074C7.20312 21.3551 8.46093 22.6129 10.0086 22.6129C11.5562 22.6129 12.8141 21.3551 12.8141 19.8074C12.8141 19.1977 12.6117 18.6043 12.2508 18.1203H16.6559C16.2898 18.6065 16.092 19.1988 16.0926 19.8074C16.0926 21.3551 17.3504 22.6129 18.898 22.6129C20.4457 22.6129 21.7035 21.3551 21.7035 19.8074C21.7035 19.1977 21.5012 18.6043 21.1402 18.1203H24.2383C24.7687 18.1203 25.2035 17.6883 25.2035 17.1551C25.2019 16.8994 25.0993 16.6546 24.9179 16.4743C24.7366 16.294 24.4913 16.1927 24.2355 16.1926ZM7.35898 3.91797L23.1035 3.96992L21.5613 12.6051L9.19374 12.627L7.35898 3.91797ZM10.0086 20.6715C9.53281 20.6715 9.14452 20.2832 9.14452 19.8074C9.14452 19.3316 9.53281 18.9434 10.0086 18.9434C10.4844 18.9434 10.8726 19.3316 10.8726 19.8074C10.8726 20.0366 10.7816 20.2564 10.6196 20.4184C10.4575 20.5805 10.2378 20.6715 10.0086 20.6715ZM18.898 20.6715C18.4223 20.6715 18.034 20.2832 18.034 19.8074C18.034 19.3316 18.4223 18.9434 18.898 18.9434C19.3738 18.9434 19.7621 19.3316 19.7621 19.8074C19.7621 20.0366 19.6711 20.2564 19.509 20.4184C19.347 20.5805 19.1272 20.6715 18.898 20.6715Z"
                          fill="black"
                        />
                      </svg>

                      <h1 className="font-semibold xl:text-xl lg:text-xl md:text-lg sm:text-base xs:text-sm">
                        Hey, it feels so light!
                      </h1>
                      <span className="font-medium xl:text-lg lg:text-lg md:text-base sm:text-sm xs:text-xs">
                        There is nothing in your bag
                      </span>
                    </div>
                  )}

                  {totalPrize != 0 ? (
                    <DialogFooter className="items-end min-h-min lg:w-[375px]">
                      <Button className="flex xl:text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs xl:h-10 lg:h-9 md:h-8 sm:h-7 xs:h-6 text-black bg-transparent  border-black border-[1px] rounded-3xl hover:bg-transparent text-center">
                        {' '}
                        <DialogTrigger asChild>
                          <Link href="/cart">Cart</Link>
                        </DialogTrigger>
                      </Button>

                      <Button className="flex xl:text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs xl:h-10 lg:h-9 md:h-8 sm:h-7 xs:h-6 text-black bg-transparent  border-black border-[1px] rounded-3xl hover:bg-transparent text-center">
                        {' '}
                        <DialogTrigger asChild>
                          <Link href="/checkout">Checkout</Link>
                        </DialogTrigger>
                      </Button>
                      <Button className="flex xl:text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs xl:h-10 lg:h-9 md:h-8 sm:h-7 xs:h-6 text-black bg-transparent  border-black border-[1px] rounded-3xl hover:bg-transparent text-center">
                        {' '}
                        <DialogTrigger asChild>
                          <Link href="/product_comparison">Comparison</Link>
                        </DialogTrigger>
                      </Button>
                    </DialogFooter>
                  ) : (
                    ' '
                  )}
                </DialogContent>
              </Dialog>
            </li>

            <li>

              {/* {logedIn == 'true' ? ( */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="24"
                    viewBox="0 0 512 512"
                    onClick={logOut}
                  >
                    <path
                      d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                  </svg>
                </div>
              {/* ) : (
                <div onClick={logIn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                    />
                  </svg>
                </div>
              )} */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
