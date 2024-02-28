import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function Cart() {

  let {currentUser}=useSelector(state=>state.userLogin)
  let [cartdata,setCartdata] = useState([])
  // let [carttotal,setCarttotal] = useState(0)
  let sum = 0

  // console.log(currentUser)
  const cartdisplay = async()=>
  {
    let products = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
    // console.log(products.data)
    setCartdata(products.data)
  }

  useEffect(()=>
  {
    cartdisplay()
  },[])

  async function deleteproduct(item)
  {
    let deleted = await axios.post(`http://localhost:5000/user-api/deletecartproduct`,item)
    console.log(deleted)
    if (deleted)
    {
      cartdisplay()
    }
  }

  {sum = cartdata.forEach((item)=>(sum+=item.productprice))}
  console.log(sum)

  return (
    <div>
      <h1 className='text-center'>CART</h1>
      {}
      <table>
      {cartdata.map((item,index)=>
      (
        <tr key={index}>
          <td>
            <img src={item.productimage}></img>
            <p>{item.productname}</p>
          </td>
          <td>
            <div>Rs.{item.productprice}</div>
          </td>
          {/* <td>
            {sum += item.productprice}
          </td> */}
          <td>
            <button className='btn btn-danger' onClick={()=>{deleteproduct(item)}} >DELETE</button>
          </td>
        </tr>
      ))}
      <tr>
        <td>TOTAL AMOUNT: {sum}</td>
        <button>CHECK OUT</button>
      </tr>
      </table>
    </div>
  )
}

export default Cart
