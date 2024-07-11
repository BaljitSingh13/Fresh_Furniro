'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  collection,
  query,
  getDocs,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import Spinner from '@/components/shared/Spinner';
import { TABS } from '@/models/types';
import Additional_Info from '@/components/shared/Additional_Info';
import Reviews from '@/components/shared/Reviews';
import Description from '@/components/shared/Description';
import Product_Card from '@/components/shared/Product_Card';
import { Product } from '@/models/types';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/cartSlice';

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const id = useParams();

  const crumbs = { title: 'Shop', link: '/shop' };
  const [single, setSingle] = useState<Product[]>();
  const [selectedImg, setSelectedImg] = useState<object[]>();
  const [getProducts, setGetProducts] = useState<Product[]>();
  const [imgname, setImgName] = useState(null);

  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState();

  const dispatch = useDispatch();

  const router = useRouter();
  const [tabs, setTabs] = useState<string>(TABS.DESCRIPTION);

  //*** to get the product corresponding to the id
  const singleProduct = async () => {
    const array: any = [];
    setLoading(true);

    try {
      const particular = doc(db, 'products', id?.productId as string);
      const docSnap = await getDoc(particular);

      if (docSnap.exists()) {
        array.push({ ...docSnap.data(), id: id?.productId });
      } else {
        console.log('No such document!');
      }
      setSingle(array);
      setImgName(array[0].imgUrls[0]);
      setLoading(false);
    } catch (error) {
      console.log(error, 'errors in single product page');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    singleProduct();
  }, []);

  const selectedImage = (event) => {
    setImgName(event.target.src);
  };

  // ** Get all related products
  const relatedProduct = async () => {
    const relate: any = [];
    setLoading(true);

    try {
      const same = query(collection(db, 'products'));
      // const same = query(collection(db, "products"),where("category","==","xxJkD4KRpDejUd8r6kK0"));
      const querySnap = await getDocs(same);
      querySnap?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          if (doc.data()) {
            relate.push({ ...doc.data(), id: doc.id });
          }
        }
      );
      setGetProducts(relate);
      setLoading(false);
    } catch (error) {
      console.log(error, 'errors in related product page');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    relatedProduct();
  }, []);

  // increment decrement button functionality
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  // *** check user is logged in or not
  let logedIn = localStorage.getItem('isLoggedIn');

  const testing = () => {
    logedIn = localStorage.getItem('isLoggedIn');

    if (logedIn === 'false') {
      toast.error('Please Login first');
      router.push('/sign_in');
    }
  };

  const addToCart = (item: object[], count: number) => {
    let data = {
      items: item,
      counter: count,
    };
    dispatch(add(data, count));
    toast.success('Item Added');
    setCount(1);
  };

  const comparison = (item: object[]) => {
    let data = { items: item };

    // dispatch(addcomparison(data));
    dispatch(add(data));
    toast.success('item added to product comparison');
    console.log(data, 'data of a card');
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(url);
        toast.success('Link copied');
        console.log(url, 'Value of link is');
      })
      .catch((err) => console.log('Failed to copy:', err));
  };

  // we create a function in which will show us the description
  const description = async () => {
    setTabs(TABS.DESCRIPTION);
  };

  // we create a function here which will show us the additonal info
  const additional_info = async () => {
    setTabs(TABS.ADDITIONAL_INFO);
  };

  // we create a function here which will show us the reviews
  const review = async () => {
    setTabs(TABS.REVIEWS);
  };

  if (loading) {
    return (
      <div className=" flex justify-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className=" md:w-[100%] lg:h-[100px] md:h-[80px] bg-skincolor lg:py-[38px] md:py-[28px] md:pl-[99px] sm:py-[20px] sm:pl-[40px] xs:py-[8px] xs:pl-[20px]">
          <BreadCrumbs crumbs={crumbs} />
        </div>

        {single?.map((item, index: number) => (
          <div>
            <div
              key={index}
              className="lg:pt-[50px] lg:px-[85px] lg:pb-[55px] md:pt-[30px] md:px-[70px] md:pb-[50px] sm:pt-[25px] sm:px-[45px] sm:pb-[40px] xs:pt-[25px] xs:px-[20px] xs:pb-[16px]"
            >
              <div className="xl:grid xl:grid-cols-2 xl:gap-[82px] lg:grid lg:grid-cols-2 lg:gap-[72px] md:grid md:grid-cols-1 md:gap-[30px] sm:grid sm:grid-cols-1 sm:gap-[20px] xs:grid xs:grid-cols-1 xs:gap-[16px]">
                <div className="lg:flex lg:flex-row lg:gap-[31px] lg:m-0 md:flex md:flex-col md:gap-[25px] md:m-auto sm:flex sm:flex-col sm:gap-[15px] sm:m-auto xs:flex xs:flex-col xs:gap-[15px] xs:m-auto">
                  <div className="lg:flex lg:flex-col lg:gap-2 lg:h-[416px] lg:w-[76px] md:flex md:h-[76px] md:w-[416px] sm:flex sm:h-[60px] sm:w-auto sm:gap-2 xs:flex xs:h-[50px] xs:w-auto xs:gap-2">
                    {item.imgUrls?.map((newitem, imgIndex) => (
                      <div key={imgIndex}>
                        <div className="relative rounded-xl lg:flex lg:flex-col md:flex md:flex-row sm:flex sm:flex-row xs:flex xs:flex-row items-center md:w-[76px] sm:w-[44px]">
                          <img
                            src={newitem}
                            alt={`image-${imgIndex}`}
                            width={100}
                            height={100}
                            className="xl:h-[65px] xl:w-[65px] lg:h-[60px] lg:w-[60px] md:h-[65px] md:w-[65px] sm:h-[50px] sm:w-[48px] xs:h-[45px] rounded-lg"
                            onClick={selectedImage}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl relative flex items-center xl:w-[481px] xl:h-[500px] lg:w-[481px] lg:h-[469px] md:w-[570px] md:h-[370px] sm:w-[357px] sm:h-[250px] xs:w-auto xs:h-[180px]">
                    <img
                      src={imgname}
                      alt={`image-${imgname}`}
                      width={481}
                      height={391} //md:w-min md:h-auto sm:h-[220px] xs:h-[200px]
                      className="rounded-xl xl:w-[481px] xl:h-[500px] lg:w-[481px] lg:h-[469px] md:w-[570px] md:h-[370px] sm:w-[357px] sm:h-[250px] xs:w-[100%] xs:h-[180px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:h-[730px] lg:gap-[18px] md:h-[565px] md:gap-[15px] sm:h-[492px] sm:gap-[10px] xs:h-auto xs:gap-[10px] w-auto">
                  <span className="lg:font-normal lg:text-[42px] lg:leading-[63px] md:font-normal md:text-[38px] md:leading-[50px] sm:font-normal sm:text-[24px] sm:leading-[36px] xs:font-medium xs:text-[20px] xs:leading-[24px]">
                    {item.productName}
                  </span>
                  <span className="md:font-medium md:text-[24px] md:leading-[36px] sm:font-medium sm:text-[18px] sm:leading-[28px] xs:font-medium xs:text-[16px] xs:leading-[24px] text-light">
                    Rs{' '}
                    {item.discount > item.mrp || item.discount !== 0
                      ? item.discount
                      : item.mrp}
                  </span>

                  <div className="flex">
                    <div className="md:pr-[22px] sm:pr-[18px] xs:pr-[14px] flex gap-1 pt-[3px]">
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
                    <span className="border-l-2 md:pl-[22px] md:text-base sm:pl-[18px] sm:text-sm xs:pl-[14px] xs:text-xs text-light">
                      {' '}
                      {item.reviews} Customer review
                    </span>
                  </div>

                  <p className=" h-auto md:w-[100%] md:text-base md:leading-[19.5px] sm:w-[100%] sm:text-sm xs:w-[100%] xs:text-xs text-justify">
                    {item.description}
                  </p>

                  <div className="flex flex-col md:w-[123px] md:h-[63px] sm:gap-[12px] xs:gap-[8px]">
                    <span className="sm:text-base xs:text-sm text-light">
                      Size
                    </span>
                    <div className="flex xs:gap-2">
                      {item.size.map((size, sizeIndex) => (
                        <Button
                          key={sizeIndex}
                          className="bg-[#F9F1E7]  text-black focus:bg-dark focus:text-white hover:bg-[#F9F1E7] md:hover:text-black md:h-[30px] md:w-[30px] sm:h-[28px] sm:w-[24px] xs:h-[26px] xs:w-[20px]"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className=" sm:flex sm:flex-col md:w-[123px] md:h-[63px] sm:gap-[12px] xs:gap-[10px]">
                    <span className="sm:text-base xs:text-sm text-light">
                      Color
                    </span>
                    <div className="flex sm:gap-2 xs:gap-1">
                      <span
                        style={{ backgroundColor: `#${item.color[0]}` }}
                        className={`bg-[#${item.color[0]}] md:h-[30px] md:w-[30px] sm:h-[24px] sm:w-[24px] xs:h-[20px] xs:w-[20px] rounded-full`}
                      ></span>

                      <span
                        style={{ backgroundColor: `#${item.color[1]}` }}
                        className={`bg-[#${item.color[1]}] md:h-[30px] md:w-[30px] sm:h-[24px] sm:w-[24px] xs:h-[20px] xs:w-[20px] rounded-full`}
                      ></span>

                      <span
                        style={{ backgroundColor: `#${item.color[2]}` }}
                        className={`bg-[#${item.color[2]}] md:h-[30px] md:w-[30px] sm:h-[24px] sm:w-[24px] xs:h-[20px] xs:w-[20px] rounded-full`}
                      ></span>
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-col lg:h-[63px] lg:gap-[12px] md:flex md:flex-col md:h-[63px] md:gap-[16px] ">
                    <div className="flex lg:gap-2 md:gap-3 sm:gap-3 xs:gap-2">
                      <div className="relative flex items-center justify-around md:bg-[#ffffff] text-black hover:bg-[#ffffff] xl:h-[63px] lg:h-[55px] lg:w-[115px] md:h-[50px] md:w-[100px] sm:h-[30px] sm:w-[70px] xs:h-[26px] xs:w-[60px] border-[1px] border-black text-xl leading-[30px] rounded-md">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="counter-input"
                          className="flex items-center justify-center h-5 w-5"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900 dark:text-white pl-[2px]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                            onClick={decrement}
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          className="flex items-center justify-center text-center h-5 w-8 md:text-xl xs:text-base "
                          value={count} //pass the id of the product here
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="counter-input"
                          className="flex items-center justify-center h-5 w-5 pr-[2px]"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                            onClick={increment}
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* <Button className="md:bg-[#ffffff]  md:text-black md:hover:bg-[#ffffff] md:h-[64px] md:w-[123px] border-[1px] border-black text-xl leading-[30px]" >1</Button> */}

                      <Button
                        value={item}
                        onClick={() => addToCart(item, count)}
                        className="bg-[#ffffff] text-black hover:bg-[#ffffff] xl:h-[63px] lg:h-[55px] lg:w-[215px] md:h-[50px] md:w-[180px] md:text-xl sm:h-[30px] sm:w-[120px] sm:text-base xs:h-[26px] xs:w-[92px] border-[1px] border-black leading-[30px]"
                      >
                        {/* <Link href={"#"}> Add To Cart </Link> */}
                        <span>Add To Cart</span>
                      </Button>

                      <Button
                        onClick={() => comparison(item)}
                        className="bg-[#ffffff]  text-black hover:bg-[#ffffff] xl:h-[63px] lg:h-[55px] lg:w-[215px] md:h-[50px] md:w-[180px] md:text-xl sm:h-[30px] sm:w-[120px] sm:text-base xs:h-[26px] xs:w-[92px] leading-[30px] border-[1px] border-black"
                      >
                        <Link href={'/product_comparison'}>+Compare </Link>
                      </Button>
                    </div>
                  </div>

                  <hr className="md:mt-4 sm:mt-3" />
                  <table className="md:text-base sm:text-sm xs:text-xs">
                    <tr>
                      <td>SKU</td>
                      <td>:{item.modelNumber}</td>
                    </tr>

                    <tr>
                      <td>Category</td>
                      <td>:{item.categoryName}</td>
                    </tr>

                    <tr>
                      <td>Tags</td>
                      <td>:{item.tags}</td>
                    </tr>

                    <tr>
                      <td>Share</td>
                      <td
                        onClick={(event) => {
                          event.preventDefault();
                          copyToClipboard(
                            window.location.origin +
                              `/single_product/${item.id}`
                          );
                        }}
                      >
                        <img
                          src="/assets/facebook.svg"
                          alt={'facebook'}
                          height={22}
                          width={22}
                          className="sm:h-[22px] sm:w-[22px] xs:h-[18px] xs:w-[18px]"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div className="md:pt-[40px] md:px-[70px] md:pb-[55px] sm:pt-[24px] sm:px-[40px] sm:pb-[30px] xs:pt-[20px] xs:px-[20px] xs:pb-[20px] border-t border-b lg:gap-[37px] md:flex md:flex-col md:justify-center md:gap-[24px] sm:flex sm:flex-col sm:justify-around sm:gap-[12px] xs:flex xs:flex-col xs:justify-around xs:gap-[12px]">
              <div className="flex justify-center leading-[36px]">
                <div className="lg:text-2xl md:text-xl sm:text-base xs:text-sm font-medium text-light">
                  <div className="flex md:justify-between md:gap-0 sm:gap-0 xs:gap-[10px] ">
                    <span
                      className={`hover:text-black ${
                        tabs === TABS.DESCRIPTION && 'text-black'
                      }`}
                      onClick={description}
                    >
                      Description{' '}
                    </span>

                    <span
                      className={` hover:text-black  md:px-14  sm:px-5 ${
                        tabs === TABS.ADDITIONAL_INFO && 'text-black'
                      } `}
                      onClick={additional_info}
                    >
                      Additional Information
                    </span>

                    <span
                      className={`hover:text-black ${
                        tabs === TABS.REVIEWS && 'text-black'
                      }`}
                      onClick={review}
                    >
                      Reviews[{item.reviews}]
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-light ">
                {tabs === TABS.DESCRIPTION ? (
                  <Description />
                ) : tabs === TABS.ADDITIONAL_INFO ? (
                  <Additional_Info />
                ) : (
                  <Reviews />
                )}
              </div>

              <div className="flex md:flex-row md:gap-[29px] sm:flex-col sm:gap-[18px] xs:flex-col xs:gap-[14px]">
                <div className="relative md:bg-skincolor md:rounded-xl md:flex md:flex-row md:items-center md:w-[635px] sm:flex sm:flex-col ">
                  <img
                    src={item.imgUrls[5]}
                    alt={item.productName}
                    width={657}
                    height={461}
                    className="rounded-xl lg:h-[349px] md:h-[250px] sm:h-[300px] sm:w-[100%] xs:h-[200px]"
                  />
                </div>

                <div className=" md:bg-skincolor md:rounded-xl md:flex md:items-center md:w-[635px]">
                  <img
                    src={item.imgUrls[6]}
                    alt={item.productName}
                    width={657}
                    height={461}
                    className="rounded-xl lg:h-[349px] md:h-[250px] sm:h-[300px] sm:w-[100%] xs:h-[200px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <p className="mt-5 text-center mb-8 font-bold xl:leading-[48px] xl:text-[32px] lg:leading-[45px] lg:text-[30px] md:leading-[40px] md:text-[28px] sm:leading-[38px] sm:text-[26px] xs:leading-[28px] xs:text-[18px]">
          Related Products
        </p>

        <Product_Card passProducts={getProducts} />
        <Button className="flex m-auto bg-[#FFFFFF] text-dark border-dark border-[1px] xl:w-[245px] xl:h-[48px] lg:w-[230px] lg:h-[48px] md:w-[200px] md:h-[40px] sm:w-[180px] sm:h-[38px] xs:w-[160px] xs:h-[35px] rounded-none hover:bg-transparent text-center font-medium mt-8">
          <Link href={'/shop'}>Show More</Link>
        </Button>
      </div>
    </>
  );
};

export default page;
