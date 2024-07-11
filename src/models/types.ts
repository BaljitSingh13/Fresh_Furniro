export enum TABS {
  DESCRIPTION = "Description",
  ADDITIONAL_INFO = "Additional_information",
  REVIEWS = "Reviews",
}

export type Product = {
  adjustableHeadrest:string;
  briefDescription:string;

  category: string;
  categoryName:string;
  configuration:string;
  coveredInWarranty:string;
  color:string[];

  depth:string;
  description:string;
  discount: number;
  domesticWarranty:string;

  favorite: boolean;
  fillingMaterial:string;
  finishType:string;

  height:string;
  imgUrls: string[];
  legHeight:string;

  maximumLoadCapacity:string;
  modelNumber:string;
  mrp: number;

  notCoveredInWarranty:string;
  originOfManufacture:string;
  productName: string;
  productReviews:object[];
  productId:string,
  id:string;

  reviews:number;

  salesPackage:string;
  seatHeight:string;
  secondaryMaterial:string;

  size:string[];
  stars:number;
  tags:string;
  title: string;

  upholsteryColor:string;
  upholsteryMaterial:string;

  warrantyServiceType:string;
  warrantySummary:string;
  weight:string;
  width:string;

};

export type Crumbs={
  title:string;
  link:string;
};

export type EnteredUser={
  name:string;
  email:string;
};
