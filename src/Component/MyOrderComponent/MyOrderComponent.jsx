import React, { useEffect, useState } from 'react';
import { Alert, Col, Row, Steps, message, Spin } from 'antd';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import axios from 'axios';

const ConfirmButton = ({ onConfirm, isLoading, disabled }) => (
  <div className="md:w-1/4">
    <button
      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-1 sm:py-3 sm:px-4 rounded-md shadow-md transition text-[13px] sm:text-xl"
      onClick={onConfirm}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Đang xác nhận...' : 'Xác nhận đã nhận hàng'}
    </button>
  </div>
);

const MyOrderComponent = () => {
  const { id } = useParams();

  const [giaoThanhCong, setGiaoThanhCong] = useState('wait');

  // Fetch đơn hàng từ API
  const getOnlyOrder = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/order/get-only-order/${id}`);
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
  const state = order?.state_order;
  // Mutation cập nhật đơn hàng
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/order/update-order/${id}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
      return res.data;
    },
    onSuccess: () => {
      message.success('Đơn hàng đã được xác nhận thành công!');
      setGiaoThanhCong('finish');
    },
    onError: () => {
      message.error('Xác nhận thất bại. Vui lòng thử lại.');
    },
  });

  useEffect(() => {
    if (order?.isDelivered) {
      setGiaoThanhCong('finish');
    }
    if (state) {
      setGiaoThanhCong('finish');
    }
  }, [order, state]);

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
      <p className="font-bold text-blue-600 text-[13px]  sm:text-3xl mb-8 text-center">Theo dõi đơn hàng</p>

      <Steps size="small"
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
            status: giaoThanhCong,
            icon: <SmileOutlined />,
          },
          {
            title: 'Giao Thành Công',
            status: giaoThanhCong,
            icon: <SmileOutlined />,
          },
        ]}
      />

      <div className="mt-10 flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-3/4 space-y-8">
          <div>
            <p className="text-[13px] sm:text-lg font-bold mb-2">Thông tin sản phẩm</p>
            <div className="flex gap-4 border border-blue-200 p-4 rounded-md">
              <img
                src={item?.image || 'https://via.placeholder.com/100'}
                alt="Sản phẩm"
                width={100}
                height={100}
              />
              <div>
                <p className="text-[12px] sm:text-lg">Tên sản phẩm: {item?.name || 'Không có'}</p>
                <p className="text-[12px] sm:text-lg">Số lượng: {item?.amount || 0}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[13px] sm:text-lg font-bold mb-2">Thông tin giao hàng</p>
            <div className="space-y-1">
              <p className="text-[12px] sm:text-lg">Địa chỉ: {order?.shippingaddress?.address}</p>
              <p className="text-[12px] sm:text-lg">Thành phố: {order?.shippingaddress?.city}</p>
              <p className="text-[12px] sm:text-lg">Quốc gia: {order?.shippingaddress?.country}</p>
              <p className="text-[12px] sm:text-lg">Người nhận: {order?.shippingaddress?.fullname}</p>
              <p className="text-[12px] sm:text-lg">SĐT: {order?.shippingaddress?.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-[13px] sm:text-lg font-bold mb-2">Chi tiết thanh toán</p>
            <div className="space-y-1">
              <p className="text-[12px] sm:text-lg">Phí giao hàng: {order?.shippingprice.toLocaleString()}₫</p>
              <p className="text-[12px] sm:text-lg"> Thuế: {(order?.taxPrice * 100).toFixed(2).toLocaleString()}%</p>
              <p className="text-[12px] sm:text-lg">Tổng tiền: {order?.itemprices.toLocaleString()}₫</p>
              <p  className="text-[12px] sm:text-lg">Phương thức: {order?.paymentmethod}</p>
            </div>
          </div>

          {giaoThanhCong === 'finish' && (
            <Alert
              message="Nhận hàng thành công"
              description="Cảm ơn bạn đã sử dụng dịch vụ!"
              type="success"
              showIcon
              className="mt-8"
            />
          )}
        </div>

        {state === false && giaoThanhCong !== 'finish' && (
          <ConfirmButton
            onConfirm={() => mutation.mutate()}
            isLoading={mutation.isLoading}
            disabled={giaoThanhCong === 'finish'}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrderComponent;
