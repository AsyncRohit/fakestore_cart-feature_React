import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [product, setProduct] = useState([])
  const [cartProduct, setCartProduct] = useState([])
  const [total, setTotal] = useState('0')
  const getData=async()=>{
    const {data}= await axios.get('https://fakestoreapi.com/products')

    setProduct(data)
    // console.log(data)
  }
  useEffect(()=>{
getData()
  },[])

  // to add to cart 

  const addCart=(index)=>{
    const arr=[...cartProduct,product[index]]
    //for adding all the price of carted products
    
    const totalPrice = arr.reduce((total, product) => total + product.price, 0); 
    setTotal(totalPrice) 
    setCartProduct(arr)
  }

  // remove from cart 

  const DeleteCart=(index)=>{
    const copyarr=[...cartProduct]
    copyarr.splice(index,1);

    // recalculating the total after removing from cart 

    const totalPrice = copyarr.reduce((total, product) => total + product.price, 0); 
    setTotal(totalPrice)
    setCartProduct(copyarr)
  }
  return (
    <div className='min-h-screen w-full flex bg-gray-400'>
      <div className='w-[80%] min-h-screen bg-white-300 p-4'>

      
        <div className='px-2 flex flex-wrap w-[100%] mr-2 bg-gray-400 justify-between gap-10'>
        {product.map(function(products,index){
        return <div 
        key={index}
        className='px-4 py-2 bg-white text-black w-[30%] text-white text-center mt-2  rounded-md'>
          <div className='image h-80 w-full bg-black'>
          <img 
          className=' w-[100%] h-[100%] rounded object-center'
          src={products.image} alt="" />
          </div>
          <div className='h-30 mt-10  flex flex-col'>
            <div className='h-4'>
          <h1 className='w-40  text-xl mx-auto h-10'>{products.title.toString().substring(0,15).trim()}..</h1>

            </div>
            <div className='h-10 mt-2'> 
          <h1 className='w-40 h-20  mx-auto h-10'>{products.description.toString().substring(0,30).trim()}..</h1>

            </div>
            <div className='h-10 mt-8'>
          <h1 className='w-40  text-center mx-auto text-2xl h-10'>${products.price}</h1>

            </div>
          </div>
          <button 
          onClick={()=>{
            addCart(index)
          }}
          className='px-4 py-2 bg-yellow-500 text-white text-xl mt-4 rounded-md'>Add to Cart</button>
         
          
        </div>
      })}
        </div>
              </div>
              <div className='cartdiv w-1/3 bg-gray-500 px-2 py-2  outflow-hidden '>
                <div className='flex justify-evenly'>
                <h1 className='px-4 py-2 text-2xl font-bold text-white'>Your Cart</h1>
                <h1 className='px-4 py-2 text-2xl font-bold text-white'>Total Price- ${total}</h1>

                </div>
      {cartProduct.map(function(cart,index){
         return (

           <div key={index} className='bg-gray-600  h-40 w-full rounded-md p-2  my-auto flex gap-2 mt-2'>
          <div className='img h-full w-[30%]  my-auto '>
            <img  className='h-[95%] w-full  '
            src={cart.image} alt="" />
          </div>
          <div className='deatils w-[70%]  text-center  text-white '>
          <h1 className='text-xl'>{cart.title}</h1>
          <div className='flex items-center justify-evenly mt-10'>
          <h1 className='font-semibold text-2xl mr-20'>${cart.price}</h1>
          <button 
          onClick={()=>{
            DeleteCart(index)
          }}
          className='px-2 py-2 bg-red-600 text-lg font-semibold rounded-md'>✕Remove</button>
          </div>
          </div>
         </div>
           )           
      })}
              </div>

</div>
  )
}

export default App