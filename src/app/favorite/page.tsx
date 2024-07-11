'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  arrayRemove,
  updateDoc,
  deleteField,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Spinner from '@/components/shared/Spinner';
import { auth } from '../firebase.config';
import { useParams, useRouter } from 'next/navigation';
import Product_Card from '@/components/shared/Product_Card';
import { Product } from '@/models/types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/cartSlice';
import addFavCart from '@/redux/cartSlice'

const page = () => {
  const router = useRouter();
  // const id = useParams();
  const [favouriteItem, setFavouriteItem] = useState<Product[]>();

  const [limits, setLimits] = useState(4);
  const [loading, setLoading] = useState<boolean>();
  const [copied, setCopied] = useState();
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  // to get all the favorite products

  const favProd = async () => {
    const array: any = [];
    const array1: any = [];
    setLoading(true);
    try {
      const data = query(
        collection(db, 'favourite'),
        where('userId', '==', auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(data);
      querySnapshot?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          if (doc.data()) {
            array.push(doc.data());
          }
        }
      );

      for (var i = 0; i < array.length; i++) {
        const data1 = query(
          collection(db, 'products'),
          where('productId', '==', array[i].productId)
        );
        const querySnapshot1 = await getDocs(data1);

        querySnapshot1?.forEach(
          (doc1: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            if (doc1.data()) {
              array1.push(doc1.data());
            }
          }
        );
      }
      setFavouriteItem(array1);
      // console.log(favouriteItem, 'data in favouriteItem1 state');                // it comes out as undefined
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    favProd();
  }, []);

  // Add to Cart
  const directAddToCart = (item: object[],count:number) => {
    let cartData = {
      items: item,
      counter: count,
    };
    dispatch(add(cartData, count));
    toast.success('Item added');
    console.log(cartData, 'data in cart from fav');
  };

  // Share
  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(url);
        toast.success('Link copied');
        console.log(url, 'value of link is');
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

    // Compare
    const compare = (item: object[], count: number) => {
      let compareItem = {
        items: item,
        counter: count,
      };
      dispatch(add(compareItem, count));
      toast.success('Item added to product comparison');
    };

  const deleteDocument = async (id?: string) => {
    const q = query(collection(db, 'favourite'), where('productId', '==', id),where("userId","==",auth.currentUser?.uid));

    try {
      const querySnapshot=await getDocs(q);

      querySnapshot.forEach((doc)=>{
        deleteDoc(doc.ref)
        .then(()=>{
          toast.success("Product removed")
           favProd();
        })
        .catch((error)=>{
          toast.error("Unable to remove product")
        })
      })
    } catch (error) {
      console.log("error in getting documents",error)
    }
  };

  return (
    <>
      {favouriteItem?.length !== 0 ? (
        <div className="xl:px-[102px] lg:px-[90px] md:px-[70px] sm:px-[25px] xs:px-[18px]">
          <p className="xl:mt-5 xl:mb-8 lg:mt-4 lg:mb-7 md:mt-3 md:mb-6 sm:mt-2 sm:mb-5 xs:mt-1 xs:mb-4 text-center md:font-bold xs:font-semibold xl:leading-[48px] xl:text-[32px] lg:leading-[45px] lg:text-[30px] md:leading-[40px] md:text-[28px] sm:leading-[38px] sm:text-[22px] xs:leading-[28px] xs:text-[18px]">
            Favourite Products
          </p>
          <div>
            <div className="xl:mt-10 lg:mt-8 md:mt-6 sm:mt-4 xs:mt-2 xl:grid xl:grid-cols-4 xl:gap-8 lg:grid lg:grid-cols-3 lg:gap-8 md:grid md:grid-cols-2 md:gap-8 sm:grid sm:grid-cols-2 sm:gap-6 xs:grid xs:grid-cols-2 xs:gap-4">
              {favouriteItem?.map((item, index: number) => (
                <div key={index} className="relative overflow-hidden w-auto ">
                  <Card className="w-auto rounded-none bg-[#F4F5F7] border-none ">
                    <Link
                      href={`/single_product/${item.productId}`}
                      className="xl:flex-col lg:flex-col md:flex-col sm:flex-col xs:flex-col"
                    >
                      <img
                        src={item.imgUrls[0]}
                        alt={item.productName}
                        height={301}
                        width={285}
                        className="md:w-screen xs:w-screen"
                      />
                      <div className="absolute h-full w-full hover:bg-black/40  flex flex-col gap-[24px] items-center justify-center bottom-0  transition-all opacity-0 hover:opacity-100 ">
                        <Button
                          value={count}
                          onClick={() => directAddToCart(item,count)}
                          className="bg-[#FFFFFF] text-dark hover:bg-[#FFFFFF] hover:text-dark xl:w-[202px] xl:h-[48px] lg:w-[190px] lg:h-[43px] md:w-[180px] md:h-[40px] sm:w-[160px] sm:h-[38px] xs:w-[140px] xs:h-[33px] rounded-none text-center font-semibold"
                        >
                          <Link href="#">Add to cart</Link>
                        </Button>

                        <div className="flex gap-[12px] text-[#ffffff] h-[24px] w-[252] lg:flex-row">
                          <div className="  flex xl:gap-[3px] md:gap-1 sm:gap-[3px] items-center"
                           onClick={(event) => {
                            event.preventDefault();
                            copyToClipboard(
                              window.location.origin +
                                `/single_product/${item.productId}`
                            );
                          }} >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] xs:h-[12px] xs:w-[12px]"
                            >
                              <path
                                d="M12 10.6667C11.4747 10.6667 11 10.8733 10.644 11.2047L5.94 8.46667C5.97333 8.31334 6 8.16 6 8C6 7.84 5.97333 7.68667 5.94 7.53334L10.64 4.79334C11 5.12667 11.4733 5.33334 12 5.33334C13.1067 5.33334 14 4.44 14 3.33334C14 2.22667 13.1067 1.33334 12 1.33334C10.8933 1.33334 10 2.22667 10 3.33334C10 3.49334 10.0267 3.64667 10.06 3.8L5.36 6.54C5 6.20667 4.52667 6 4 6C2.89333 6 2 6.89334 2 8C2 9.10667 2.89333 10 4 10C4.52667 10 5 9.79333 5.36 9.46L10.0587 12.2053C10.0211 12.3563 10.0014 12.5111 10 12.6667C10 13.0622 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5144C11.6001 14.6658 12.0022 14.7054 12.3902 14.6282C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0568C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5358 13.44 11.2235 13.1111 11.0037C12.7822 10.784 12.3956 10.6667 12 10.6667Z"
                                fill="white"
                              />
                            </svg>
                            <span className="lg:text-base md:text-xs sm:text-sm xs:text-sm">
                              Share
                            </span>
                          </div>

                          <Link href="/product_comparison"  
                          // value={count}
                           onClick={() => compare(item,count)}>
                            <div className="  flex xl:gap-[3px] md:gap-1 sm:gap-[3px] items-center">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] xs:h-[12px] xs:w-[12px]"
                              >
                                <path
                                  d="M10.08 7L11.08 8L14.52 4.55L11 1L10 2L11.8 3.8H2.00001V5.2H11.82L10.08 7ZM5.86001 9L4.86001 8L1.42001 11.5L4.91001 15L5.91001 14L4.10001 12.2H14V10.8H4.10001L5.86001 9Z"
                                  fill="white"
                                />
                              </svg>
                              <span className="lg:text-base md:text-xs sm:text-sm xs:text-sm">
                                Compare
                              </span>
                            </div>
                          </Link>

                          <Link href="/favorite">
                            <div
                              className=" flex xl:gap-[3px] md:gap-1 sm:gap-[3px] items-center"
                              onClick={() => {
                                deleteDocument(item?.productId);
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                className="md:h-[16px] md:w-[16px] sm:h-[14px] sm:w-[14px] xs:h-[12px] xs:w-[12px]"
                              >
                                <path
                                  d="M7.99973 14.0361C-5.33333 6.66667 3.99999 -1.33333 7.99973 3.72537C12 -1.33334 21.3333 6.66667 7.99973 14.0361Z"
                                  stroke="white"
                                  stroke-width="1.8"
                                />
                              </svg>
                              <span className="lg:text-base md:text-xs sm:text-sm xs:text-sm">
                                Like
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="lg:pt-[16px] lg:pr-[20px] lg:pb-[30px] lg:pl-[16px] md:pt-[14px] md:pr-[20px] md:pb-[30px] md:pl-[16px] sm:pt-[8px] sm:pr-[0px] sm:pb-[8px] sm:pl-[8px] xs:pt-[6px] xs:pr-[3px] xs:pb-[6px] xs:pl-[6px]">
                        <div className="flex flex-col ">
                          <span className="font-semibold xl:2xl lg:text-xl md:text-lg sm:text-base xs:text-sm">
                            {item.productName}
                          </span>
                          <span className="lg:text-base md:text-sm sm:text-sm xs:text-xs text-[#9F9F9F]">
                            {item.title}
                          </span>
                        </div>

                        {item.discount === null || item.discount === 0 ? (
                          <span className="font-semibold xl:text-xl lg:text-lg md:text-base sm:text-[14px] xs:text-xs">
                            Rs {item.mrp}
                          </span>
                        ) : (
                          <div className="flex gap-4 items-center sm:py-0 xs:py-1">
                            <span className="font-semibold xl:text-xl lg:text-lg md:text-base sm:text-[14px] xs:text-xs">
                              Rs{' '}
                              {item.discount > 0 && item.discount < item.mrp
                                ? item.discount
                                : item.mrp}
                            </span>
                            <span className="text-[#B0B0B0] md:text-base sm:text-sm xs:text-[10px] line-through">
                              Rs {item.mrp}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          </div>
{/* button show more */}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center justify-center gap-2 py-20 px-5">
          <svg
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="xl:h-36 xl:w-36 lg:h-32 lg:w-32 md:h-24 md:w-24 sm:h-14 sm:w-14 xs:h-10 xs:w-10"
          >
            <path
              d="M7.16668 1.5C3.94551 1.5 1.33334 4.08533 1.33334 7.275C1.33334 9.84983 2.35418 15.9608 12.4027 22.1383C12.5827 22.2479 12.7893 22.3058 13 22.3058C13.2107 22.3058 13.4173 22.2479 13.5973 22.1383C23.6458 15.9608 24.6667 9.84983 24.6667 7.275C24.6667 4.08533 22.0545 1.5 18.8333 1.5C15.6122 1.5 13 5 13 5C13 5 10.3878 1.5 7.16668 1.5Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 className="font-semibold xl:text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-base">
            Hey, it feels so light!
          </h1>
          <span className="font-medium xl:text-xl lg:text-xl md:text-lg sm:text-base xs:text-xs">
            There is nothing in your favorite.Let's add something
          </span>
        </div>
      )}
    </>
  );
};

export default page;
