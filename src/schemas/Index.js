import * as Yup from 'yup'



export const loginSchema = Yup.object( {
    email : Yup.string().email().required('Please enter your Email'),
    password : Yup.string().min(6).required('Please enter your Password')
})

export const signUpSchema = Yup.object( {
    email : Yup.string().email().required('Please enter your Email'),
    password : Yup.string().min(6).required('Please enter your Password'),
    confirm_password : Yup.string().required().oneOf([Yup.ref('password'),null],'Password must match')
})