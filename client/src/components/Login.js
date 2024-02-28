import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { userLoginPromiseStatus } from '../redux/slices/userLoginSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Login() {

    let {register,handleSubmit,formState:{errors}}=useForm()
    let dispatch=useDispatch()
    let navigate = useNavigate()
    const {currentUser,loginStatus,errorMessage,isPending} = useSelector(state=>state.userLogin)
    let [userType,setUserType]=useState('user')

    let userTypeChange=(event)=>
    {
        setUserType(event.target.value)
    }

    const formSubmit=(data)=>
    {
        data={userType,...data}
        // dispatch(send) data to thunk middleware
        dispatch(userLoginPromiseStatus(data))
    }

    // navigate to profile component on successful login
    useEffect(()=>
    {
        if(loginStatus===true)
        {
            navigate('/profile')
        }
    },[loginStatus])

return (
    <div>
    <form className='col-sm-6 mx-auto m-3 p-3' onSubmit={handleSubmit(formSubmit)}>
        <h5 className='text-center p-4 '>{userType==='user'?'USER':'SELLER'} LOG IN</h5>
        {errorMessage.length!==0&&<p className='text-danger text-center fs-3'>{errorMessage.message}</p>}
        <label className='form-label fw-bold'>SELECT USER TYPE:</label>
        <input type='radio' id='user' name='userType' value='user' checked={userType==='user'} onChange={userTypeChange}></input>
        <label htmlFor='user'>USER</label>
        <input type='radio' id='seller' name='userType' value='seller' checked={userType==='seller'} onChange={userTypeChange}></input>
        <label htmlFor='seller'>SELLER</label>
    <div className='sm-3 m-3 pt-3'>
        <label className='form-label fw-bold' htmlFor='username'>USERNAME</label>
        <input className='form-control border-black' type='text' id='username' {...register('username',{required:true})}></input>
        {errors.username?.type==='required'&&<p className='text-center text-danger fw-bold'>USERNAME is REQUIRED</p>}
    </div>
    <div className='sm-3 m-3 pt-3'>
        <label className='form-label fw-bold' htmlFor='password'>PASSWORD</label>
        <input className='form-control border-black' type='password' id='password' {...register('password',{required:true})}></input>
        {errors.password?.type==='required'&&<p className='text-center text-danger fw-bold'>PASSWORD is REQUIRED</p>}
    </div>
    <div className='text-center'>
        <button type='submit' className='btn btn-success border-black fw-bold'>SIGN IN</button>
    </div>
    </form>
    </div>
)
}

export default Login
