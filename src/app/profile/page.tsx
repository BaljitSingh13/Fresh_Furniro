"use client"
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

const profile = () => {

  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  const auth =getAuth();
  const currentUser = async () => {
    setLoading(true);

    try {
      const data = query(collection(db, "users"), where("id", "==", auth.currentUser?.uid));
      const docSnap = await getDocs(data);
     
      docSnap?.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          if (doc.data()) {
            setUserEmail(doc.data().email)
            setUserName(doc.data().name)
          }
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error, "profile page error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    currentUser();
  }, []);

  return (
    <>
      <div className="  bg-hero-section xl:h-[650px] lg:h-[600px] md:h-[500px] sm:h-[475px] xs:h-[450px] flex justify-center items-center">
        <div className=" bg-skincolor flex justify-center rounded-xl  xl:h-[330px] xl:w-[400px] lg:h-[300px] lg:w-[380px] md:h-[280px] md:w-[350px] sm:h-[260px] sm:w-[300px]  xs:h-[250px] xs:w-[280px]">
          <div className="flex flex-col py-10 xl:gap-7 lg:gap-5 md:gap-3 sm:gap-4 xs:gap-2">
            <span className="font-bold leading-10 text-center xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl">
              User Profile
            </span>
             
              <div className="flex flex-col gap-2">
                <label
                  about="email"
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="email"
                  value={userName}
                  className="xl:text-base lg:text-base md:text-base sm:text-xs xs:text-xs border-2 xl:h-10 lg:h-9 md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem] py-[4px]"
                />
              </div>           
            
              <div className="flex flex-col gap-2">
                <label
                  about="email"
                  className=" xl:text-base lg:text-base md:text-base sm:text-sm xs:text-sm font-semibold leading-8 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={userEmail}
                  className="xl:text-base lg:text-base md:text-base sm:text-sm xs:text-xs border-2 xl:h-10 lg:h-9  md:h-8 sm:h-7 pl-4 rounded-[10px] xl:w-[20rem] lg:w-[18rem] md:w-[17rem] sm:w-[15rem] xs:w-[14rem] py-[4px]"
                />
              </div>   

          </div>
        </div>
      </div>
    </>
  )
}

export default profile
