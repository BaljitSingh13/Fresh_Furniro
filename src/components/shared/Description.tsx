import { db } from '@/app/firebase.config';
import { Product } from '@/models/types';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Description = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [single, setSingle] = useState<Product[]>();

  const id = useParams();
  const singleProduct = async () => {
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
      setSingle(array)
      setLoading(false);
    } catch (error) {
      console.log(error, "errors in single product page");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    singleProduct();
  }, []);

  return (
   
      <div>
        {single?.map((item,index)=>(
        <p key={index} className='lg:text-lg md:text-base sm:text-sm xs:text-xs text-justify'>{item.briefDescription}</p>
       ))}
      </div>
  )
}

export default Description
