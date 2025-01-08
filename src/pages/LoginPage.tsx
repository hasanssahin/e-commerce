import React from "react"
import "../css/LoginPage.css"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { MdAccountCircle } from "react-icons/md"
import { FaLock } from "react-icons/fa"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import { authenticationPageSchema } from "../schemas/AuthenticationPageSchema"
import { toast } from "react-toastify"
import loginPageService from "../services/LoginPageService"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentUser, setLoading } from "../redux/appSlice"
import { LoginType, UserType } from "../types/Types"

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = async (values: any, actions: any) => {
    try {
      dispatch(setLoading(true))
      const payload: LoginType = {
        username: values.username,
        password: values.password,
      }
      const response: UserType = await loginPageService.login(payload)
      if (response) {
        toast.success("Login Successful")
        dispatch(setCurrentUser(response))
        localStorage.setItem("currentUser", JSON.stringify(response))
        navigate("/")
      } else {
        toast.error("Login Failed")
      }
    } catch (error) {
      toast.error("Login Failed")
    } finally {
      dispatch(setLoading(false))
    }
  }

  const { values, handleSubmit, handleChange, resetForm, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: authenticationPageSchema,
    onSubmit: submit,
  })

  const clear = () => {
    resetForm()
  }
  return (
    <div className='login'>
      <div className='login-form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-form-items'>
            <div className='login-form-inputs'>
              <TextField
                className='login-form-input'
                id='username'
                value={values.username}
                onChange={handleChange}
                placeholder='Username'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MdAccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
                variant='outlined'
                helperText={<span style={{ color: "red" }}>{errors.username}</span>}
              />
              <TextField
                className='login-form-input'
                id='password'
                value={values.password}
                onChange={handleChange}
                type='password'
                placeholder='Password'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FaLock />
                      </InputAdornment>
                    ),
                  },
                }}
                variant='outlined'
                helperText={<span style={{ color: "red" }}>{errors.password}</span>}
              />
            </div>
            <div className='login-form-buttons'>
              <Button type='submit' sx={{ textTransform: "none" }} size='small' color='info' variant='contained'>
                Login
              </Button>
              <Button onClick={clear} sx={{ textTransform: "none" }} size='small' color='warning' variant='outlined'>
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
