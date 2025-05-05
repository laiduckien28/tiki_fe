import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Alert } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const NormalUser = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");



    const decoded = jwtDecode(token);
    const id = decoded.id;

    const getdetailuser = async () => {
        const result = await fetch(`http://localhost:3001/api/user/getuser/${id}`, {
            method: "GET",
            headers: {
                token: `authorization ${token}`,
            },
        });
        return await result.json();
    };

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.put(`http://localhost:3001/api/user/update-user/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.data;
        },
    });

    useEffect(() => {
        if (mutation.isSuccess) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [mutation.isSuccess]);

    const { data, error } = useQuery({
        queryKey: ["get_data_user_detail", id],
        queryFn: getdetailuser,
    });

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [sdt, setsdt] = useState('');
    const [address, setaddress] = useState('');
    const [password, setpassword] = useState('');


    useEffect(() => {
        if (data?.message?.data?.[0]) {
            const user = data.message.data[0];
            setusername(user.name || '');
            setemail(user.email || '');
            setsdt(user.phone || '');
            setaddress(user.address || '');
            setpassword(user.password || '');
        }
    }, [data]);


    if (error) return <Alert message="Không thể lấy thông tin người dùng" type="error" />;

    return (
        <div>
            <Row>
                <Col span={6}></Col>
                <Col span={10}>
                    <Row className='mt-10'>
                        <Col span={6}></Col>
                        <Col span={16}>



                            { 

                                mutation.isLoading && (
                                                <div>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />


                                    </div>
                                )
                            }


                            {mutation.isSuccess && (
                                <div className='mb-10'>
                                    <Alert
                                        message="Cập nhật thành công"
                                        description="Đang chuyển hướng về trang chủ..."
                                        type="success"
                                        showIcon
                                    />
                                </div>
                            )}
                            {mutation.isError && (
                                <Alert
                                    message="Lỗi cập nhật"
                                    type="error"
                                    showIcon
                                    className='mb-4'
                                />
                            )}
                            <div className='border border-gray-300 shadow-2xl rounded p-4'>
                                <p className='font-bold text-blue-700 text-2xl'>Thông tin cá nhân</p>
                                <div className='flex-col'>
                                    <div className='flex m-2'>
                                        <p className='flex-1/3'>Họ & Tên</p>
                                        <Input value={username} onChange={e => setusername(e.target.value)} />
                                    </div>
                                    <div className='flex m-2'>
                                        <p className='flex-1/3'>Email</p>
                                        <Input value={email} onChange={e => setemail(e.target.value)} />
                                    </div>
                                    <div className='flex m-2'>
                                        <p className='flex-1/3'>Số điện thoại</p>
                                        <Input value={sdt} onChange={e => setsdt(e.target.value)} />
                                    </div>
                                    <div className='flex m-2'>
                                        <p className='flex-1/3'>Địa chỉ</p>
                                        <Input value={address} onChange={e => setaddress(e.target.value)} />
                                    </div>


                                    <div className='flex m-2'>
                                        <p className='flex-1/3'> Mật khẩu</p>
                                        <Input  onChange={e => setpassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <button
                                            className='border border-blue-600 bg-blue-600 text-white p-1 rounded-sm cursor-pointer'
                                            onClick={() => {
                                                mutation.mutate({
                                                    name: username,
                                                    email: email,
                                                    phone: sdt,
                                                    address: address,
                                                    password: password
                                                });
                                            }}
                                        >
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );
};

export default NormalUser;
