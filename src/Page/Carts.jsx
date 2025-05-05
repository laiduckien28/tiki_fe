import React, { useState } from 'react';
import Header from '../Component/HomePage/Header';
import { Col, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Carts = () => {
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const navigate = useNavigate();

  const increase = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: (prev[cartId] || 1) + 1,
    }));
  };

  const decrease = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: prev[cartId] > 1 ? prev[cartId] - 1 : 1,
    }));
  };



  const getDetailCart = async () => {
    const result = await fetch(`http://localhost:3001/api/cart/get-details-carts/${userId}`, {
      method: 'GET',
      headers: {
        token: `authorization ${token}`,
      },
    });
    return await result.json();
  };

  const { data } = useQuery({
    queryKey: ['get_all_carts'],
    queryFn: getDetailCart,
  });

  const cartItems = data?.message?.message || [];

  const order = (id) => {
    navigate(`/order/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="my-8">
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <div>
              <p className="font-bold text-blue-500 text-2xl mb-4">Giỏ hàng của tôi</p>
            </div>

            {cartItems.map((item) => {
              const cartId = item._id;
              const quantity = quantities[cartId] || 1;
              const product = item.orderItems[0];

              return (
                <Row key={cartId} gutter={24} className="m-8 border-b pb-4">
                  {/* Image */}
                  <Col span={7}>
                    <div className="rounded-2xl border border-white px-2 py-2 shadow-sm">
                      <img
                        src={product?.url}
                        className="rounded-xl border border-white"
                        alt="Product"
                      />
                    </div>
                  </Col>

                  {/* Product Info */}
                  <Col span={10}>
                    <div className="text-base font-semibold">{product?.name}</div>
                    <div className="text-base text-gray-500">{cartId}</div>
                    <p className="text-red-600 font-bold text-xl mt-3">{product?.price}₫</p>

                    <div className="mt-4">
                      <p className="font-medium">Thông tin vận chuyển</p>
                      <div className="flex justify-between mt-1 text-sm text-gray-600">
                        <p>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</p>
                        <p className="text-blue-500 cursor-pointer">Đổi</p>
                      </div>
                    </div>
                  </Col>

                  {/* Quantity & Order */}
                  <Col span={7}>
                    <p className="font-medium mb-2">Số lượng</p>
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() => decrease(cartId)}
                        className="w-10 h-10 border rounded-md text-xl flex items-center justify-center hover:bg-gray-100"
                      >
                        –
                      </button>
                      <div className="w-10 h-10 border rounded-md flex items-center justify-center text-lg">
                        {quantity}
                      </div>
                      <button
                        onClick={() => increase(cartId)}
                        className="w-10 h-10 border rounded-md text-xl flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <p className="text-gray-600">Tạm tính</p>
                      <p className="text-lg font-semibold text-red-600">
                        {(product?.price * quantity).toLocaleString()}₫
                      </p>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <button
                        className="border border-red-500 bg-red-500 text-white rounded-sm p-1 cursor-pointer"
                        onClick={() => order(cartId)}
                      >
                        Đặt ngay
                      </button>
                      <button className="border border-red-500 bg-red-500 text-white rounded-sm p-1 cursor-pointer">
                        Xóa
                      </button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Carts;
