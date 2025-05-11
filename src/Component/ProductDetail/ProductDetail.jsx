import React, { useState } from "react";
import Header from "../HomePage/Header";
import { Col, Row } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("access_token")
  const decoded = jwtDecode(token)
  const userid = decoded.id
  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  const { id } = useParams()

  const getDetailProduct = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product/get-details/${id}`);
    return res.json();
  };
  const { data } = useQuery({
    queryKey: ['get_all_product'],
    queryFn: getDetailProduct
  });
  const navigate = useNavigate()
  const carts = () => {
    // navigate('/carts')
    mutation.mutate({
      "orderItems": [
        {
          "name": data?.data?.message?.name,
          "url": data?.data?.message?.image,
          "amount": quantity,
          "price": data?.data?.message?.price,
          "product": id
        }
      ],
      "itemprices": data?.data?.message?.price * quantity,
      "user": userid
    })
  }

  console.log("data-details", data)

  const mutation = useMutation({
    mutationFn: (data) => {
      const res =  axios.post(`${import.meta.env.VITE_API_URL}/api/cart/create-cart`, data , {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("data", data)
      return res


    },
  })

  if( mutation.isSuccess) {

    navigate('/carts')
  }




  
  return (
    <div>
    <div className='block sm:hidden'>     
    
                <div>
            <Header />


          </div>
     

      <div className="my-8">
        <Row>
          <Col span={1}></Col>

          <Col span={22}>
          <div className="pt-2 flex gap-1 text-[12px] text-[#242424] font-medium mb-3">
    <p className="cursor-pointer hover:text-blue-500">Trang chủ</p>
    <RightOutlined className="mt-[2px]" />
    <p className="mb-">Đồ Chơi - Mẹ và Bé</p>
  </div>
            <Row gutter={10}  className="">
              <Col span={10}>
                <div className="rounded-sm border border-white px-2 py-2 shadow-sm">
                  <img
                    src={data?.data?.message?.image}
                    className="rounded-xl border border-white"
                    alt="Product"
                  />
                </div>
              </Col>

              <Col span={7}>
                <div className="font-semibold text-[13px]">
                  {data?.data?.message?.name}
                </div>

                <div className="mt-2 text-[10px] text-gray-500">
                  <p>Rating: {data?.data?.message?.rating}</p>
                  <p>Số lượng còn trong kho:  {data?.data?.message?.countinStock}</p>
                </div>

                <p className="text-red-600 font-bold text-[13px] mt-3">{data?.data?.message?.price.toLocaleString()}đ</p>

                <div className="mt-4">
                  <p className="text-[11px]">Thông tin vận chuyển</p>
                  <div className="mt-1 text-[10px] text-gray-600">
                    <p>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</p>
                    <p className="text-blue-500 cursor-pointer  text-[10px] mt-3">Đổi</p>
                  </div>
                </div>
              </Col>

              <Col span={5}>
                <p className="font-medium mb-2 text-[13px] ">Số lượng</p>

                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={decrease}
                    className="w-7 h-7 border rounded-sm text-sm flex items-center justify-center hover:bg-gray-100 p-1"
                  >
                    –
                  </button>
                  <div className="w-7 h-7 border rounded-sm flex items-center justify-center text-sm p-1">
                    {quantity}
                  </div>
                  <button
                    onClick={increase}
                    className="w-7 h-7 border rounded-sm text-sm flex items-center justify-center hover:bg-gray-100 p-1"
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="text-gray-600 text-[10px]">Tạm tính</p>
                  <p className="text-[13px] font-semibold text-red-600">{(data?.data?.message?.price * quantity).toLocaleString()}₫</p>
                </div>


                <div className="flex gap-4 mt-4"> 
                  <button  className="border  border-red-500 bg-red-500 text-white rounded-sm  p-1 cursor-pointer text-[10px]"
                  onClick={() => 
                    carts()
                  }
                  > Thêm vào giỏ hàng </button>
                
                </div>
                                <div className="flex gap-4 mt-4"> 

                  <button className="border  border-red-500 bg-red-500 text-white rounded-sm  p-1 cursor-pointer text-[10px]"> Mua ngay </button>
                
                </div>
              </Col>
            </Row>
          </Col>

        </Row>
      </div></div>
    <div className='hidden sm:block'>       <div>
  <Header />


</div>
     

      <div className="my-8">
        <Row>
          <Col span={2}></Col>

          <Col span={20}>
          <div className="pt-2 flex gap-1 text-[12px] text-[#242424] font-medium">
    <p className="cursor-pointer hover:text-blue-500">Trang chủ</p>
    <RightOutlined className="mt-[2px]" />
    <p>Đồ Chơi - Mẹ và Bé</p>
  </div>
            <Row gutter={24}>
              {/* LEFT IMAGE GALLERY */}
              <Col span={7}>
                <div className="rounded-2xl border border-white px-2 py-2 shadow-xl/30">
                  {/* Main Image */}
                  <img
                    src={data?.data?.message?.image}
                    className="rounded-xl border border-white"
                    alt="Product"
                  />

                  {/* Thumbnail Images */}
                  <Row className="gap-1 mt-3">
                    {[1, 2, 3, 4].map((_, i) => (
                      <Col key={i} span={5}>
                        <div className="rounded-sm border border-white px-1 pt-4 pb-2 shadow-xl">
                          <img
                            src={data?.data?.message?.image}
                            className="rounded-sm border border-white"
                            alt={`Thumb ${i}`}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>

              {/* CENTER: PRODUCT INFO */}
              <Col span={10}>
                <div className="text-base font-semibold leading-6">
                  {data?.data?.message?.name}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  <p>Rating: {data?.data?.message?.rating}</p>
                  <p>Số lượng còn trong kho:  {data?.data?.message?.countinStock}</p>
                </div>

                <p className="text-red-600 font-bold text-xl mt-3">{data?.data?.message?.price}đ</p>

                {/* Shipping Info */}
                <div className="mt-4">
                  <p className="font-medium">Thông tin vận chuyển</p>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <p>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</p>
                    <p className="text-blue-500 cursor-pointer">Đổi</p>
                  </div>
                </div>
              </Col>

              {/* RIGHT: QUANTITY SELECTOR */}
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

                <div>
                  <p className="text-gray-600">Tạm tính</p>
                  <p className="text-lg font-semibold text-red-600">{(data?.data?.message?.price * quantity).toLocaleString()}₫</p>
                </div>


                <div className="flex gap-4 mt-4"> 
                  <button  className="border  border-red-500 bg-red-500 text-white rounded-sm  p-1 cursor-pointer"
                  onClick={() => 
                    carts()
                  }
                  > Thêm vào giỏ hàng </button>
                  <button className="border  border-red-500 bg-red-500 text-white rounded-sm  p-1 cursor-pointer"> Mua ngay </button>
                
                </div>
              </Col>
            </Row>
          </Col>

          <Col span={2}></Col>
        </Row>
      </div> </div>  
      

      

    </div>
  );
};

export default ProductDetail;
