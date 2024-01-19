import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice'

function Cart() {
  const [total, setTotal]=useState(0)

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);


 const getTotal=()=>{
  const totalPrice=cartArray.map((item)=>item.price).reduce((n1,n2)=>n1+n2,0);
  setTotal(totalPrice)
 }

  useEffect(()=>{
    getTotal()
  },[cartArray])

  
  const checkout=()=>{
    dispatch(emptyCart())
    alert('Thank you! Your order placed Successfully..')
    navigate("/")
  }

  const navigate=useNavigate()
  
  const dispatch=useDispatch()

  return (
    <>
      <div style={{marginTop:'100px'}}>
        <div className='row w-100'>
          {cartArray?.length>0?
            <div className='d-flex'>
              <div className='col-lg-6 m-5'>
                <table className='table shadow border'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {cartArray?.map((item,index)=>(<tr>
                  <td>{index+1}</td>
                  <td>{item.title}</td>
                  <td><img style={{width:'100px',height:'100px'}} src={item.thumbnail} alt="no image" /></td>
                  <td>₹ {item.price}</td>
                  <td><Button onClick={()=>dispatch(removeFromCart(item.id))} variant="outline-danger"><i class="fa-solid fa-trash"></i></Button></td>
                  </tr>))
                  }
                    
                  </tbody>
                </table>
              </div>
              <div className='col-lg-6 m-5'>
                <h2>Order Summery</h2>
                  <table className='table shadow border'>
                    <thead>
                      <tr>
                        <th>Total number of Items</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{cartArray.length}</td>
                        <td>₹ {total} </td>
                      </tr>
                    </tbody>

                  </table>
                  <Button onClick={checkout} className='btn btn-success'>Checkout</Button>
              </div>
            </div>
            :
            <div style={{height:'60vh'}} className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" height={'300px'} alt="no image" />
            <h3 className='text-danger fw-bolder' style={{overflowY:'hidden'}}>Your cart is empty</h3>
            <Button  className='btn btn-success mt-2'><Link style={{textDecoration:'none',color:'white'}} to={'/'}><i class="fa-solid fa-arrow-left"></i> Back to Home</Link></Button>
  
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Cart