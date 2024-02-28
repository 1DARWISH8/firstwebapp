import React,{useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { clearState } from '../redux/slices/userLoginSlice'


function Header() {
let {currentUser,loginStatus}=useSelector(state=>state.userLogin)

let dispatch=useDispatch()
let navigate = useNavigate()

function logout()
{
    dispatch(clearState())
    sessionStorage.removeItem('token');
    navigate('/')
}

return (
    <div>
        <nav className='navbar justify-content-center bg-light'>
        <ul className='nav'>
            <li className='nav-item'>
                <NavLink className='nav-link' to=''>HOME</NavLink>
            </li>
            {loginStatus===false?
            <>
                <li className='nav-item'>
                    <NavLink className='nav-link' to='/register'>REGISTER</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' to='/login'>LOGIN</NavLink>
                </li>
            </>
            :
            <>
                <li>
                    <NavLink className='nav-link' to='/profile'>PROFILE</NavLink>
                </li>
                <li>
                    <button className='btn btn-danger' onClick={logout}>LOG OUT</button>
                </li>
            </>}
        </ul>
        </nav>
    </div>
)
}

export default Header
