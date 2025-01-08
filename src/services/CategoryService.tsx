import axios, { AxiosResponse } from "axios"
import { ProductType } from "../types/Types"
class CategoryService {
  BASE_URL = "https://fakestoreapi.com"
  async getCategories(): Promise<string[]> {
    try {
      const response: AxiosResponse<any, any> = await axios.get(`${this.BASE_URL}/products/categories`)
      return response.data
    } catch (error) {
      throw error
    }
  }
  async getProductsByCategory(category: string): Promise<ProductType[]> {
    try {
      const response: AxiosResponse<any, any> = await axios.get(`${this.BASE_URL}/products/category/${category}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new CategoryService()
