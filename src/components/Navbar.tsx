import React, { ChangeEvent } from "react"
import AppBar from "@mui/material/AppBar"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MagaraIcon from "../images/magara.png"
import { useNavigate } from "react-router-dom"
import { Badge, InputAdornment } from "@mui/material"
import { FaSearch } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { filterProducts, setCurrentUser, setProducts } from "../redux/appSlice"
import { toast } from "react-toastify"
import productService from "../services/ProductService"
import { ProductType } from "../types/Types"
import { FaShoppingBasket } from "react-icons/fa"
export const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem("currentUser")
    dispatch(setCurrentUser(null))
    navigate("/login")
    toast.success("Çıkış yapıldı")
  }

  const handleFilter = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    try {
      if (value) {
        dispatch(filterProducts(value))
      } else {
        const response: ProductType[] = await productService.getAllProducts()
        dispatch(setProducts(response))
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }
  return (
    <div>
      <AppBar position='static' sx={{ backgroundColor: "#685046" }}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={() => navigate("/")}>
            <img src={MagaraIcon} width={60} />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            Endless
          </Typography>
          <TextField
            onChange={handleFilter}
            sx={{ width: "250px", borderRadius: "5px" }}
            id='searchInput'
            placeholder='Bir şey ara...'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <FaSearch color='#deccc1' />
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: { color: "#deccc1", borderBottom: "1px solid #deccc1" },
              },
            }}
            variant='standard'
          />

          <Badge badgeContent={5} style={{ marginLeft: "20px", color: "#deccc1" }}>
            <FaShoppingBasket color='#deccc1' style={{ fontSize: "20px" }} />
          </Badge>

          <Button sx={{ textTransform: "none", marginLeft: "20px", color: "#deccc1" }} color='inherit' onClick={logout}>
            Çıkış yap
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
