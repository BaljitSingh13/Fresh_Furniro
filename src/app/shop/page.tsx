'use client';
import Banner from '@/components/shared/Banner';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React, { useEffect, useState } from 'react';
import Shared_Section from '@/components/shared/Shared_Section';
import Product_Card from '@/components/shared/Product_Card';
import {
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../firebase.config';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Product } from '@/models/types';
const Shop = () => {
  const [loading, setLoading] = useState<boolean>();

  const pageTitle = 'Shop';
  const crumbs = { title: 'Shop', link: '/shop' };

  const [filter, setFilter] = useState(false); // to show the box when click on filter category
  const [filterProduct ,setFilterProduct] = useState<Product[]>()
  const [productCategory, setProductCategory] = useState([]);
  const [getProducts, setGetProducts] = useState<Product[]>(); // to get all products

  const [firstIndex,setFirstIndex]=useState(0);
  const [lastIndex,setLastIndex]=useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  
  const recordsPerPage: number = 4;
  const npage: number = Math.ceil(5/ recordsPerPage); // here we have total 5 products
  // const offSet: number = (currentPage - 1) * records;
  const numbers = [...Array(npage + 1)].slice(1); // 1)keys()].slice(1)

  const filterResult = () => {
    setFilter(open != open);

    if (filter) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  const close =()=>{
    if(filter){
      setFilter(false)
    }
  }

  
  const uniqueProduct = async () => {
    const arrays: any = [];
    setLoading(true);
    
    try {
      const particular = query(collection(db, 'products'),where('category', 'in', productCategory));
        const querySnapshot = await getDocs(particular);
        
        querySnapshot?.forEach(
          (spec: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            if (spec.data()) {
              arrays.push({ ...spec.data(), id: spec.id });
              console.log(spec.data(), 'specific data');
            }
          }
      );
      setFilterProduct(arrays);
      // setGetProducts(arrays)
      console.log(arrays, 'final data');
      setLoading(false);
    } catch (error) {
      console.log(error, 'errors');
    } finally {
      setLoading(false);
    }
  };
  
  // Display all products when none of the checkbox is selected
  useEffect(() => {
    uniqueProduct();
    if (productCategory.length === 0) {
      getProduct();
    }
  }, [productCategory]);
  
  // Display the data based on the category selected
  const selectCategory = (event: MouseEvent) => {
    const isChecked = event.target.checked;
    event.preventDefault();
    
    if (isChecked) {
      // if checbox is checked then show the item corresponding to that id
      setProductCategory([...productCategory, event.target.value]);
    } else {
      // if checkbox is unchecked then remove those items
      setProductCategory(
        productCategory.filter((category) => category !== event.target.value)
        );
      }
  };
  
  type pricing = {
    priceLessThan?: number;
    priceGreaterThan?: number;
  };
  
  // ***filter according to the price
  const selectPrice = ({priceLessThan = 100000,priceGreaterThan = 10000}: pricing) => {
    
    // let filterData=[];
    const data = getProducts?.filter((item)=>item.mrp > priceGreaterThan && item.mrp <= priceLessThan)
    console.log(data , "filter data");
    setFilterProduct(data)

    // if (priceLessThan <= 5000 && priceGreaterThan >= 0) {
    //   const filterData = getProducts? getProducts?.filter((product) =>(product.mrp || product.discount) <= priceLessThan && (product.mrp || product.discount) >= priceGreaterThan): [];
      
    //   setGetProducts(filterData);
    //   console.log('priceLess than',priceLessThan,' greater than',priceGreaterThan);
    //   console.log(filterData, 'filter data 1');
    // } 
    // if (priceLessThan <= 10000 && priceGreaterThan >= 5000) {
    //   const filterData = getProducts? getProducts?.filter((product) =>(product.mrp || product.discount) <= priceLessThan &&(product.mrp || product.discount) >= priceGreaterThan): [];
      
    //   setGetProducts(filterData);
    //   console.log('priceLess than',priceLessThan,' greater than',priceGreaterThan);
    //   console.log(filterData, 'filter data 2');
    // }
    // if((priceLessThan <= 100000 && priceGreaterThan >= 10000)) {
    //   const filterData = getProducts? getProducts?.filter((product) =>(product.mrp || product.discount) <= priceLessThan &&(product.mrp || product.discount) >= priceGreaterThan): [];
    //   setGetProducts(filterData);
    //   console.log('priceLess than', priceLessThan, ' greater than', priceGreaterThan);
    //   console.log(filterData, 'filter data 3');
    // }
    
    // setGetProducts(filterData);
  };

  const sortData=(event)=>{
    console.log(event," sort the data");

    if(event === "lowhigh" && getProducts){

      const sortedAscending = [...getProducts].sort((a, b) => {
        if ((a.mrp < b.mrp) || (a.discount <b.discount)) return -1;
        if ((a.mrp > b.mrp) || (a.discount > b.discount)) return 1;
        return 0;
      });
      console.log(sortedAscending,"ascending order");
      setGetProducts(sortedAscending);
   
    }

    if(event === "lowhigh" && filterProduct){

      const sortedAscending = [...filterProduct].sort((a, b) => {
        if ((a.mrp < b.mrp) || (a.discount <b.discount)) return -1;
        if ((a.mrp > b.mrp) || (a.discount > b.discount)) return 1;
        return 0;
      });
      console.log(sortedAscending,"ascending order");
      setFilterProduct(sortedAscending);
    }

    // Decending order
    if(event ==="highlow" && getProducts){ 
      const sortedDescending = [...getProducts].sort((a, b) => {
        if ((a.mrp < b.mrp) || (a.discount < b.discount) ) return 1;
        if ((a.mrp > b.mrp) || (a.discount > b.discount) ) return -1;
        return 0;
      });
      
      console.log(sortedDescending,"descending order");
      setGetProducts(sortedDescending);
    }

    if(event ==="highlow" && filterProduct){ 
      const sortedDescending = [...filterProduct].sort((a, b) => {
        if ((a.mrp < b.mrp) || (a.discount < b.discount) ) return 1;
        if ((a.mrp > b.mrp) || (a.discount > b.discount) ) return -1;
        return 0;
      });
      
      console.log(sortedDescending,"descending order");
      setFilterProduct(sortedDescending);
    }
  }

  //  *** to display all products
  const getProduct = async () => {
    const arr: any = []; // i have take an empty array to push the data i got from firebase
    setLoading(true);
    try {
      const data = query(collection(db, 'products')); // it will console the data of all products no matter they are present on that page or not
      const querySnap = await getDocs(data);

      querySnap?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          if (doc.data()) {
            // if we have data
            arr.push({ ...doc.data(), id: doc.id }); // spread operator nl asi doc.data jehda k right side te peya aa ohde nl nl id v get krli
          }
        }
      );

      setGetProducts(arr); // setGetProducts state vich data store kita jehde products main get kitte
      setFilterProduct(arr);
      setLoading(false);
    } catch (error) {
      console.log(error, 'Error is');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const decrement =()=>{
    if(firstIndex!=0 && lastIndex !=4){
      setFirstIndex(firstIndex-4)
      setLastIndex(firstIndex)
    }
  }

  const increment =()=>{
      setFirstIndex(firstIndex+lastIndex)
      setLastIndex(lastIndex+4)
  }

  const changePage = (item,index) => {

    if(index>currentPage){
      increment()
    }
    else{
      decrement()
    }
    setCurrentPage(index)
  };

  return (
    <div>
      {loading ? (
        'Loading'
      ) : (
        <>
        <div onClick={close}>
          <Shared_Section pageTitle={pageTitle} crumbs={crumbs} />
          <div className="xl:mb-10 lg:mb-9 md:mb-8 sm:mb-5 xs:mb-4 bg-skincolor flex justify-between lg:pt-[22px] lg:pr-[100px] lg:pb-[23px] lg:pl-[98px] lg:h-[100px] md:pt-[20px] md:px-[70px] md:pb-[23px] md:h-[90px] sm:py-[20px] sm:px-[25px] sm:h-[80px]  xs:py-[10px] xs:px-[30px] xs:h-[60px] ">
            {/* left part */}
            <div className="flex items-center cursor-pointer">
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={filterResult}
                className='md:w-[21px] md:h-[18px] sm:w-[18px] sm:h-[16px] xs:h-[14px] xs:w-[14px]'
              >
                <path
                  d="M20.0238 3.14285H6.92857M4.54762 3.14285H0.976191M20.0238 15.0476H6.92857M4.54762 15.0476H0.976191M14.0714 9.09524H0.976191M20.0238 9.09524H16.4524M5.7381 0.761902C6.05383 0.761902 6.35663 0.887327 6.57989 1.11058C6.80315 1.33384 6.92857 1.63664 6.92857 1.95238V4.33333C6.92857 4.64906 6.80315 4.95187 6.57989 5.17512C6.35663 5.39838 6.05383 5.52381 5.7381 5.52381C5.42236 5.52381 5.11956 5.39838 4.8963 5.17512C4.67304 4.95187 4.54762 4.64906 4.54762 4.33333V1.95238C4.54762 1.63664 4.67304 1.33384 4.8963 1.11058C5.11956 0.887327 5.42236 0.761902 5.7381 0.761902V0.761902ZM5.7381 12.6667C6.05383 12.6667 6.35663 12.7921 6.57989 13.0153C6.80315 13.2386 6.92857 13.5414 6.92857 13.8571V16.2381C6.92857 16.5538 6.80315 16.8566 6.57989 17.0799C6.35663 17.3031 6.05383 17.4286 5.7381 17.4286C5.42236 17.4286 5.11956 17.3031 4.8963 17.0799C4.67304 16.8566 4.54762 16.5538 4.54762 16.2381V13.8571C4.54762 13.5414 4.67304 13.2386 4.8963 13.0153C5.11956 12.7921 5.42236 12.6667 5.7381 12.6667ZM15.2619 6.71428C15.5776 6.71428 15.8804 6.83971 16.1037 7.06297C16.327 7.28622 16.4524 7.58903 16.4524 7.90476V10.2857C16.4524 10.6014 16.327 10.9042 16.1037 11.1275C15.8804 11.3508 15.5776 11.4762 15.2619 11.4762C14.9462 11.4762 14.6434 11.3508 14.4201 11.1275C14.1969 10.9042 14.0714 10.6014 14.0714 10.2857V7.90476C14.0714 7.58903 14.1969 7.28622 14.4201 7.06297C14.6434 6.83971 14.9462 6.71428 15.2619 6.71428V6.71428Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div className="flex items-center justify-center md:pl-4 sm:pl-3 xs:pl-2">
                <button
                  id="dropdownDefault"
                  className=" lg:leading-[30px] md:text-xl md:leading-[25px] sm:text-lg sm:leading-[22px] xs:text-base xs:leading-[20px]"
                  type="button"
                  onClick={filterResult}
                  data-dropdown-toggle="dropdown"
                >
                  Filter
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdown"
                  className={`${
                    filter
                      ? 'z-10 visible w-56 p-3 bg-white rounded-lg '
                      : 'hidden '
                  }`}
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="dinning"
                        value="Lj32H1DtswCQZDuQXtIW"
                        className="w-4 h-4"
                        name="dinning"
                        onChange={selectCategory}
                        checked={productCategory.includes(
                          'Lj32H1DtswCQZDuQXtIW'
                        )}
                      />

                      <label
                        htmlFor="dinning"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {' '}
                        Dinning{' '}
                      </label>
                    </li>

                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="living"
                        value="lCIjWRUoe66wdrvv5oXO"
                        className="w-4 h-4 "
                        name="living"
                        onChange={selectCategory}
                        checked={productCategory.includes(
                          'lCIjWRUoe66wdrvv5oXO'
                        )}
                      />

                      <label
                        htmlFor="living"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Living
                      </label>
                    </li>

                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="bedroom"
                        value="xxJkD4KRpDejUd8r6kK0"
                        className="w-4 h-4"
                        name="bedroom"
                        onChange={selectCategory}
                        checked={productCategory.includes(
                          'xxJkD4KRpDejUd8r6kK0'
                        )}
                      />

                      <label
                        htmlFor="bedroom"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Bedroom
                      </label>
                    </li>
                  </ul>

                  {/* Price */}

                  <h6 className="my-3 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                    typeof="radio"
                  >
                    <li className="flex items-center">
                      <input
                        id="minimum"
                        type="radio"
                        name="radiobtn"
                        className="w-4 h-4"
                        onClick={() =>
                          selectPrice({
                            priceLessThan: 5000,
                            priceGreaterThan: 0,
                          })
                        }
                      />

                      <label
                        htmlFor="minimum"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {' '}
                        Min to 5k{' '}
                      </label>
                    </li>

                    <li className="flex items-center">
                      <input
                        id="medium"
                        type="radio"
                        name="radiobtn"
                        className="w-4 h-4"
                        onClick={() =>
                          selectPrice({
                            priceLessThan: 10000,
                            priceGreaterThan: 5000,
                          })
                        }
                      />

                      <label
                        htmlFor="medium"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        5k to 10k
                      </label>
                    </li>

                    <li className="flex items-center">
                      <input
                        id="premium"
                        type="radio"
                        name="radiobtn"
                        className="w-4 h-4"
                        onClick={() =>
                          selectPrice({
                            priceLessThan: 100000,
                            priceGreaterThan: 10000,
                          })
                        }
                      />

                      <label
                        htmlFor="premium"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        10k +
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex lg:gap-[17px] md:gap-[15px] sm:gap-[12px] xs:gap-[8px] items-center font-medium lg:leading-[30px]  md:text-xl md:leading-[25px] sm:text-lg sm:leading-[22px] xs:text-lg xs:leading-[20px]">
              <span className='lg:leading-[30px] md:text-xl md:leading-[25px] sm:text-lg sm:leading-[22px] xs:text-base xs:leading-[20px]'>Sort by</span>
              <Select onValueChange={sortData}>
                <SelectTrigger className="lg:h-[55px] lg:w-[188px] md:h-[45px] md:w-[150px] sm:h-[35px] sm:w-[110px] xs:h-[20px] xs:w-[65px] xl:pl-5 lg:pl-4 md:pl-3 sm:pl-2 xs:pl-1 text-light bg-white md:text-lg sm:text-base xs:text-[10px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="lowhigh">Low to High</SelectItem>
                  <SelectItem value="highlow">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <Product_Card passProducts={getProducts} /> */}
          <Product_Card passProducts={filterProduct?.length ? filterProduct : getProducts} firstIndex={firstIndex} lastIndex={lastIndex} />

          <nav aria-label="Page navigation example">
            <ul className="flex text-sm justify-center  lg:gap-7 md:gap-5 sm:gap-4 xs:gap-3 py-10">
              <li>
                <a
                  onClick={decrement}
                  href="#"
                  className={`${currentPage > 1 ? ' visible flex items-center justify-center font-medium px-3 lg:h-[45px] sm:h-[40px] xs:h-[35px] text-black bg-skincolor border-none rounded-[10px] active:bg-dark active:text-white':"hidden"}`}
                >
                  Previous
                </a>
              </li>

              {numbers.map(
                (item, index) =>
                  index <= 2 && (
                    <li key={index}>
                      <a
                        href="#"
                        // value={index+1}
                        onClick={() => changePage(item,index+1)}
                        className="flex items-center justify-center font-medium px-3 lg:h-[45px] lg:w-[45px] sm:h-[40px] sm:w-[40px] xs:h-[35px] xs:w-[35px] text-black bg-skincolor border-none rounded-[10px] focus:bg-dark focus:text-white"
                        // className={`${currentPage == 1 ? "flex items-center justify-center font-medium px-3 lg:h-[45px] lg:w-[45px] sm:h-[40px] sm:w-[40px] xs:h-[35px] xs:w-[35px] border-none rounded-[10px] bg-dark text-white" : "flex items-center justify-center font-medium px-3 lg:h-[45px] lg:w-[45px] sm:h-[40px] sm:w-[40px] xs:h-[35px] xs:w-[35px] text-black bg-skincolor border-none rounded-[10px] focus:bg-dark focus:text-white"}`}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
              )}

              <li>
                <a
                  onClick={increment}
                  href="#"
                  className={`${currentPage < 2  ? 'visible flex items-center justify-center font-medium px-3 lg:h-[45px] sm:h-[40px] xs:h-[35px] text-black bg-skincolor border-none rounded-[10px] active:bg-dark active:text-white' :"hidden"}` }
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>

          <Banner />
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
