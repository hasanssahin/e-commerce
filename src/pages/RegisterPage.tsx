import React from "react"
import "../css/RegisterPage.css"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { MdAccountCircle } from "react-icons/md"
import { FaLock } from "react-icons/fa"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import { registerPageSchema } from "../schemas/RegisterPageSchema"
import registerPageService from "../services/RegisterPageService"
import { UserType } from "../types/Types"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        username: values.username,
        password: values.password,
      }
      const response = await registerPageService.register(payload)
      if (response) {
        toast.success("Kayıt Başarılı")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Kayıt Başarısız")
    }
  }

  const { values, handleSubmit, handleChange, resetForm, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: registerPageSchema,
    onSubmit: submit,
  })

  const clear = () => {
    resetForm()
  }
  return (
    <div className='register'>
      <div className='register-form'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='register-form-items'>
            <div className='register-form-inputs'>
              <TextField
                className='register-form-input'
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
                className='register-form-input'
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
            <div className='register-form-buttons'>
              <Button type='submit' sx={{ textTransform: "none" }} size='small' color='info' variant='contained'>
                Kaydol
              </Button>
              <Button onClick={clear} sx={{ textTransform: "none" }} size='small' color='warning' variant='outlined'>
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
