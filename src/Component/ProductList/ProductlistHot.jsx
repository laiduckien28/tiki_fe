import React from 'react'
import { Col, Row } from 'antd';

const ProductlistHot = () => {
  return (
    <div > 
    
        <Row>
        <Col span={6}></Col>
        <Col span={16} className='bg-blue-300 border-blue-300 border-3 rounded-lg mt-5'>
        <div className='font-bold px-4 mt-2 text-2xl text-black'> Hàng ngoại giá hot </div>
        <div className='grid grid-cols-4 gap-4'>

            <div className='bg-white px-4 border-white border-solid rounded mx-4 my-4 shadow-xl'> 
                <img src='https://salt.tikicdn.com/cache/750x750/ts/product/c6/98/bc/892b2a1787869a06ec32f09b028c17c9.jpg.webp'/>
                <div className='py-2'> 
                <p > Kem dưỡng ẩm dạng gel Hada Labo Koi-Gokujyun Perfect Gel 100g </p>
                <p className='font-bold py-1 text-red-600'> 405.000đ</p>
                <p> Made in Japan</p>
             </div>
             </div>
        </div>
        </Col>
        <Col span={2}></Col>
        </Row>
    
    </div>

  )
}

export default ProductlistHot
