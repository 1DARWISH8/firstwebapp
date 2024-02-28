import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Register() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate = useNavigate()
    let {currentUser,loginStatus,errorMessage,isPending} = useSelector(state=>state.userLogin)
    let [file,setFile]=useState(null)
    let [error,setError]=useState('')
    const [userType,setUserType]=useState('user')

    let userTypeChange= (event) =>
    {
        setUserType(event.target.value)
    }


    function uploadPic(e)
    {
        // console.log(e)
        setFile(e.target.files[0])
    }

    async function formSubmit(data)
    {
        data = {userType,...data}
        // console.log(data)
        const formData = new FormData();
        // console.log(formData)
        formData.append('data', JSON.stringify(data))
        formData.append('pic',file)
        try
        {
            let res = await axios.post('http://localhost:5000/user-api/users',formData)
            // console.log(res)
            if (res.status===201)
            {
                navigate('/login')
            }
            else
            {
                setError(res.data.message)
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

return (
    <div>
        <form className='col-sm-6 mx-auto m-3 p-2' onSubmit={handleSubmit(formSubmit)}>
        {error&&<p className='text-danger text-center fs-3 fw-bold'>{error}</p>}
        <h5 className='text-center fw-bold pt-5'>{userType==='user'?'USER':'SELLER'} REGISTER</h5>
        <label className='form-label fw-bold'>SELECT USER TYPE:</label>
        <input type='radio' id='user' name='userType' value='user' checked={userType==='user'} onChange={userTypeChange}></input>
        <label htmlFor='user'>USER</label>
        <input type='radio' id='seller' name='userType' value='seller' checked={userType==='seller'} onChange={userTypeChange}></input>
        <label htmlFor='seller'>SELLER</label>
        <div className='sm-3 m-3'>
            {/* username */}
            <label htmlFor='username' className='form-label fw-bold' >USERNAME:</label>
            <input type='text' className='form-control border-black' id='username' {...register('username',{required:true})}></input>
            {errors.username?.type==='required'&&<p className='text-danger fw-bold text-center'>*USERNAME is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* password */}
            <label htmlFor='password' className='form-label fw-bold' >PASSWORD:</label>
            <input type='password' className='form-control border-black' id='password' {...register('password',{required:true})}></input>
            {errors.password?.type==='required'&&<p className='text-center text-danger fw-bold'>*PASSWORD is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* email */}
            <label htmlFor='email' className='form-label fw-bold' >EMAIL ADDRESS:</label>
            <input type='email' id='email' className='form-control border-black' {...register('email',{required:true})}></input>
            {errors.email?.type==='required'&&<p className='text-center text-danger fw-bold'>*EMAIL is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* image upload */}
            <label htmlFor='pic' className='form-label fw-bold'>PROFILE IMAGE</label>
            <input id='pic' type='file' name='pic' className='form-control border-black' onChange={uploadPic}/>
        </div>
        {
            userType === 'user' && 
            <div className='sm-3 m-3'>
                {/* address for user */}
                <label htmlFor='address' className='form-label fw-bold' >ADDRESS:</label>
                <input type='address' id='address' className='form-control border-black' {...register('address',{required:true})}></input>
                {errors.address?.type==='required'&&<p className='text-center text-danger fw-bold'>*ADDRESS is required*</p>}
            </div>
        }
        {
            userType === 'seller' &&
            <div className='sm-3 m-3'>
                <label htmlFor='company' className='form-label fw-bold border'>SELECT COMPANY:</label>
                <select id='company' className='form-control border-black' {...register('company',{required:true})}>
                    <option value="">--SELECT--</option>
                    <option value="company 1">COMPANY 1</option>
                    <option value="company 2">COMPANY 2</option>
                    <option value="company 3">COMPANY 3</option>
                    <option value="company 4">COMPANY 4</option>
                    <option value="company 5">COMPANY 5</option>
                </select>
                {errors.address?.type==='required'&&<p className='text-center text-danger fw-bold'>*ADDRESS is required*</p>}
            </div>
        }

        <div className='text-center p-2'>
            <button type='submit' className='btn btn-dark'>REGISTER</button>
        </div>
        </form>
    </div>
)
}

export default Register
