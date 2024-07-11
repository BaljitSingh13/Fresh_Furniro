'use client';
import React, { useState } from 'react';
import Shared_Section from '@/components/shared/Shared_Section';
import Banner from '@/components/shared/Banner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { remove } from '@/redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Crumbs } from '@/models/types';

const page = () => {
  const pageTitle = 'Cart';
  const crumbs:Crumbs = { title: 'Cart', link:'/cart' };

  const dispatch = useDispatch();
  const cartitems = useSelector((state:RootState) => state.cart);

  const [count, setCount] = useState(0);
  
  let totalPrize = 0;
  const updatePrize = (subtotal: number) => {
    totalPrize = totalPrize + subtotal;
    console.log(totalPrize,"total prize ")
    // totalPrize=totalPrize* (count <1 ? 1  : count);
  };

  const handleDelete = (id:string) => {
    console.log(id, 'id value');
    dispatch(remove(id));
  };

  return (
    <div>
      <Shared_Section pageTitle={pageTitle} crumbs={crumbs} />
      {cartitems.length > 0 ? (
        <div className=" xl:pt-[72px] xl:px-[100px] xl:pb-[63px] lg:pt-[50px] lg:px-[70px] lg:pb-[55px] md:pt-[45px] md:px-[65px] md:pb-[40px] sm:pt-[35px] sm:px-[20px] sm:pb-[40px] xs:pt-[10px] xs:px-[10px] xs:pb-[16px]">
          <div className="xl:flex xl:flex-row xl:gap-[30px] lg:flex lg:flex-row lg:gap-[30px] md:flex md:flex-col md:gap-[30px] sm:flex sm:flex-col sm:gap-[25px] xs:flex xs:flex-col xs:gap-[20px]">
            {/* //left part */}
            <div className="xl:flex xl:flex-col xl:gap-14 lg:flex lg:flex-col lg:gap-14 md:flex md:flex-col md:gap-8 sm:flex sm:flex-col sm:gap-6 xs:flex xs:flex-col xs:gap-6 lg:w-[70%] xs:w-[100%]">
              <div className="grid grid-cols-6 bg-skincolor items-center lg:h-[55px] md:h-[50px] sm:h-[45px] xs:h-[40px]">
                <span className="col-start-2 md:text-base xs:text-sm">
                  Product
                </span>
                <span className="md:text-base xs:text-sm">Prize</span>
                <span className="md:text-base xs:text-sm">Quantity</span>
                <span className="md:text-base xs:text-sm">Subtotal</span>
              </div>

              {cartitems?.map((item) => (
                <div  key={item.id} className="grid grid-cols-6 items-center xl:gap-5 lg:gap-4 md:gap-3 xs:gap-2 overflow-auto">
                  <div className=" bg-skincolor rounded-xl flex w-[100%] lg:h-[105px] md:h-[90px] md:w-[90px] sm:h-[80px] sm:w-[80px] xs:h-[70px] xs:w-[70px]">
                    <img
                      src={item.items.imgUrls[0]}
                      alt={item.items.productName}
                      width={100}
                      height={100}
                      className="md:visible w-[100%] lg:h-[105px] md:h-[90px] md:w-[90px] sm:h-[80px] sm:w-[80px] xs:h-[70px] xs:w-[70px] rounded-xl"
                    />
                  </div>

                  <span className="md:text-base xs:text-sm col-start-2">
                    {item.items.productName}
                  </span>
                  <span className="md:text-base xs:text-sm">
                    Rs.
                    {item.items.discount > item.items.mrp ||
                    item.items.discount !== 0
                      ? item.items.discount
                      : item.items.mrp}
                    {updatePrize(
                      (item.items.discount > item.items.mrp ||
                      item.items.discount !== 0
                        ? item.items.discount
                        : item.items.mrp) * (item.counter + count)
                    )}
                  </span>

                  <span className="md:text-base xs:text-sm">
                    {item.counter}
                  </span>
                  
                  <span className="md:text-base xs:text-sm">
                    {' '}
                    Rs.
                    {(item.items.discount > item.items.mrp ||
                    item.items.discount !== 0
                      ? item.items.discount
                      : item.items.mrp) * item.counter}
                  </span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDelete(item.items.productId)}
                    className="lg:h-[22px] lg:w-[22px] md:h-[20px] md:w-[20px] sm:h-[18px] sm:w-[18px] xs:h-[16px] xs:w-[16px]"
                  >
                    <path
                      d="M20.625 4H17.125V1.8125C17.125 0.847266 16.3402 0.0625 15.375 0.0625H6.625C5.65977 0.0625 4.875 0.847266 4.875 1.8125V4H1.375C0.891016 4 0.5 4.39102 0.5 4.875V5.75C0.5 5.87031 0.598437 5.96875 0.71875 5.96875H2.37031L3.0457 20.2695C3.08945 21.202 3.86055 21.9375 4.79297 21.9375H17.207C18.1422 21.9375 18.9105 21.2047 18.9543 20.2695L19.6297 5.96875H21.2812C21.4016 5.96875 21.5 5.87031 21.5 5.75V4.875C21.5 4.39102 21.109 4 20.625 4ZM15.1562 4H6.84375V2.03125H15.1562V4Z"
                      fill="#B88E2F"
                    />
                  </svg>
                </div>
              ))}
            </div>

            <div className="bg-skincolor xl:w-[393px] xl:h-[390px] xl:text-center xl:pt-[15px]  lg:w-[393px] lg:h-[380px] lg:text-center lg:pt-[12px] md:w-[100%] md:h-[270px] md:text-center md:pt-[16px] sm:w-[100%] sm:h-[215px] sm:text-center sm:pt-[10px] xs:w-[100%] xs:h-[180px] xs:text-center xs:pt-[10px]">
              <span className="font-bold lg:text-[32px] lg:leading-[48px] md:text-[28px] md:leading-[40px] sm:text-[24px] sm:leading-[32px] xs:text-[20px] xs:leading-[28px]">
                Cart Totals
              </span>

              <div className="flex-cols md:px-14 xs:px-10 xl:pt-[61px] lg:pt-[50px] md:pt-[30px] sm:pt-[20px] xs:pt-[16px]">
                <div className="flex justify-between items-center lg:mb-8 md:mb-6 sm:mb-5 xs:mb-4">
                  <span className="font-medium lg:text-base md:text-lg sm:text-base xs:text-sm">
                    Subtotal
                  </span>
                  <span className="font-normal lg:text-base md:text-lg sm:text-base xs:text-sm text-light">
                    Rs.{totalPrize}
                  </span>
                </div>

                <div className="flex justify-between items-center lg:mb-[42px] md:mb-[36px] sm:mb-[28px] xs:mb-[24px]">
                  <span className="font-medium lg:text-base md:text-lg sm:text-base xs:text-sm">
                    Total
                  </span>
                  <span className="font-medium md:text-xl sm:text-lg xs:text-base text-dark">
                    Rs.{totalPrize}
                  </span>
                </div>
              </div>

              <Button className="flex text-black m-auto bg-transparent border-black border-[1px] xl:w-[222px] xl:h-[58px] xl:mt-8 lg:text-xl lg:w-[215px] lg:h-[50px] lg:mt-6 md:text-lg md:w-[195px] md:h-[45px] md:mt-6 sm:text-base sm:w-[150px] sm:h-[35px] sm:mt-4 xs:text-base xs:w-[120px] xs:h-[26px] xs:mt-4 lg:rounded-2xl md:rounded-xl sm:rounded-lg xs:rounded-md hover:bg-transparent text-center">
                <Link href={'/checkout'}>Check Out</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center justify-center gap-2 py-20 px-5">
          <svg
            width="26"
            height="23"
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="xl:h-36 xl:w-36 lg:h-32 lg:w-32 md:h-24 md:w-24 sm:h-14 sm:w-14 xs:h-10 xs:w-10"
          >
            <path
              d="M24.2355 16.1926H7.95234L8.76991 14.5273L22.3543 14.5027C22.8137 14.5027 23.2074 14.1746 23.2894 13.7207L25.1707 3.19062C25.2199 2.91445 25.1461 2.63008 24.9656 2.41406C24.8764 2.30775 24.7652 2.22211 24.6396 2.16309C24.514 2.10407 24.377 2.07308 24.2383 2.07227L6.95702 2.01484L6.80937 1.32031C6.7164 0.877344 6.31718 0.554688 5.86328 0.554688H1.63867C1.38267 0.554688 1.13716 0.656381 0.956142 0.837398C0.775125 1.01841 0.673431 1.26393 0.673431 1.51992C0.673431 1.77592 0.775125 2.02143 0.956142 2.20245C1.13716 2.38346 1.38267 2.48516 1.63867 2.48516H5.08124L5.72656 5.55312L7.31523 13.2449L5.26992 16.5836C5.1637 16.727 5.09972 16.8972 5.08523 17.075C5.07073 17.2528 5.10629 17.4312 5.18788 17.5898C5.35195 17.9152 5.68281 18.1203 6.04921 18.1203H7.7664C7.40032 18.6065 7.20258 19.1988 7.20312 19.8074C7.20312 21.3551 8.46093 22.6129 10.0086 22.6129C11.5562 22.6129 12.8141 21.3551 12.8141 19.8074C12.8141 19.1977 12.6117 18.6043 12.2508 18.1203H16.6559C16.2898 18.6065 16.092 19.1988 16.0926 19.8074C16.0926 21.3551 17.3504 22.6129 18.898 22.6129C20.4457 22.6129 21.7035 21.3551 21.7035 19.8074C21.7035 19.1977 21.5012 18.6043 21.1402 18.1203H24.2383C24.7687 18.1203 25.2035 17.6883 25.2035 17.1551C25.2019 16.8994 25.0993 16.6546 24.9179 16.4743C24.7366 16.294 24.4913 16.1927 24.2355 16.1926ZM7.35898 3.91797L23.1035 3.96992L21.5613 12.6051L9.19374 12.627L7.35898 3.91797ZM10.0086 20.6715C9.53281 20.6715 9.14452 20.2832 9.14452 19.8074C9.14452 19.3316 9.53281 18.9434 10.0086 18.9434C10.4844 18.9434 10.8726 19.3316 10.8726 19.8074C10.8726 20.0366 10.7816 20.2564 10.6196 20.4184C10.4575 20.5805 10.2378 20.6715 10.0086 20.6715ZM18.898 20.6715C18.4223 20.6715 18.034 20.2832 18.034 19.8074C18.034 19.3316 18.4223 18.9434 18.898 18.9434C19.3738 18.9434 19.7621 19.3316 19.7621 19.8074C19.7621 20.0366 19.6711 20.2564 19.509 20.4184C19.347 20.5805 19.1272 20.6715 18.898 20.6715Z"
              fill="black"
            />
          </svg>

          <h1 className="font-semibold xl:text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-base">
            Hey, it feels so light!
          </h1>
          <span className="font-medium xl:text-xl lg:text-xl md:text-lg sm:text-base xs:text-xs">
            There is nothing in your bag.Let's add something
          </span>
        </div>
      )}
      <Banner />
    </div>
  );
};

export default page;
