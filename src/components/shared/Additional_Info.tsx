import { db } from "@/app/firebase.config";
import { Product } from "@/models/types";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Additional_Info = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<Product[]>();

  const id = useParams();
  
  const moreInfo = async () => {
    const array: any = [];
    setLoading(true);

    try {
      const particular = doc(db, "products", id?.productId as string);
      const docSnap = await getDoc(particular);

      if (docSnap.exists()) {
        array.push({ ...docSnap.data(), id: id?.productId });
      } else {
        console.log("No such document!");
      }
      setAdditionalInfo(array);
      setLoading(false);
    } catch (error) {
      console.log(error, "errors in single product page");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    moreInfo();
  }, []);

  return (
    <>
      {additionalInfo?.map((item) => (
        <table className="text-black ">
          <tbody className="border-2-black ">
            <tr>
              <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[20px] sm:leading-[28px] sm:py-4 xs:text-[18px] xs:leading-[26px] xs:py-3">
                General
              </td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2 w-[50%]">Sales Package</td>
              <td className="py-2 pr-2 w-[50%] md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.salesPackage}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Model Number</td>
              <td className=" md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.modelNumber}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto">
              <td className="py-2 pl-2">Secondary Material</td>
              <td className=" md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.secondaryMaterial}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Configuration</td>
              <td className=" md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.configuration}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto">
              <td className="py-2 pl-2">Upholstery Material</td>
              <td className=" md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.upholsteryMaterial}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Upholstery Color</td>
              <td className=" md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.upholsteryColor}</td>
            </tr>

            <tr>
              <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[22px] sm:leading-[28px] sm:py-4 xs:text-[20px] xs:leading-[26px] xs:py-3">
                Product
              </td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2">Filling Material</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.fillingMaterial}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Finish Type</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.finishType}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2">Adjustable Headrest</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.adjustableHeadrest}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto ">
              <td className="py-2 pl-2">Maximum Load Capacity</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.maximumLoadCapacity}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2">Origin of Manufacture</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.originOfManufacture}</td>
            </tr>

            <tr>
              <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[22px] sm:leading-[28px] sm:py-4 xs:text-[20px] xs:leading-[26px] xs:py-3">
                Dimensions
              </td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  bg-skincolor w-auto ">
              <td className="py-2 pl-2 ">Width</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.width}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Height</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.height}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2">Depth</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.depth}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Weight</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.weight}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto ">
              <td className="py-2 pl-2">Seat Height</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.seatHeight}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="py-2 pl-2">Leg Height</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.legHeight}</td>
            </tr>

            <tr>
              <td className="font-bold lg:text-[28px] lg:leading-[35px] lg:py-5 md:text-[24px] md:leading-[30px] md:py-4 sm:text-[22px] sm:leading-[28px] sm:py-4 xs:text-[20px] xs:leading-[26px] xs:py-3">
                Warranty
              </td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  bg-skincolor  w-auto">
              <td className=" pl-2">Warranty Summary</td>
              <td className=" py-2 pr-2 md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.warrantySummary}</td>
            </tr>

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="pl-2">Warranty Service Type</td>
              <td className="py-2 pr-2 md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.warrantyServiceType}</td>
            </tr>

            {/* <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] bg-skincolor w-auto overflow-auto ">
              <td className="py-2">Covered in Warranty</td>
              <td className="md:pl-0 sm:pl-[50px] xs:pl-[20px]">{item.coveredInWarranty}</td>
            </tr> */}

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px]  bg-skincolor w-auto ">
              <td className=" pl-2">Not Cover in Warranty</td>
              <td className="py-2 pr-2 md:pl-0 sm:pl-[50px] xs:pl-[20px] text-justify">{item.notCoveredInWarranty}</td>
            </tr> 

            <tr className="lg:text-[17px] md:text-base sm:text-sm xs:text-[13px] w-auto">
              <td className="pl-2">Domestic Warranty</td>
              <td className="py-2 pr-2 md:pl-0 sm:pl-[50px] xs:pl-[20px] text-justify">{item.domesticWarranty}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default Additional_Info;
