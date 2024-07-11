"use client";
import React, { useEffect, useState } from "react";
import Product_Card from "@/components/shared/Product_Card";
import { Button } from "@/components/ui/button";
import {
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  limit,
} from "firebase/firestore";

import { db } from "./firebase.config";
import { Product } from "@/models/types";
import Link from "next/link";

type BrowseCategory = {
  name: string;
  imgUrls: string;
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>();
  const [getCategory, setGetCategory] = useState<BrowseCategory[]>();
  const [getProducts, setGetProducts] = useState<Product[]>(); 

  // to get 3 the categories
  const browseRange = async () => {
    const array: any = [];
    setLoading(true);

    try {
      const data = query(collection(db, "category"));
      const querySnapshot = await getDocs(data);

      querySnapshot?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          if (doc.data()) {
            array.push(doc.data());
          }
        }
      );
      setGetCategory(array);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    browseRange();
  }, []);

  // to get all products from firebase we use to write query in the firebase
  const getProduct = async () => {
    const arr: any = [];                                              
    setLoading(true);
    try {
      const data = query(collection(db, "products"),limit(4)); 
      const querySnap = await getDocs(data);

      querySnap?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          
          if (doc.data()) {                                          
            arr.push({...doc.data(),id:doc.id});                                    
          }
        }
      );   

      setGetProducts(arr);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error is");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          "loader show"
        ) : (
          <div>
            <div className="bg-hero-section w-[100%] xl:h-[716px] lg:h-[650px] md:h-[630px] sm:h-[450px] xs:h-[400px] flex justify-end items-center xl:pr-10 xl:pt-20 lg:pr-10 lg:pt-18 md:pr-8 md:pt-14 sm:pr-8 sm:pl-8 sm:pt-12 xs:px-5 xs:py-4">
              <div className=" xl:w-[531px] xl:h-[443px] lg:w-[500px] lg:h-[400px] md:w-[480px] md:h-[380px] sm:w-[450px] sm:h-[340px] xs:w-[100%] xs:h-[280px] bg-skincolor rounded-[10px] xl:m-0 lg:m-0 md:m-0 sm:m-0 ">
                <div className="flex flex-col gap-[10px] xl:pt-[62px] xl:pr-[43px] xl:pb-[37px] xl:pl-[39px] lg:pt-[40px] lg:pr-[30px] lg:pb-[20px] lg:pl-[35px] md:pt-[40px] md:pr-[25px] md:pb-[20px] md:pl-[30px]  sm:pt-[35px] sm:pr-[25px] sm:pb-[18px] sm:pl-[30px] xs:pt-[20px] xs:px-[17px] xs:py-[17px] ">
                  <span className="font-semibold md:text-base xs:text-sm">New Arrival</span>
                  <p className="font-bold xl:text-[52px] xl:leading-[65px] lg:text-[45px] lg:leading-[58px] md:text-[40px] md:leading-[53px] sm:text-[35px] sm:leading-[43px] xs:text-[28px] xs:leading-[32px] text-dark">
                    Discover Our New Collection
                  </p>
                  <p className="font-semibold md:text-lg xs:text-base xl:leading-8 lg:leading-7 md:leading-7 sm:leading-7 xs:leading-6">
                   Welcome to our website.Here you can get a wide variety of furniture according to your choice. {" "}
                  </p>
                  <Button className=" bg-dark text-[#ffffff] xl:w-[200px] xl:h-[55px] lg:w-[180px] lg:h-[50px]  md:w-[160px] md:h-[45px] sm:w-[140px] sm:h-[40px] xs:w-[120px] xs:h-[35px] rounded-none hover:bg-dark font-bold  xl:mt-[43px] lg:mt-[22px] md:mt-[20px] sm:mt-[18px] xs:mt-[0px]">
                    <Link href={"/shop"} className="md:text-base sm:text-sm xs:text-xs">BUY NOW{" "} </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Browse range */}
            <div className="flex flex-col items-center lg:gap-10 lg:pt-10 sm:gap-6 sm:pt-8 xs:gap-3 xs:pt-6">
              <div className="flex flex-col items-center ">
                <h2 className="font-bold xl:leading-[48px] xl:text-[32px] lg:leading-[40px] lg:text-[30px] md:leading-[38px] md:text-[28px] sm:leading-[33px] sm:text-[24px] xs:leading-[28px] xs:text-[18px]">
                  Browse The Range
                </h2>
                <span className="font-normal xl:leading-[30px] xl:text-[20px] lg:leading-[28px] lg:text-[19px] md:leading-[26px] md:text-[18px] sm:leading-[24px] sm:text-[14px] xs:leading-[20px] xs:text-[14px] text-[#666666]">
                  Types of Furniture we are providing
                </span>
              </div>

              {/* Living dining bedroom */}
              <div className="flex flex-row xl:gap-5 lg:gap-4 md:gap-3 sm:gap-3 xs:gap-2 px-5">
                {getCategory?.map((item: BrowseCategory, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center hover:bg-dark hover:rounded-xl"
                  >
                    <img
                      src={item.imgUrls}
                      alt={item.name}
                      height={480}
                      width={381}
                      className="hover:opacity-90"
                    />
                    <span className="font-semibold xl:leading-9 xl:text-2xl lg:leading-8 lg:text-xl md:leading-8 md:text-xl sm:leading-8 sm:text-xl xl:my-[15px] lg:my-[14px] md:my-[13px] sm:my-[10px] xs:my-[8px]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className=" text-center xl:mt-5 xl:mb-8 lg:mt-4 lg:mb-7 md:mt-3 md:mb-6 sm:mt-2 sm:mb-5 xs:mt-1 xs:mb-4 font-bold xl:leading-[48px] xl:text-[32px] lg:leading-[45px] lg:text-[30px] md:leading-[40px] md:text-[28px] sm:leading-[38px] sm:text-[26px] xs:leading-[28px] xs:text-[18px]">
              Our Products
            </p>

            <Product_Card passProducts={getProducts}/>
            <Button
              className="flex m-auto bg-[#FFFFFF] text-dark border-dark border-[1px] xl:w-[245px] xl:h-[48px] lg:w-[230px] lg:h-[48px] md:w-[200px] md:h-[40px] sm:w-[180px] sm:h-[38px] xs:w-[160px] xs:h-[35px] rounded-none hover:bg-transparent text-center mt-8"
            >
             <Link href="/shop">Show More</Link> 
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
