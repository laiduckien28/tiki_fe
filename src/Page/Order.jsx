import React, { useState } from 'react'
import Header from '../Component/HomePage/Header'
import { Col, Row } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from 'antd';
import { Checkbox } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const Order = () => {
    const [quantity, setQuantity] = useState(1);

  const { id } = useParams()
  console.log("userid", id)
    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));
      const getDetailCart = async () => {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/get-only-cart-id/${id}`, {
            method: "GET"
        });
        return await result.json();
    };
      const { data } = useQuery({
        queryKey: ['get_details_carts'],
        queryFn: getDetailCart
      });
      console.log("data-raw", data)
      const array_all_carts = data?.message?.message
      console.log("data", array_all_carts)


      const token = localStorage.getItem("access_token")
      const decoded = jwtDecode(token)
      const userid = decoded.id
      
      const Navigate = useNavigate()
    //   const order = () => {
    //     Navigate('/order')
    //   }

    const [fullname, setfullname] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [country, setcountry] = useState('')
    const [phone, setphone] = useState('')
    const [shippingprice, setshippingprice] = useState(10000000)
    const [taxPrice, settaxPrice] = useState(0.02)

    


    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/create-order`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.data;
        },
    });


    if(mutation.isSuccess) {
        setTimeout(() => {
            Navigate('/my-orders')
        }, 1000)
    }
  return (
    <div>
      <Header/>
      <div className="my-8">
        <Row>
          <Col span={2}></Col>

          <Col span={20}>
          <div> 
            <p className='font-bold text-blue-500 text-2xl mb-4'> Giao Diện Thanh Toán</p>
          </div>
            {
                              <Row gutter={24} className='m-8'>
                        <Col span={7}>
                          <div className="rounded-2xl border border-white px-2 py-2 shadow-sm">
                            <img
                              src={array_all_carts?.orderItems[0]?.url}
                              className="rounded-xl border border-white"
                              alt="Product"
                            />
                          </div>
                        </Col>
                        <Col span={10}>
                          <div className="text-base font-semibold leading-6">
                            {array_all_carts?.orderItems[0]?.name}
                          </div>
                          {/* <div className="mt-2 text-sm text-gray-500">
                            <p>Rating: {data?.data?.message?.rating}</p>
                            <p>Số lượng còn trong kho:  {data?.data?.message?.countinStock}</p>
                          </div> */}
                          <p className="text-red-600 font-bold text-xl mt-3">{array_all_carts?.orderItems[0]?.price}đ</p>
                          <div className="mt-4">
                            <p className="font-medium">Thông tin vận chuyển</p>

                            <div className="m-2 p-2 text-sm text-gray-600">
                                <div className='flex gap-2 m-2'> 
                                <p> fullname</p>
                                <Input placeholder="fullname" 
                                    onChange={(e) => {
                                        setfullname(e.target.value)
                                    }}
                                />

                                </div>

                                <div className='flex gap-2 m-2'> 
                                <p> address</p>
                                <Input placeholder="address"                                     onChange={(e) => {
                                        setaddress(e.target.value)
                                    }}/>

                                </div>

                                <div className='flex gap-2 m-2'> 
                                <p> city   </p>
                                <Input placeholder="city"                                     onChange={(e) => {
                                        setcity(e.target.value)
                                    }}/>

                                </div>


                                <div className='flex gap-2 m-2'> 
                                <p> country</p>
                                <Input placeholder="country"                                     onChange={(e) => {
                                        setcountry(e.target.value)
                                    }}/>

                                </div>


                                <div className='flex gap-2 m-2'> 
                                <p> phone</p>
                                <Input placeholder="phone"                                     onChange={(e) => {
                                        setphone(e.target.value)
                                    }}/>

                                </div>
                            </div>
                          </div>
                        </Col>
                        <Col span={7}>
                          <p className="font-medium mb-2">Số lượng</p>
                          <div className="flex items-center gap-2 mb-4">
                            <button
                              onClick={decrease}
                              className="w-10 h-10 border rounded-md text-xl flex items-center justify-center hover:bg-gray-100"
                            >
                              –
                            </button>
                            <div className="w-10 h-10 border rounded-md flex items-center justify-center text-lg">
                              {quantity}
                            </div>
                            <button
                              onClick={increase}
                              className="w-10 h-10 border rounded-md text-xl flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <div className='flex gap-2'> 
                            <p> Phí Giao Hàng: </p>
                            <p> {shippingprice}đ </p>
                          </div>

                          <div className='flex gap-2'> 
                            <p> Thuế </p>
                            <p> {taxPrice*100}%  </p>                           </div>

                          <div > 
                            <p> Phương thức thanh toán </p>
                            <div className='flex flex-col justify-between'> 
                            <Checkbox >Thanh Toán Khi Nhận Hàng</Checkbox>
                            <Checkbox >Thanh Toán Qua Ngân Hàng</Checkbox>
                            </div>

                          </div>

                          <div>
                            <p className="text-gray-600">Tạm tính</p>
                            <p className="text-lg font-semibold text-red-600">{(array_all_carts?.orderItems[0]?.price * quantity + 10000000 + array_all_carts?.orderItems[0]?.price * quantity*0.2).toLocaleString()}₫</p>
                          </div>
                          <div className="flex gap-4 mt-4"> 
                            <button className="border  border-red-500 bg-red-500 text-white rounded-sm  p-1 cursor-pointer"
                               
                            onClick={() => {
                                mutation.mutate({
                                    orderItems: [
                                            {
                                                name: array_all_carts?.orderItems[0]?.name, 
                                                amount: array_all_carts?.orderItems[0]?.amount,
                                                image: array_all_carts?.orderItems[0]?.url, 
                                                price: array_all_carts?.orderItems[0]?.price,
                                                product: array_all_carts?.orderItems[0]?.product
                                            }
                                        ],
                                        paymentmethod: "Thanh Toán Khi Nhận Hàng",
                                        shippingaddress: {
                                            fullname: fullname,
                                            address: address,
                                            city: city,
                                            country: country,
                                            phone:phone
                                        },
                                        shippingprice: shippingprice,
                                        taxPrice: taxPrice,
                                        user: userid
                            })
                            }}

                            > Đặt ngay </button>
                          
                          </div>
                        </Col>
                      </Row> 
                  
                  
                

                
            }

          </Col>

          <Col span={2}></Col>
        </Row>
      </div>  

    </div>
  )
}

export default Order
