import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../types/Types"

export interface BasketSliceType {
  basket: ProductType[]
}

const initialState: BasketSliceType = {
  basket: [],
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProductToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
      if (state.basket.length === 0) {
        // Sepet boşsa, ürünü doğrudan ekle
        state.basket = [action.payload]
      } else {
        // Sepet boş değilse sepetteki ürünü bul
        const existingProduct = state.basket.find((product: ProductType) => product.id === action.payload.id)
        if (existingProduct) {
          // Sepette ürün varsa, adetini artır
          if (existingProduct.count && action.payload.count) {
            existingProduct.count += action.payload.count
          }
          // Sepeti güncellerken diğer ürünleri olduğu gibi bırak ancak güncellenen (id'si existingProduct.id ile aynı olan ürün) ürünü değiştir
          state.basket = state.basket.map((product: ProductType) => (product.id === existingProduct.id ? existingProduct : product))
        } else {
          // Ürün sepette yoksa, yeni bir ürün olarak ekle
          state.basket = [...state.basket, action.payload]
        }
      }
      localStorage.setItem("basket", JSON.stringify(state.basket))
    },
    setBasket: (state: BasketSliceType, action: PayloadAction<ProductType[]>) => {
      state.basket = [...action.payload]
    },
  },
})

export const { addProductToBasket, setBasket } = basketSlice.actions

export default basketSlice.reducer
