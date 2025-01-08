import { RouterConfig } from "./config/RouterConfig"
import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Spinner } from "./components/Spinner"
export default function App() {
  return (
    <div>
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: "13px" }} />
      <Spinner />
    </div>
  )
}
