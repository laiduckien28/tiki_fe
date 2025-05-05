import React, { useEffect, useState } from 'react'; import { Alert } from 'antd';

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Row, Steps, message, Spin } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import axios from 'axios';

const MyOrderComponent = () => {
  const { id } = useParams();

  const [xacNhanDonHang, setXacNhanDonHang] = useState('process');
  const [giaoThanhCong, setGiaoThanhCong] = useState('wait');

  // Fetch đơn hàng từ API
  const getOnlyOrder = async () => {
    const res = await fetch(`http://localhost:3001/api/order/get-only-order/${id}`);
    if (!res.ok) throw new Error('Không thể lấy đơn hàng');
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getonly_orders', id],
    queryFn: getOnlyOrder,
  });

  const OnlyOrder = data?.message?.message;
  const order = OnlyOrder?.[0];
  const item = order?.orderItems?.[0];

  // Mutation cập nhật đơn hàng
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `http://localhost:3001/api/order/update-order/${id}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
      return res.data;
    },
    onSuccess: () => {
      message.success('Đơn hàng đã được xác nhận thành công!');

      <Alert
      message="Nhận hàng thành côngcông"
      description="Đang chuyển hướng về giỏ hàng"
      type="success"
      />
      setXacNhanDonHang('finish');
      setGiaoThanhCong('finish');
    },
    onError: () => {
      message.error('Xác nhận thất bại. Vui lòng thử lại.');
    },
  });

  useEffect(() => {
    if (order?.isDelivered) {
      setXacNhanDonHang('finish');
      setGiaoThanhCong('finish');
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="text-center mt-20">
        <Spin size="large" tip="Đang tải đơn hàng..." />
      </div>
    );
  }

  if (isError || !order) {
    return <div className="text-center text-red-600 mt-20">Không thể tải dữ liệu đơn hàng.</div>;
  }

  return (
    <div className="my-12 px-4 md:px-20">
      <p className="font-bold text-blue-600 text-3xl mb-8 text-center">Theo dõi đơn hàng</p>

      <Steps
        current={3}
        status="process"
        items={[
          {
            title: 'Đặt Hàng Thành Công',
            status: 'finish',
            icon: <UserOutlined />,
          },
          {
            title: 'Đang Giao',
            status: 'finish',
            icon: <SolutionOutlined />,
          },
          {
            title: 'Xác Nhận Đơn Hàng',
            status: xacNhanDonHang,
            icon: <LoadingOutlined />,
          },
          {
            title: 'Giao Thành Công',
            status: giaoThanhCong,
            icon: <SmileOutlined />,
          },
        ]}
      />

      <div className="mt-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Thông tin đơn hàng */}
        <div className="md:w-3/4 space-y-8">
          <div>
            <p className="text-lg font-semibold mb-2">Thông tin sản phẩm</p>
            <div className="flex gap-4 border border-blue-200 p-4 rounded-md">
              <img
                src={item?.image || 'https://via.placeholder.com/100'}
                alt="Sản phẩm"
                width={100}
                height={100}
              />
              <div>
                <p className="font-medium">Tên sản phẩm: {item?.name || 'Không có'}</p>
                <p>Số lượng: {item?.amount || 0}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Thông tin giao hàng</p>
            <div className="space-y-1">
              <p>Địa chỉ: {order?.shippingaddress?.address}</p>
              <p>Thành phố: {order?.shippingaddress?.city}</p>
              <p>Quốc gia: {order?.shippingaddress?.country}</p>
              <p>Người nhận: {order?.shippingaddress?.fullname}</p>
              <p>SĐT: {order?.shippingaddress?.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Chi tiết thanh toán</p>
            <div className="space-y-1">
              <p>Phí giao hàng: {order?.shippingprice}₫</p>
              <p>Thuế: {(order?.taxPrice * 100).toFixed(2)}%</p>
              <p>Tổng tiền: {order?.itemprices}₫</p>
              <p>Phương thức: {order?.paymentmethod}</p>
            </div>
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className="md:w-1/4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md shadow-md transition"
            onClick={() => mutation.mutate()}
            disabled={mutation.isLoading || giaoThanhCong === 'finish'}
          >
            {mutation.isLoading ? 'Đang xác nhận...' : 'Xác nhận đã nhận hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrderComponent;
