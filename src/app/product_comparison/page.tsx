'use client';
import React, { useEffect, useState } from 'react';
import Shared_Section from '@/components/shared/Shared_Section';
import Banner from '@/components/shared/Banner';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { add, remove } from '@/redux/cartSlice';
import { Product } from '@/models/types';

const productDetails = () => {
  const pageTitle = 'Product Comparison';

  const crumbs = { title: 'Comparison', link: '/product_comparison' };
  const [loading, setLoading] = useState<boolean>();
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);

  const handleDelete = (id: string) => {
    console.log(id, 'id value');
    dispatch(remove(id));
  };

  const addToCart = (item: object[], count: number) => {
    let data = {
      items: item,
      counter: count,
    };
    dispatch(add(data, count));
    toast.success('Item Added');
    console.log('Add to cart clicked');
  };

  return (
    <>
      <div>
        {loading ? (
          'loader we use in apper'
        ) : (
          <div>
            <Shared_Section pageTitle={pageTitle} crumbs={crumbs} />

            <div className="overflow-x-auto">
              <table className="flex flex-col mx-[54px] mb-[100px] pt-8 ">
                <thead>
                  <tr className=" grid grid-cols-4 py-3 gap-5 lg:pb-[64px] md:pb-[54px] sm:pb-[44px] xs:pb-[34px] md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td className="xl:gap-[21px] lg:gap-[18px] md:gap-[16px] sm:gap-[16px] xs:gap-[14px] lg:content-normal xs:content-center lg:pt-5">
                      <span className="font-medium xl:text-[28px] xl:leading-9 lg:text-[26px] lg:leading-8 md:text-[24px] md:leading-7 sm:text-[22px] sm:leading-6 xs:text-[20px] xs:leading-5 ">
                        Go to Product page for more Products
                      </span>
                      <h2 className="pt-2">
                        <Link
                          href="/shop"
                          className="border-b-2 lg:text-xl md:text-lg sm:text-base xs:text-sm text-light"
                        >
                          View More
                        </Link>
                      </h2>
                    </td>

                    {cartitems?.map((item: Product) => (
                      <td className="w-[100%] relative">
                        {/* <div className=" rounded-xl w-[100%]"> */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleDelete(item.items.id)}
                          className="absolute z-10 "
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.37 7.91545C13.5356 7.744 13.6272 7.51436 13.6252 7.276C13.6231 7.03764 13.5275 6.80963 13.3589 6.64107C13.1904 6.47252 12.9624 6.37691 12.724 6.37484C12.4856 6.37277 12.256 6.4644 12.0845 6.63L10 8.71455L7.91545 6.63C7.83159 6.54317 7.73128 6.47392 7.62037 6.42627C7.50946 6.37863 7.39016 6.35355 7.26946 6.3525C7.14875 6.35145 7.02904 6.37445 6.91731 6.42016C6.80559 6.46587 6.70409 6.53338 6.61873 6.61873C6.53338 6.70409 6.46587 6.80559 6.42016 6.91731C6.37445 7.02904 6.35145 7.14875 6.3525 7.26946C6.35355 7.39016 6.37863 7.50946 6.42627 7.62037C6.47392 7.73128 6.54317 7.83159 6.63 7.91545L8.71455 10L6.63 12.0845C6.54317 12.1684 6.47392 12.2687 6.42627 12.3796C6.37863 12.4905 6.35355 12.6098 6.3525 12.7305C6.35145 12.8513 6.37445 12.971 6.42016 13.0827C6.46587 13.1944 6.53338 13.2959 6.61873 13.3813C6.70409 13.4666 6.80559 13.5341 6.91731 13.5798C7.02904 13.6255 7.14875 13.6486 7.26946 13.6475C7.39016 13.6465 7.50946 13.6214 7.62037 13.5737C7.73128 13.5261 7.83159 13.4568 7.91545 13.37L10 11.2855L12.0845 13.37C12.256 13.5356 12.4856 13.6272 12.724 13.6252C12.9624 13.6231 13.1904 13.5275 13.3589 13.3589C13.5275 13.1904 13.6231 12.9624 13.6252 12.724C13.6272 12.4856 13.5356 12.256 13.37 12.0845L11.2855 10L13.37 7.91545Z"
                            fill="#B88E2F"
                          />
                        </svg>

                        <img
                          src={item.items.imgUrls[0]}
                          alt={item.items.productName}
                          width={239}
                          height={142}
                          className="m-auto rounded-xl lg:h-[200px] lg:w-[100%] md:h-[180px] md:w-[100%] sm:h-[160px] sm:w-[100%] xs:h-[140px] xs:w-[100%]"
                        />

                        {/* </div> */}

                        <div className="flex flex-col lg:gap-2 xs:gap-1 font-medium pt-[20px] ">
                          <span className=" lg:text-2xl md:text-xl sm:text-lg xs:text-base">
                            {item.items.productName}
                          </span>
                          <span className="lg:text-xl md:text-lg sm:text-base xs:text-sm">
                            {' '}
                            Rs.
                            {item.items.discount > item.items.mrp ||
                            item.items.discount !== 0
                              ? item.items.discount
                              : item.items.mrp}
                          </span>

                          <div className="lg:flex lg:flex-row lg:gap-0 xs:flex xs:flex-col xs:gap-1">
                            <div className="md:pr-[22px] flex gap-1 pt-[3px]">
                              <span>{item.items.stars}</span>

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0L12 6L18 6.75L13.88 11.37L15 18L9 15L3 18L4.13 11.37L0 6.75L6 6L9 0Z"
                                  fill="#FFC700"
                                />
                              </svg>

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0L12 6L18 6.75L13.88 11.37L15 18L9 15L3 18L4.13 11.37L0 6.75L6 6L9 0Z"
                                  fill="#FFC700"
                                />
                              </svg>

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0L12 6L18 6.75L13.88 11.37L15 18L9 15L3 18L4.13 11.37L0 6.75L6 6L9 0Z"
                                  fill="#FFC700"
                                />
                              </svg>

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0L12 6L18 6.75L13.88 11.37L15 18L9 15L3 18L4.13 11.37L0 6.75L6 6L9 0Z"
                                  fill="#FFC700"
                                />
                              </svg>

                              <svg
                                width="10"
                                height="18"
                                viewBox="0 0 10 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.1563 6.0125L0.800049 6.9375L5.40005 11.4188L4.31255 17.75L10 14.7625V0.25L7.1563 6.0125Z"
                                  fill="#FFC700"
                                />
                              </svg>
                            </div>
                            <span className="lg:border-l-2 lg:pl-[22px] sm:text-[13px] xs:text-xs text-light content-center">
                              {' '}
                              {item.items.reviews} reviews
                            </span>
                          </div>
                        </div>
                      </td>
                    ))}

                    {/* Part 3 */}
                    <td className="font-semibold text-[28px] leading-9 m-auto">
                      <Button className="flex m-auto lg:text-lg sm:text-base xs:text-sm bg-dark text-white border-none xl:w-[200px] xl:h-[48px] lg:w-[180px] lg:h-[48px] md:w-[170px] md:h-[40px] sm:w-[150px] sm:h-[38px] xs:w-[120px] xs:h-[35px] rounded-none hover:bg-dark text-center font-medium mt-8">
                        <Link href={'/shop'}>+ Add Product</Link>
                      </Button>
                    </td>
                  </tr>
                </thead>
                <td>
                  <hr className="bg-black xl:w-[100%] w-[1100px]" />
                </td>

                {/* Lower part */}

                <tbody>
                  <tr className="md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[20px] sm:leading-[28px] sm:py-4 xs:text-[18px] xs:leading-[26px] xs:py-3">
                      General
                    </td>
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Sales Package</td>

                    {cartitems?.map((item: string) => (
                      <td>{item.items.salesPackage}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Model Number</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.modelNumber}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Secondary Material</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.secondaryMaterial}</td>
                    ))}
                  </tr>

                  <tr className="grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Configuration</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.configuration}</td>
                    ))}
                  </tr>

                  <tr className="grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Upholstery Material</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.upholsteryMaterial}</td>
                    ))}
                  </tr>

                  <tr className="grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Upholstery Color</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.upholsteryColor}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[20px] sm:leading-[28px] sm:py-4 xs:text-[18px] xs:leading-[26px] xs:py-3">
                      Product
                    </td>
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Filling Material</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.fillingMaterial}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Finish Type</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.finishType}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Adjustable Headrest</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.adjustableHeadrest}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Maximum Load Capacity</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.maximumLoadCapacity}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Origin of Manufacture</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.originOfManufacture}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[20px] sm:leading-[28px] sm:py-4 xs:text-[18px] xs:leading-[26px] xs:py-3">
                      Dimensions
                    </td>
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Width</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.width}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Height</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.height}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Depth</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.depth}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Weight</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.weight}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Seat Height</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.seatHeight}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Leg Height</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.legHeight}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[20px] sm:leading-[28px] sm:py-4 xs:text-[18px] xs:leading-[26px] xs:py-3">
                      Warranty
                    </td>
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Warranty Summary</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.warrantySummary}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Warranty Service Type</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.warrantyServiceType}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]   md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Covered in Warranty</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.coveredInWarranty}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Not Cover in Warranty</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.notCoveredInWarranty}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td>Domestic Warranty</td>
                    {cartitems?.map((item: string) => (
                      <td>{item.items.domesticWarranty}</td>
                    ))}
                  </tr>

                  <tr className=" grid grid-cols-4 md:py-3 xs:py-2 md:w-[1100px] sm:w-[900px] xs:w-[800px]">
                    <td></td>
                    {cartitems?.map((item: Product[], index: number) => (
                      <td key={index}>
                        <Button
                          className=" bg-dark text-[#ffffff] text-lg  xl:w-[200px] xl:h-[55px] lg:w-[180px] lg:h-[50px]  md:w-[160px] md:h-[45px] sm:w-[140px] sm:h-[40px] xs:w-[120px] xs:h-[35px] rounded-none hover:bg-dark xl:mt-[25px] lg:mt-[22px] md:mt-[20px] sm:mt-[18px] xs:mt-[18px]"
                          value={item}
                          onClick={() => addToCart(item.items, count)}
                        >
                          {/* <Link href={`/single_product/${item.items.id}`}> Add To Cart{" "}</Link> */}
                          <span>Add to cart</span>
                        </Button>
                      </td>
                    ))}

                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Banner />
          </div>
        )}
      </div>
    </>
  );
};

export default productDetails;
