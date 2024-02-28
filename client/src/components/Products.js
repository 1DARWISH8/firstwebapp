import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Products() {
    let navigate = useNavigate()
    let [products,setProducts]=useState([])
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)

    let productdata = async()=>
    {
        let productsdata = await axios.get(`http://localhost:5000/user-api/products`)
        // console.log(productsdata)
        setProducts(productsdata.data.payload)
    } 

    useEffect(()=>
    {
        productdata()
    },[])

    async function addtocart(item)
    {
        // let productquantity = 1;
        let username=currentUser.username;
        item = {...item,username}
        let added = await axios.post('http://localhost:5000/user-api/addtocart',item)
        console.log(added)
    }

    async function deleteproduct(item)
    {
        // console.log(item)
        let deleted = await axios.delete(`http://localhost:5000/user-api/deleteproduct/${item.productid}`)
        // console.log(deleted)
        if (deleted)
        {
            alert("PRODUCT HAS BEEN DELETED")
            productdata()
        }
    }

    async function editproduct(item)
    {
        navigate('/profile/editproducts')
    }

return (
    <div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {products.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.productimage} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.productprice}</p>
                            {currentUser.userType==='user'?
                            <>
                            <button className='btn btn-success' onClick={()=>{addtocart(item)}}>
                                Add to cart
                            </button>    
                            </>:
                            <>
                            <button className='btn btn-danger' onClick={()=>{deleteproduct(item)}}>
                                DELETE
                            </button>    
                            <button className='btn btn-success' onClick={()=>{editproduct(item)}}>
                                EDIT
                            </button>
                            </>}
                        </div>
                    </div>
                </div>
            ))}
            </div>
    </div>
)
}

export default Products
