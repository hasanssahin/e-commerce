import { RouterConfig } from "./config/RouterConfig"
import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Spinner } from "./components/Spinner"
import { Navbar } from "./components/Navbar"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
export default function App() {
  const { currentUser } = useSelector((state: RootState) => state.app)
  return (
    <div>
      {currentUser && <Navbar />}
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: "13px" }} />
      <Spinner />
    </div>
  )
}
