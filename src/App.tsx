import { RouterConfig } from "./config/RouterConfig"
import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Spinner } from "./components/Spinner"
import { Navbar } from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { useEffect } from "react"
import { ProductType, UserType } from "./types/Types"
import { setCurrentUser } from "./redux/appSlice"
import { setBasket } from "./redux/basketSlice"
export default function App() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: RootState) => state.app)

  useEffect(() => {
    const result = localStorage.getItem("currentUser")
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const result = localStorage.getItem("basket")
    if (result) {
      const basket: ProductType[] = JSON.parse(result) as ProductType[]
      dispatch(setBasket(basket))
    }
  }, [])
  return (
    <div>
      {currentUser && <Navbar />}
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: "13px" }} />
      <Spinner />
    </div>
  )
}
