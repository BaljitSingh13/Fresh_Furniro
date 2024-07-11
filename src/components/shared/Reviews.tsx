import { db } from '@/app/firebase.config';
import { Product } from '@/models/types';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Reviews = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [review, setReview] = useState<Product[]>();

  const id = useParams();
  const productReview = async () => {
    const array: any = [];
    setLoading(true);

    try {
      const particular = doc(db, "products", id?.productId as string);
      const docSnap = await getDoc(particular);

      if (docSnap.exists()) {
        array.push({...docSnap.data(),id:id?.productId})
      } else {
        console.log("No such document!");
      }
      setReview(array)
      setLoading(false);

    } catch (error) {
      console.log(error, "errors in single product page");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    productReview();
  }, []);

  return (
    <>
    {review?.map((item)=>(
    <div className='px-4 '>
      {item.productReviews?.map((newReview:any,index:number)=>(
        <div key={index} className='text-black py-2 border-y-[1px]'>
          <h2 className='md:text-base xs:text-sm font-semibold pb-1'>{newReview.reviewTitle}</h2>
          <span className='lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]'>{newReview.reviewDescription}</span>
          {/* <span>by {newReview.userId}</span> */}
        </div>
      ))}
    </div>
    ))}
    </>
  )
}

export default Reviews
