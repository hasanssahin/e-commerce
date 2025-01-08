import "../css/RegisterPage.css"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { MdAccountCircle } from "react-icons/md"
import { FaLock } from "react-icons/fa"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import { authenticationPageSchema } from "../schemas/AuthenticationPageSchema"
import registerPageService from "../services/RegisterPageService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { UserType } from "../types/Types"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        username: values.username,
        password: values.password,
        balance: 1000,
      }
      const response = await registerPageService.register(payload)
      if (response) {
        toast.success("Register Successful")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Register Failed")
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
                Register
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
