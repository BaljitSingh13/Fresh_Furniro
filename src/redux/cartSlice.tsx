"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsInCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state = [], action) => {
      
      // console.log(action.payload, "state counter will return item and it's count");
      const counting = state.findIndex(
        (item) => item.items.productId === action.payload.items.productId
      );

      if (counting !==-1) {
      return state.map((item, index) => {
        if (index === counting) {

          return {
            ...item,
            counter: item.counter + action.payload.counter  // Update quantity
          };
        }
        return item;
      });
    } else {
      // If item does not exist in cart, add it
      return [
        ...state,
        action.payload
      ];
      }
    },
    
    remove(state, action) {
      return state.filter((item) => item.items.productId !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
