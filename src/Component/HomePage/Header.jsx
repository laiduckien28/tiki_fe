import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { jwtDecode } from "jwt-decode";
import MenuDivider from 'antd/es/menu/MenuDivider';

const { Search } = Input;
const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className='border-b border-b-gray-50 mt-2 shadow-sm' >

        {/* Mobile */}
        <div className="block sm:hidden py-2 ">
      <Row justify={'center'} align={'middle'}>
        <Col span={1}></Col>

        <Col span={8} className=''>
          <Search
            allowClear
            size="small" style={{ width:'120px'}}
          />

        </Col>

        <Col span={14} className='ml-2'>
          <div className='flex text-[10px] items-center relative ml-1'>
            <div className='flex gap-1 sm:gap-2  '>
              <HomeOutlined />
              <p className='cursor-pointer text-[10px] ' onClick={() => {
                  home()
              }}>Trang chủ</p>
            </div>

            <div className='relative' ref={dropdownRef}>
            <div
                onClick={() => {
                  if (!decoded.id) {
                    route_signup();
                  } else {
                    setOpen(!open);
                  }
                }}
                className='flex  gap-1  cursor-pointer items-center ml-1'
              >
                <UserOutlined />
                <p  className='text-[10px]' > Tài Khoản</p>


              </div>

              <div> 
              {open && (
                <div className="absolute right-0 mt-2 w-30 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-1 text-[10px] text-gray-700">
                    <li>
                      <a href="/userinfo" className="block px-4 py-1 hover:bg-gray-100">
                        Thông tin tài khoản
                      </a>
                    </li>
                    <li>
                      <a href="" className="block px-4 py-1 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        delete_accesstoken()
                        navigate('/signin')
                      }}
                      >
                        Đăng xuất
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-4 py-1 text-red-600 hover:bg-gray-100"
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
                      <a  className="block px-4 py-1 text-red-600 hover:bg-gray-100"
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

            <div className='flex gap-1 sm:gap-2  ml-1'>
              <ShoppingCartOutlined />
              <p className='cursor-pointer text-[10px]'
              onClick={() => {
                navigate('/carts')
              }}>Giỏ Hàng</p>
            </div>
          </div>
        </Col>

        <Col span={1}></Col>
      </Row>
        </div>



        {/* PC */}
        <div className="hidden sm:block">


              <Row justify={'center'} align={'middle'}>
        <Col span={2}></Col>

        <Col span={4} className='borde'>
          <div className='cursor-pointer mt-1 mr-1'
          onClick={() => {
            home()
          }}>
            <img className='scale-60' src='../../public/LogoTiKi.png' alt='logo' />
          </div>
        </Col>

        <Col span={9} className=''>
          <Search
            allowClear
            size="medium" enterButton="Tìm Kiếm" style={{width:"100%"}}
          />
          {/* <div className='flex mt-1 text-gray-400 xl:text-[15px] text-[10px] xl:font-bold xl:gap-3'>
            <p>điện gia dụng</p>
            <p>xe cộ</p>
            <p>khỏe đẹp</p>
            <p>nhà cửa</p>
          </div> */}
        </Col>

        <Col span={7}>
          <div className='flex items-center relative ml-10 align-middle'>
            <div className='flex gap-2 align-middle'>
              <HomeOutlined />
              <p className='cursor-pointer text-[15px] ' onClick={() => {
                  home()
              }}>Trang chủ</p>
            </div>

            <div className='relative' ref={dropdownRef}>
            <div
                onClick={() => {
                  if (!decoded.id) {
                    route_signup();
                  } else {
                    setOpen(!open);
                  }
                }}
                className='flex  gap-2 cursor-pointer items-center ml-2'
              >
                <UserOutlined />
                <p  className='text-[15px]' > Tài Khoản</p>


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
                        navigate('/signin')
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

            <div className='flex gap-2  ml-2'>
              <ShoppingCartOutlined />
              <p className='cursor-pointer text-[15px]'
              onClick={() => {
                navigate('/carts')
              }}>Giỏ Hàng</p>
            </div>
          </div>
        </Col>

        <Col span={2}></Col>
      </Row>
        </div>


    </div>
  );
};

export default Header;
