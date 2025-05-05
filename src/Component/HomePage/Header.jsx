import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { jwtDecode } from "jwt-decode";

const { Search } = Input;
const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // const { signup, setsignup} = useState(false)
  const navigate = useNavigate();
  const route_signup = () => {
    navigate('/signin')
  }
  const home = () => {
    navigate('/')
  }
  const systemadmin = () => {
    navigate('/system/admin')
  }
  const order = () => {
    navigate('/my-orders')
  }
  // const home = () => {
  //   navigate('/')
  // }
  let decoded = ''
  try {
    const token  = localStorage.getItem("access_token")
    if(token) {
      decoded = jwtDecode(token)

    }
  } catch(e) {
    console.log(e.message)
  }

  const delete_accesstoken = () => {
    localStorage.removeItem("access_token")
  }

  const is_admin = decoded.isAdmin;
  
  console.log("is_admin", is_admin)
 


  return (
    <div className='border-b border-b-gray-50 mt-2 shadow-sm'>
      <Row>
        <Col span={2}></Col>

        <Col span={4}>
          <div className='flex flex-col items-center space-x-2 cursor-pointer'
          onClick={() => {
            home()
          }}>
            <img className='h-15' src='../../public/LogoTiKi.png' alt='logo' />
            <p className='font-bold text-blue-700'>Tốt & Nhanh</p>
          </div>
        </Col>

        <Col span={10}>
          <Search
            placeholder="100% hàng thật"
            allowClear
            enterButton="Tìm Kiếm"
            size="medium"
          />
          <div className='flex gap-2 mt-2 text-gray-400'>
            <p>điện gia dụng</p>
            <p>xe cộ</p>
            <p>khỏe đẹp</p>
            <p>nhà cửa</p>
          </div>
        </Col>

        <Col span={8}>
          <div className='flex gap-5 ml-10 text-[15px] items-center relative'>
            {/* Trang chủ */}
            <div className='flex gap-2'>
              <HomeOutlined />
              <p className='cursor-pointer' onClick={() => {
                  home()
              }}>Trang chủ</p>
            </div>

            {/* Tài khoản có dropdown */}
            <div className='relative' ref={dropdownRef}>
            <div
                onClick={() => {
                  if (!decoded.id) {
                    route_signup();
                  } else {
                    setOpen(!open);
                  }
                }}
                className='flex gap-2 cursor-pointer items-center'
              >
                <UserOutlined />
                <p>Tài Khoản</p>


              </div>

              <div> 
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="/userinfo" className="block px-4 py-2 hover:bg-gray-100">
                        Thông tin tài khoản
                      </a>
                    </li>
                    <li>
                      <a href="" className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        delete_accesstoken()
                      }}
                      >
                        Đăng xuất
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        order()
                      }}
                      >
                        Đơn hàng của tôi
                      </a>
                    </li>

                    {
                      decoded?.isAdmin && ( 
                        <li>
                      <a  className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        systemadmin()
                      }}
                      >
                        Quản trị
                      </a>
                    </li>
                      )
                    }
                  </ul>
                </div>
              )}
              </div>


            </div>

            {/* Giỏ hàng */}
            <div className='flex gap-2'>
              <ShoppingCartOutlined />
              <p className='cursor-pointer'
              onClick={() => {
                navigate('/carts')
              }}>Giỏ Hàng</p>
            </div>
          </div>
        </Col>

        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default Header;
