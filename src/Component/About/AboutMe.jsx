import React from 'react'
import { Col, Row } from 'antd';
import { Pagination } from 'antd';
const AboutMe = () => {
  return (
    <div > 
    
      <div className='block sm:hidden'>         <Row>
        <Col span={1}></Col>
        <Col span={21} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>

        <div className='grid grid-cols-4 gap-2 text-[12px]'>
            <div className=' px-2 mx-2 my-2 '> 
                Hỗ trợ khách hàng
             </div>

             <div className=' px-2 mx-2 my-2 '> 
                Về TikiTiki
             </div>


             <div className=' px-2 mx-2 my-2 '> 
                Hợp tác và liên kết
             </div>


             <div className=' px-2 mx-2 my-2 '> 
                Phương thức thanh toán
             </div>
        </div>


        </Col>
        <Col span={2}></Col>
        </Row>
    </div>
          <div className='hidden sm:block'>         <Row>
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
    </div>

  )
}

export default AboutMe
