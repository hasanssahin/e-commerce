import React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const Spinner = () => {
  const { loading } = useSelector((state: RootState) => state.app)
  return (
    <div>
      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}
