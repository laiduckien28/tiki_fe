import React, { useState } from 'react';
import { Col, Row, message } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SystemAdminUser = () => {
  const [infouser, setinfouser] = useState(false);
  const [infoproduct, setinfoproduct] = useState(false);
  const token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();



  const decoded = jwtDecode(token);
  console.log(decoded);

  const getalluser = async () => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getall`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await result.json();
  };

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/delete-user/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      message.success("Xóa người dùng thành công!");
      queryClient.invalidateQueries(["get_data_user_all"]);
    },
    onError: (error) => {
      message.error("Lỗi khi xóa người dùng: " + error.message);
    }
  });
  const mutation_product = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/product/deleteproduct/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      message.success("Xóa Sản phẩm thành công!");
      queryClient.invalidateQueries(["get_data_product_all"]);
    },
    onError: (error) => {
      message.error("Lỗi khi xóa sản phẩm: " + error.message);
    }
  });
  const { data } = useQuery({
    queryKey: ["get_data_user_all"],
    queryFn: getalluser,
  });

  const getallproduct = async () => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/product/getall`, {
      method: "GET",
      headers: {
        "Content-Type": `application/json`,
      },
    });
    return await result.json();
  };

  const { data: product_data } = useQuery({
    queryKey: ["get_data_product_all"],
    queryFn: getallproduct,
  });

  const edit_user = (id) => {
    navigate(`/system/admin/edit-user/${id}`);
  };
  const edit_product = (id) => {
    navigate(`/system/admin/edit-product/${id}`);
  };

  const array_data = data?.message?.data || [];
  const product_array_data = product_data?.data?.message || [];

  const columns = [
    {
      title: '_id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span
            onClick={() => edit_user(record.key)}
            className="cursor-pointer text-blue-500"
          >
            Edit
          </span>
          <span
            className="cursor-pointer text-red-500"
            onClick={() => mutation.mutate(record.key)}
          >
            Delete
          </span>
        </Space>
      ),
    }
  ];

  const columns_product = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'CountinStock',
      key: 'countinStock',
      dataIndex: 'countinStock'
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <span className='cursor-pointer text-blue-500'
          onClick={() => {
              edit_product(record.key)
          }}
          >Edit</span>
          <span className='cursor-pointer text-red-500'
          onClick={() => mutation_product.mutate(record.key)}
          >Delete</span>
        </Space>
      ),
    }
  ];

  const data_demo = array_data.map((user) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.isadmin ? 'Admin' : 'User',
  }));

  const product_data_demo = product_array_data.map((product) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    type: product.type,
    price: product.price,
    countinStock: product.countinStock,
  }));

  return (
    <div>
          <div className='block sm:hidden'>       <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Row className='mt-10'>
            <Col span={4}>
              <div className='border border-white rounded-sm shadow-xl bg-blue-500 h-140 px-1 py-1 gap-1 text-[13px]'>
                <p className='font-bold text-white'>Thông Tin Quản Trị</p>

                
                <button
                  className='border border-white bg-white rounded-sm  cursor-pointer mt-5 text-[10px]'
                  onClick={() => {
                    setinfouser(true);
                    setinfoproduct(false);
                  }}
                >
                  Thông tin người dùng
                </button>
                <button
                  className='border border-white bg-white rounded-sm  cursor-pointer mt-3 text-[10px]'
                  onClick={() => {10
                    setinfouser(false);
                    setinfoproduct(true);
                  }}
                >
                  Thông tin sản phẩm
                </button>

                </div>
 
            </Col>
            <Col span={20}>
              <div className='border border-white rounded-sm shadow-xl bg-gray-200 h-140 px-4 py-4 w-250 '>
                {infouser && (
                  <div>
                    <div className='flex gap-1 cursor-pointer'>
                      <PlusSquareOutlined style={{ fontSize: '25px', color: '#08c' }}                        onClick={() => {
                        navigate('/system-admin/add-user/')
                      }}/>
                      <p className='text-[12px]'
                      onClick={() => {
                        navigate('/system-admin/add-user/')
                      }}
                      >Thêm người dùng</p>
                    </div>
                    <p className='mt-4 mb-4 text-[12px]'>Danh sách các user</p>
                    <Table columns={columns} dataSource={data_demo} pagination={{ pageSize:  5}} style={{ fontSize: '10px'}}/>
                  </div>
                )}
                {infoproduct && (
                  <div>
                    <div className='flex gap-1'>
                      <PlusSquareOutlined className='cursor-pointer'
                                            onClick={() => {
                        navigate('/system-admin/add-product/')
                      }}
                      style={{ fontSize: '25px', color: '#08c' }}   

                      />
                      <p            className='cursor-pointer text-[12px]'           onClick={() => {
                        navigate('/system-admin/add-product/')
                      }}>Thêm sản phẩm</p>
                    </div>
                    <p className='mt-4 mb-4 text-[12px]'>Danh sách các sản phẩm</p>
                    <Table columns={columns_product} dataSource={product_data_demo} pagination={{ pageSize: 3 }} size='small'/>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row></div>
                <div className='hidden sm:block'>       <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Row className='mt-10'>
            <Col span={2}></Col>
            <Col span={5}>
              <div className='border border-white rounded-sm shadow-xl bg-blue-500 h-140 px-4 py-4 gap-5'>
                <p className='font-bold text-white'>Thông Tin Quản Trị</p>

                <div className='gap=5 flex'> 
                
                <button
                  className='m-4 border border-white bg-white rounded-sm px-2 py-1 cursor-pointer'
                  onClick={() => {
                    setinfouser(true);
                    setinfoproduct(false);
                  }}
                >
                  Thông tin người dùng
                </button>
                <button
                  className='m-4 border border-white bg-white rounded-sm px-2 py-1 cursor-pointer'
                  onClick={() => {10
                    setinfouser(false);
                    setinfoproduct(true);
                  }}
                >
                  Thông tin sản phẩm
                </button>

                </div>
 
              </div>
            </Col>
            <Col span={15}>
              <div className='border border-white rounded-sm shadow-xl bg-gray-200 h-140 px-4 py-4 w-250 ml-5'>
                {infouser && (
                  <div>
                    <div className='flex gap-1 cursor-pointer'>
                      <PlusSquareOutlined style={{ fontSize: '50px', color: '#08c' }}                        onClick={() => {
                        navigate('/system-admin/add-user/')
                      }}/>
                      <p
                      onClick={() => {
                        navigate('/system-admin/add-user/')
                      }}
                      >Thêm người dùng</p>
                    </div>
                    <p className='mt-4'>Danh sách các user</p>
                    <Table columns={columns} dataSource={data_demo} pagination={{ pageSize:  5}} />
                  </div>
                )}
                {infoproduct && (
                  <div>
                    <div className='flex gap-1'>
                      <PlusSquareOutlined className='cursor-pointer'
                                            onClick={() => {
                        navigate('/system-admin/add-product/')
                      }}
                      style={{ fontSize: '50px', color: '#08c' }
                      
                      } 

                      />
                      <p            className='cursor-pointer'           onClick={() => {
                        navigate('/system-admin/add-product/')
                      }}>Thêm sản phẩm</p>
                    </div>
                    <p className='mt-4'>Danh sách các sản phẩm</p>
                    <Table columns={columns_product} dataSource={product_data_demo} pagination={{ pageSize: 3 }} />
                  </div>
                )}
              </div>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row></div>
    </div>
  );
};

export default SystemAdminUser;
