import React, { useState } from 'react'
import { Col, Row } from 'antd'
import {
  PlusSquareOutlined
} from '@ant-design/icons'; 
import { Space, Table, Tag } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const SystemAdminUser = () => {
  const [ infouser, setinfouser] = useState(false);
  const [ infoproduct, setinfoproduct] = useState(false);
  const token = localStorage.getItem("access_token")
  const decoded = jwtDecode(token)
  console.log(decoded)
  const getalluser = async () => {
    const result = await fetch(`http://localhost:3001/api/user/getall`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return await result.json();
};

const { data } = useQuery({
  queryKey: ["get_data_user_all"],
  queryFn: getalluser,
});
const getallproduct = async () => {
  const result = await fetch(`http://localhost:3001/api/product/getall`, {
      method: "GET",
      headers: {
        "Content-Type": `application/json`,
      },
  });
  return await result.json();
};
const navigate = useNavigate()

const edit_user = (id) => {
  navigate(`/system/admin/edit-user/${id}`)
}


const { data: product_data } = useQuery({
queryKey: ["get_data_product_all"],
queryFn: getallproduct,
});
const array_data = data?.message?.data;
console.log("array_data", array_data)
const product_array_data = product_data?.data?.message;
console.log("product_data", product_array_data)

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
      render: text => <a>{text}</a>,
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
          <a 
            onClick={() => {
              const id = record.key
              edit_user(id)
              // console.log("Full user data:", record); 
            }}
            className='cursor-pointer'
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    }
    
  ];
  const columns_product = [

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
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
      render: () => (
        <Space size="middle">
          <a >Edit </a>
          <a>Delete</a>
        </Space>
      ),
    }
  ];
  const data_demo = array_data?.map((user) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.isadmin ? 'Admin' : 'User',
  })) || [];
  console.log("data_demo", data_demo)


  const product_data_demo = product_array_data?.map((product) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    type: product.type,
    price: product.price,
    countinStock: product.countinStock,
  })) || [];

  return (
    <div>
                  <Row>
                <Col span={2}></Col>
                <Col span={20} className=''>
                    <Row className='mt-10'>

                        <Col span={2} ></Col>
                        <Col span={5} className='' >

                            <div className='border border-white rounded-sm shadow-xl bg-blue-500 h-140 px-4 py-4'> 
                                  <div>    <p className='font-bold text-white'>  Thông Tin Quản Trị </p></div>
                                  <div> 
                                        <button className='mt-4 border border-white bg-white rounded-sm px-2 py-1 cursor-pointer'
                                        onClick={() => {
                                          setinfouser(true) 
                                          setinfoproduct(false)
                                        }}
                                        >  Thông tin người dùng   </button>
                                  </div>
                                  <div> 
                                  <button className='mt-4 border border-white bg-white rounded-sm px-2 py-1 cursor-pointer'
                                                                          onClick={() => {
                                          setinfouser(false) 
                                          setinfoproduct(true)
                                        }}
                                  >  Thông tin  sản phẩm    </button>
                                  </div>
                            </div>

                        </Col>
                        <Col span={15} className='' >
                        <div className='border border-white rounded-sm shadow-xl bg-gray-200 h-140 px-4 py-4 w-220 ml-5'> 
                              {
                                infouser && ( 
                                  <div> 
                        
                        <div className='flex gap-1 cursor-pointer'> 
                              <PlusSquareOutlined style={{ fontSize: '50px', color: '#08c' }}/>
                              <p  > Thêm người dùng</p>
                              </div>

                              <div> 
                                   <p className='mt-4'> Danh sách các user</p>
                                   <div className='mt-4'> 
                                   
                                             
                                   <Table columns={columns} dataSource={data_demo} pagination={{ pageSize: 5 }} />
                                   </div>
                              </div>
                        
                        </div>
                                ) 
                              }

                              {
                                infoproduct && ( 
                                  <div> 
                        
                        <div className='flex gap-1 '> 
                              <PlusSquareOutlined style={{ fontSize: '50px', color: '#08c' }}/>
                              <p> Thêm sản phẩm</p>
                              </div>

                              <div> 
                                   <p className='mt-4'> Danh sách các sản phẩm</p>
                                   <div className='mt-4'> 
                                   
                                             
                                   <Table columns={columns_product} dataSource={product_data_demo} pagination={{ pageSize: 3 } } />
                                   </div>
                              </div>
                        
                        </div>
                                ) 
                              }

                        </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Col>
                <Col span={2}></Col>
            </Row>
    </div>   
  )
}

export default SystemAdminUser
