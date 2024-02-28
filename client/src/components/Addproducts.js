import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Addproducts() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate = useNavigate()
    let {currentUser,loginStatus,errorMessage,isPending} = useSelector(state=>state.userLogin)
    let [error,setError]=useState('')

    async function formSubmit(data)
    {
        try
        {
            let sellerusername=currentUser.username
            data = {sellerusername,...data}
            // console.log(data)
            let res = await axios.post('http://localhost:5000/user-api/addproduct',data)
            // console.log(res)
            if (res.status===201)
            {
                alert('Product has been added successfully')
                navigate('/profile/products')
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

        <div className='sm-3 m-3'>
            {/* productname */}
            <label htmlFor='productname' className='form-label fw-bold' >PRODUCT NAME:</label>
            <input type='text' className='form-control border-black' id='productname' {...register('productname',{required:true})}></input>
            {errors.productname?.type==='required'&&<p className='text-danger fw-bold text-center'>*PRODUCT NAME is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* productname */}
            <label htmlFor='productid' className='form-label fw-bold' >PRODUCT ID:</label>
            <input type='number' className='form-control border-black' id='productid' {...register('productid',{required:true})}></input>
            {errors.productid?.type==='required'&&<p className='text-danger fw-bold text-center'>*PRODUCTID is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* productimage */}
            <label htmlFor='productimage' className='form-label fw-bold' >IMAGE URL:</label>
            <input type='text' className='form-control border-black' id='productimage' {...register('productimage',{required:true})}></input>
            {errors.productimage?.type==='required'&&<p className='text-center text-danger fw-bold'>*PRODUCT IMAGE URL is required*</p>}
        </div>
    
        <div className='sm-3 m-3'>
            {/* description*/}
            <label htmlFor='productdescription' className='form-label fw-bold' >PRODUCT DESCRIPTION:</label>
            <input type='text' id='productdescription' className='form-control border-black' {...register('productdescription',{required:true})}></input>
            {errors.productdescription?.type==='required'&&<p className='text-center text-danger fw-bold'>*Product description is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* product price*/}
            <label htmlFor='productprice' className='form-label fw-bold' >PRODUCT PRICE:</label>
            <input type='number' id='productprice' className='form-control border-black' {...register('productprice',{required:true})}></input>
            {errors.productprice?.type==='required'&&<p className='text-center text-danger fw-bold'>*Product Price is required*</p>}
        </div>

        <div className='text-center p-2'>
            <button type='submit' className='btn btn-dark'>REGISTER</button>
        </div>
        </form>
    </div>
)
}

export default Addproducts
