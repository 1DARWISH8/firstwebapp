import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {NavLink, Outlet} from 'react-router-dom'

function Profile() {

    let {currentUser}=useSelector(state=>state.userLogin)


    // const getprotectedroute=async()=>
    // {
    //     // get token from local/session storage
    //     const token = sessionStorage.getItem('token')
    //     // add token to the header req object

    //     let axioswithtoken = axios.create(
    //         {
    //             baseURL:'http://localhost:5000',
    //             headers:{
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     )

    //     // make a request
    //     let res = await axioswithtoken.get('http://localhost:5000/user-api/protected')
    //     console.log(res)
    // }

return (
    <div className='text-center'>
        <h1>PROFILE</h1>
        <p>WELCOME,
            <h3>{currentUser.username}</h3>
            Your EMAIL is {currentUser.email}
        </p>
        <nav className='justify-content-center'>
        <ul className='nav'>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/profile/products'>PRODUCTS</NavLink>
            </li>
            <li>
                {currentUser.userType==='user'?
                    <NavLink className='nav-link' to='/profile/cart'>CART</NavLink>
                :
                    <NavLink className='nav-link' to='/profile/addproducts'>ADD PRODUCTS</NavLink>
                }
            </li>
        </ul>  
        </nav>
        {/* <button className='btn btn-success' onClick={getprotectedroute}>GET PROTECTED DATA</button> */}
        <Outlet/>
    </div>
)
}

export default Profile
