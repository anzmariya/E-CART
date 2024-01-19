import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';


function WishList() {
  const dispatch= useDispatch()

  const handlewishlist=(item)=>{
    dispatch(addToCart(item))
    dispatch(removeFromWishlist(item.id))
  }

  const wishlistArray = useSelector((state)=>state.wishlistReducer)
  console.log(wishlistArray);
  return (
    <div style={{marginTop:'150px'}}>
      <Row className='ms-5 me-3'>
        { wishlistArray?.length>0?
        wishlistArray?.map((item)=>(
          <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card style={{ width: '18rem',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <Card.Img variant="top" style={{height:'200px'}} src={item.thumbnail} />
          <Card.Body>
            <Card.Title style={{overflowY:'hidden'}}>{item.title.slice(0,20)}...</Card.Title>
            <Card.Text>
              <p>{item.description.slice(0,50)}...</p>
              <p className='fw-bolder'>Price : ₹ {item.price}</p>
            </Card.Text>
            <div className='d-flex align-items-center justify-content-between'>
              <Button onClick={()=>dispatch(removeFromWishlist(item.id))} variant="outline-danger"><i class="fa-solid fa-trash"></i></Button>
              <Button onClick={()=>handlewishlist(item)} variant="outline-success"><i class="fa-solid fa-cart-plus"></i></Button>
            </div>
          </Card.Body>
          </Card>
        </Col>
        ))
        :<div style={{height:'60vh'}} className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" height={'300px'} alt="no image" />
          <h3 className='text-danger fw-bolder' style={{overflowY:'hidden'}}>Wishlist is empty</h3>
          <Button className='btn btn-success mt-2'><Link style={{textDecoration:'none',color:'white'}} to={'/'}><i class="fa-solid fa-arrow-left"></i> Back to Home</Link></Button>

        </div>
          }
      </Row>
    </div>
  )
}

export default WishList