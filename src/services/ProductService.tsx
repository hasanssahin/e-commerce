import axios, { AxiosResponse } from "axios"
import { ProductType } from "../types/Types"
class ProductService {
  BASE_URL = "https://fakestoreapi.com"
  async getAllProducts(): Promise<ProductType[]> {
    try {
      const response: AxiosResponse<any, any> = await axios.get(`${this.BASE_URL}/products`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getProductById(productId: number): Promise<ProductType> {
    try {
      const response: AxiosResponse<any, any> = await axios.get(`${this.BASE_URL}/products/${productId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new ProductService()
