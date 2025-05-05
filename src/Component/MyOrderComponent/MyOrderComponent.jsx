import React from 'react'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Steps } from 'antd';
const MyOrderComponent = () => {
  return (
    <div>

<div className="my-8">
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <div>
              <p className="font-bold text-blue-500 text-2xl mb-4">Đơn hàng của tôi</p>
            </div>


                <Row  gutter={24}>
                  <Col span={2}>
    
                  </Col>

                  <Col span={20}>

                  <div>  Trạng Thái Đơn Hàng </div>
                  <div> 
      
                            <Steps
                            items={[
                            {
                                title: 'Login',
                                status: 'finish',
                                icon: <UserOutlined />,
                            },
                            {
                                title: 'Verification',
                                status: 'finish',
                                icon: <SolutionOutlined />,
                            },
                            {
                                title: 'Pay',
                                status: 'process',
                                icon: <LoadingOutlined />,
                            },
                            {
                                title: 'Done',
                                status: 'wait',
                                icon: <SmileOutlined />,
                            },
                            ]}
                        />
      
      </div>

      <div>  Thông Tin Đơn Hàng </div>


      <div> 


        <button> Xác Nhận Đơn Hàng Nhận Thành Công? </button>
      
                            
      
      </div>

      <div> 
      
                            
      
      </div>
                  </Col>


                  <Col span={2}>
 
                  </Col>
                </Row>

          </Col>
          <Col span={2}></Col>
        </Row>
      </div>

    </div>
  )
}

export default MyOrderComponent
