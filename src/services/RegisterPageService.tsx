import { AxiosResponse } from "axios"
import axiosInstance from "../config/AxiosConfig"
import { UserType } from "../types/Types"

class RegisterPageService {
  async register(newUser: UserType): Promise<UserType> {
    try {
      const response: AxiosResponse<any, any> = await axiosInstance.post("/register", newUser)
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new RegisterPageService()
