'use client';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Shared_Section from '@/components/shared/Shared_Section';
import Banner from '@/components/shared/Banner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Crumbs } from '@/models/types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Product = {
  firstName: string;
  lastName: string;
  companyName: string;
  countryRegion: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: number;
  phone: number;
  email: string;
  additionalInfo: string;
  cod: boolean;
};

const page = () => {
  const { register, handleSubmit, formState } = useForm<Product>();
  const { errors } = formState;
  const [billingDetails, setBillingDetails] = useState<Product>();

  const pageTitle = 'Checkout';
  const crumbs: Crumbs = { title: 'Checkout', link: '/checkout' };

  const cartitems = useSelector((state)=> state.cart);

  let totalPrize = 0;
  const updatePrize = (subtotal: number) => {
    totalPrize = totalPrize + subtotal;
  };

  const onSubmit = (data: Product) => {
    setBillingDetails(data);
    toast.success('Order Placed Successfully');
    console.log(data,"user details");
  };

  return (
    <div>
      <Shared_Section pageTitle={pageTitle} crumbs={crumbs} />
      <div className=" xl:pt-[63px] xl:pr-[98px] xl:pb-[52px] xl:pl-[98px] lg:pt-[50px] lg:px-[85px] lg:pb-[45px] md:pt-[30px] md:px-[40px] md:pb-[40px] sm:pt-[20px] sm:px-[25px] sm:pb-[30px] xs:pt-[25px] xs:px-[25px] xs:pb-[20px]">
        <div className="xl:flex xl:flex-row xl:gap-[25px] lg:flex lg:flex-row lg:gap-[10px] md:flex md:flex-row md:gap-[16px] sm:flex sm:flex-col sm:gap-0">
          {/* left part */}
          <div className="xl:pt-[35px] xl:px-[58px] xl:pb-[71px] lg:pt-[30px] lg:pr-[40px] lg:pb-[50px] lg:pl-[30px] md:pt-[28px] md:pr-[25px] md:pb-[40px] md:pl-[30px] sm:pt-[20px] sm:px-[18px] sm:pb-[20px] xs:px-0 xs:pb-[16px] xl:w-[608px] lg:w-[580px] md:w-[550px] sm:w-auto ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="xl:flex xl:flex-col xl:gap-9 lg:flex lg:flex-col lg:gap-8 md:flex md:flex-col md:gap-7 sm:flex sm:flex-col sm:gap-6 xs:flex xs:flex-col xs:gap-4 xl:w-auto lg:w-auto md:w-96 ">
                <span className="xl:font-semibold xl:text-4xl xl:leading-[54px] lg:font-semibold lg:text-3xl lg:leading-[52px]  md:font-semibold md:text-2xl md:leading-[48px] sm:font-semibold sm:text-2xl sm:leading-[40px] xs:font-semibold xs:text-xl xs:leading-[35px]">
                  Billing details
                </span>

                <div className="xl:flex xl:flex-row  xl:gap-8 lg:flex lg:flex-row  lg:gap-8 md:flex md:flex-row md:gap-7 sm:flex sm:flex-col sm:gap-6 xs:flex xs:flex-col xs:gap-4 ">
                  <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px] xl:w-max lg:w-52 md:w-44 ">
                    <label about="firstName" className="font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', {
                        required: 'First name is required',
                      })}
                      className=" border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                    />
                    {errors?.firstName && (
                      <span className="text-red-500">
                        {errors?.firstName?.message}*
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px] xl:w-max lg:w-52 md:w-44 ">
                    <label about="lastName" className="font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', {
                        required: 'Last name is required',
                      })}
                      className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                    />
                    {errors?.lastName && (
                      <span className="text-red-500">
                        {errors?.lastName?.message}*
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="companyName" className="font-medium">
                    Company Name(Optional)
                  </label>
                  <input
                    type="text"
                    {...register('companyName')}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="countryRegion" className="font-medium">
                    Country / Region
                  </label>
                  <select
                    id="countryRegion"
                    {...register('countryRegion', {
                      required: 'Country region is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  >
                    <option value="Select Country">Select Country</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="Denmark">Denmark</option>
                    <option value="England">England</option>
                    <option value="France">France</option>
                    <option value="German">German</option>
                    <option value="India">India</option>
                    <option value="Italy">Italy</option>
                    <option value="Norway">Norway</option>
                  </select>

                  {errors?.countryRegion && (
                    <span className="text-red-500">
                      {errors?.countryRegion?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="streetAddress" className="font-medium">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    {...register('streetAddress', {
                      required: 'Street address is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />

                  {errors?.streetAddress && (
                    <span className="text-red-500">
                      {errors?.streetAddress?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="townCitys" className="font-medium">
                    Town / City
                  </label>
                  <input
                    type="text"
                    id="townCity"
                    {...register('townCity', {
                      required: 'Town/City is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />
                  {errors?.townCity && (
                    <span className="text-red-500">
                      {errors?.townCity?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="province" className="font-medium">
                    Province
                  </label>
                  <select
                    id="province"
                    {...register('province', {
                      required: 'Province is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  >
                    <option value="Select">Select </option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Ontario">Ontario</option>
                  </select>
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="zipCode" className="font-medium">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode', {
                      required: 'Zip code is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />
                  {errors?.zipCode && (
                    <span className="text-red-500">
                      {errors?.zipCode?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="phone" className="font-medium">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />

                  {errors?.phone && (
                    <span className="text-red-500">
                      {errors?.phone?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col xl:gap-[22px] lg:gap-[20px] md:gap-[18px] sm:gap-[16px] xs:gap-[14px]">
                  <label about="email" className="font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, // to verify that it should be in email format
                        message: 'Invalid Email',
                      },

                      // to validate that use enter a real email id
                      validate: (fieldValue) => {
                        return (
                          fieldValue !== 'admin@example.com' ||
                          'Enter different email'
                        );
                      },

                      required: 'Email is required',
                    })}
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />
                  {errors?.email && (
                    <span className="text-red-500">
                      {errors?.email?.message}*
                    </span>
                  )}
                </div>

                <div className="flex flex-col mt-5 ">
                  <input
                    type="text"
                    name="additionalInfo"
                    id="additionalInfo"
                    placeholder="Additional information"
                    className="border-2 xl:h-[75px] xl:pl-7 xl:rounded-[10px] lg:h-[65px] lg:pl-6 lg:rounded-[8px] md:h-[60px] md:pl-5 md:rounded-[6px] sm:h-[55px] sm:pl-4 sm:rounded-[6px] xs:h-[50px] xs:pl-4 xs:rounded-[6px]"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="xl:px-[37px] xl:py-[87px] xl:w-[608px] lg:px-[30px] lg:py-[80px] lg:w-[580px] md:px-[25px] md:py-[75px] md:w-[550px] sm:px-[20px] sm:py-[20px] xs:px-[6px] xs:py-[16px] sm:w-auto xl:m-0 lg:m-0 md:m-0 ">
            {/* right 1st part */}
            <div className="flex flex-col lg:gap-5 md:gap-4 sm:gap-3 xs:gap-2">
              <div className="flex justify-between xl:font-medium xl:text-2xl xl:leading-9 lg:font-medium lg:text-2xl lg:leading-8 md:font-medium md:text-xl md:leading-7 sm:font-medium sm:text-xl sm:leading-7 xs:font-medium xs:text-xl xs:leading-7">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {cartitems?.map((item) => (
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <span className="text-light">{item.items.productName}</span>
                    <span>X</span>
                    <span>{item.counter}</span>
                  </div>
                  <span>
                    Rs.
                    {item.items.discount > item.items.mrp || item.items.discount !== 0
                      ? item.items.discount
                      : item.items.mrp}
                    {updatePrize(
                      (item.items.discount > item.items.mrp || item.items.discount !== 0
                        ? item.items.discount
                        : item.items.mrp) * item.counter
                    )}
                  </span>
                </div>
              ))}

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {totalPrize}</span>
              </div>

              <div className="flex justify-between pb-[33px]">
                <span>Total</span>
                <span className="xl:font-bold xl:text-2xl xl:leading-9 lg:font-bold lg:text-2xl lg:leading-8 md:font-semibold md:text-xl md:leading-7 sm:font-semibold sm:text-xl sm:leading-7 xs:font-medium xs:text-xl xs:leading-7 text-dark">
                  Rs. {totalPrize}
                </span>
              </div>
            </div>

            <hr />

            <div className="lg:pt-[33px] lg:pb-[16px] md:pt-[24px] md:pb-[12px] sm:pt-[20px] sm:pb-[10px] xs:pt-[20px] xs:pb-[8px]">
              <input
                type="checkbox"
                id="cod"
                value="cod"
                {...register('cod', {
                  required: '(This Field is required *)',
                })}
              />
               {' '}
              <label about="cod" htmlFor="cod">
                Cash on Delivery
              </label>
              {errors?.cod && (
                <span className="text-red-500 flex flex-col">
                  {errors?.cod?.message}
                </span>
              )}
            </div>

            <div className=" flex flex-col xl:gap-10 lg:gap-9 md:gap-7 sm:gap-6 xs:gap-5 items-center">
              <p className="md:text-base xs:text-sm text-justify">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>

              {totalPrize != 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    type="submit"
                    className="flex text-xl text-black bg-transparent  border-black border-[1px] rounded-lg hover:bg-transparent text-center xl:w-[318px] xl:h-16 lg:w-[280px] lg:h-16 md:w-[240px] md:h-14 sm:w-[200px] sm:h-14 xs:w-[180px] xs:h-12"
                  > Place Order
                  </Button>
                </form>
              ) : (
                <span className='font-semibold text-red-500'>Nothing to buy</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default page;