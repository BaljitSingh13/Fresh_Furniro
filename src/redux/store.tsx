import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { Product } from "@/models/types";

export interface RootState {
  
  cart: Product[]; 
}

const store=configureStore({
  reducer:{
    cart:cartSlice,
  }
})

export default store;