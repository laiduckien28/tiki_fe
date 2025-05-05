import React from 'react'
import { Col, Row } from 'antd';
import { Pagination } from 'antd';
const AboutMe = () => {
  return (
    <div > 
    
        <Row>
        <Col span={6}></Col>
        <Col span={16} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>

        <div className='grid grid-cols-4 gap-4'>
            <div className=' px-4 mx-4 my-4 '> 
                Hỗ trợ khách hàng
             </div>

             <div className=' px-4 mx-4 my-4 '> 
                Về TikiTiki
             </div>


             <div className=' px-4 mx-4 my-4 '> 
                Hợp tác và liên kết
             </div>


             <div className=' px-4 mx-4 my-4 '> 
                Phương thức thanh toán
             </div>
        </div>


        </Col>
        <Col span={2}></Col>
        </Row>
    
    </div>

  )
}

export default AboutMe
