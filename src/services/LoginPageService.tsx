import { AxiosResponse } from "axios"
import axiosInstance from "../config/AxiosConfig"
import { LoginType, LoginResponseType } from "../types/Types"
import { toast } from "react-toastify"

class LoginPageService {
  async login(user: LoginType): Promise<LoginResponseType> {
    try {
      const response: AxiosResponse<any, any> = await axiosInstance.post("/authenticate", user)
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new LoginPageService()
