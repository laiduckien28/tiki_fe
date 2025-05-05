import { Col, Row} from 'antd'
import React from 'react'
import Header from '../HomePage/Header'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const GetAllOrderForMe = () => {
    const token = localStorage.getItem("access_token")
    const getallmyorders = async () => {
        const result = await fetch(`http://localhost:3001/api/order/get-details-order`, {
            method: "GET",
            headers: {
                token: `token ${token}`,
            },
        });
        return await result.json();
    };
    
    const { data } = useQuery({
      queryKey: ["getallmyorders"],
      queryFn: getallmyorders,
    });


    console.log("data", data?.message)
    const myorderall = data?.message?.message
    console.log("myorderall", myorderall)
    const Navigate = useNavigate()

  return (
    <div>
    <Header/>

<div className="my-8">
        <Row>
          <Col span={4}></Col>
          <Col span={18}>
            <div>
              <p className="font-bold text-blue-500 text-2xl mb-4">Đơn hàng của tôi</p>
            </div>

            {

                myorderall?.map((myorder) => (
          
                                <div> 

                                <Row className='flex '>
                                <Col span={8} > 
                                
                                <div className='border border-blue-200 rounded-xl shadow-sm p-4 m-4 bg-blue-200'> 
                                <img src={myorder?.orderItems[0].image} className='rounded-xl'/>
                                </div>


                                </Col>

                                <Col span={8} className='pt-4'> 
                                

                                <div> 
                                <p> {myorder?.orderItems[0].name}</p>
                                <p> id: {myorder?._id}</p>
                                </div>
                                </Col>


                                <Col span={8} className='pt-4'>

                                <p> Đơn giá</p>
                                <p className='font-bold text-blue-600 text-2xl'> {myorder?.itemprices.toLocaleString()}đ</p>


                                <button className='
                                
                                   border border-red-500 bg-red-500 rounded-sm text-white p-2 cursor-pointer
                                '
                                onClick={() => {

                                  Navigate(`/my-orders/${myorder?._id}`)
                                }}
                                > Chi tiết đơn hàng</button>
                                </Col>
                                </Row>


                                </div>
                    
                    

                ))

            }











          </Col>
          <Col span={2}></Col>
        </Row>
      </div>

    </div>
  )
}

export default GetAllOrderForMe
