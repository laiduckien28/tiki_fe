import React, { useEffect, useState } from 'react'
import { Alert } from 'antd';

import { } from 'antd'
import { Input } from 'antd';
import HomePage from '../../Page/HomePage.jsx';
import { Col, Row} from 'antd';
import { CloseCircleFilled  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  useMutation
} from '@tanstack/react-query'
import axios from 'axios';
const SignUpComponent = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      const res =  axios.post(`${import.meta.env.VITE_API_URL}/api/user/signup`, data , {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("data", data)
      return res


    },
  })


  const [ username, setusername ] = useState('')
  const [ password, setpassword ] = useState('')
  const [ email, setemail ] = useState('')
  const [ phone, setphone ] = useState('')
  const [ address, setaddress ] = useState('')
  const [ confirmpassword, setcfpassword ] = useState('')



  const navigate = useNavigate()
  const backtohome = () => {
    navigate('/')
  }

  const login = () => {
    navigate('/signin')
  }

  useEffect(() => {
    if(mutation.isSuccess) {
      setTimeout(() => {
        login()
      }, 1000)
    }
  }, [mutation.isSuccess])

  return (
    <div className="relative" >

    <div > 
        <HomePage/>
    </div>

    

    <div className="absolute top-50  " > 

    <div className='block sm:hidden'>     <Row>

      <Col span={1}></Col>
      
      <Col span={22} >

      {
        mutation.isSuccess ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng kí thành công"
      description="Đang chuyển hướng sang màn hình đăng nhập"
      type="success"
      showIcon
    />
      </div>
        ) : null
      }

      {
        mutation.isError ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng kí khôngkhông thành công"
      description="Vui Lòng Kiểm Tra Lại Thông Tin Đăng Kí "
      type="error"
      showIcon
    />
      </div>
        ) : null
      }



      <div className='flex border border-gray-100 shadow-sm rounded-xl  bg-white justify-between relative p-3'> 

      <div className="absolute -top-4 -right-4 text-gray-500  text-3xl p-1 cursor-pointer z-10"
      onClick={() => {
        backtohome()
      }}>

<CloseCircleFilled/>
</div>
      <div className='flex-2'> 
      <div> 
        <p className='font-bold text-[13px]'> Xin chào</p>
        <p className='text-[12px]'> Đăng nhập hoặc Tạo tài khoản</p>
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Họ tên" 
        onChange={(e) => {
          setusername(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Số điện thoại" 
                onChange={(e) => {
                  setphone(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Email của bạn" 
              onChange={(e) => {
          setemail(e.target.value)
        }} size='small' /> 
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Địa chỉ" 
                      onChange={(e) => {
          setaddress(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Mật khâủ" 
        onChange={(e) => {
          setpassword(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-1 text-[10px]'> 
      <Input placeholder="Xác Nhận Mật Khẩu" 
        onChange={(e) => {
          setcfpassword(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-2 items-center'> 
      
        <button className='border border-red-600 bg-red-600 text-white px-1 py-1 rounded text-[13px]'
        onClick={() => {
          mutation.mutate(
          {
            name: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            confirmpassword: confirmpassword
          }
        ),
        console.log("mutation", mutation)
        
        
        }}> 
        Đăng Kí
        </button>
      </div>

      <div className='flex text-[12px] gap-1'> 
      <p> Bạn đã có tài khoản?</p>
      <p className='text-red-500 font-bold cursor-pointer text-[12px]' onClick={() => {
          login()
          
      }}> Đăng Nhập </p>
      </div>


      
      </div>


      <div className='flex-1'> 
      
      <img src='https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png'/>
      </div>




      </div>


      </Col>
      <Col span={1}></Col>
    </Row></div>




    <div className='hidden sm:block'>    <Row>

      <Col span={10}></Col>
      
      <Col span={8} >

      {
        mutation.isSuccess ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng kí thành công"
      description="Đang chuyển hướng sang màn hình đăng nhập"
      type="success"
      showIcon
    />
      </div>
        ) : null
      }

      {
        mutation.isError ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng kí khôngkhông thành công"
      description="Vui Lòng Kiểm Tra Lại Thông Tin Đăng Kí "
      type="error"
      showIcon
    />
      </div>
        ) : null
      }



      <div className='flex border border-gray-100 shadow-2xl rounded-2xl px-4 py-4 gap-3 bg-white justify-between relative'> 

      <div className="absolute -top-4 -right-4 text-gray-500  text-3xl p-1 cursor-pointer z-10"
      onClick={() => {
        backtohome()
      }}>

<CloseCircleFilled/>
</div>
      <div className='flex-2'> 
      <div> 
        <p className='font-bold text-[20px]'> Xin chào</p>
        <p className='text-[15px]'> Đăng nhập hoặc Tạo tài khoản</p>
      </div>
      <div className='py-1'> 
      <Input placeholder="Họ tên" 
        onChange={(e) => {
          setusername(e.target.value)
        }}
      />
      </div>
      <div className='py-1'> 
      <Input placeholder="Số điện thoại" 
                onChange={(e) => {
                  setphone(e.target.value)
        }}
      />
      </div>
      <div className='py-1'> 
      <Input placeholder="Email của bạn" 
              onChange={(e) => {
          setemail(e.target.value)
        }} />
      </div>
      <div className='py-1'> 
      <Input placeholder="Địa chỉ" 
                      onChange={(e) => {
          setaddress(e.target.value)
        }}
      />
      </div>
      <div className='py-1'> 
      <Input placeholder="Mật khâủ" 
        onChange={(e) => {
          setpassword(e.target.value)
        }}
      />
      </div>
      <div className='py-1'> 
      <Input placeholder="Xác Nhận Mật Khẩu" 
        onChange={(e) => {
          setcfpassword(e.target.value)
        }}
      />
      </div>
      <div className='py-2 items-center'> 
      
        <button className='border border-red-600 bg-red-600 text-white px-1 py-1 rounded'
        onClick={() => {
          mutation.mutate(
          {
            name: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            confirmpassword: confirmpassword
          }
        ),
        console.log("mutation", mutation)
        
        
        }}> 
        Đăng Kí
        </button>
      </div>

      <div className='flex text-[15px] gap-2'> 
      <p> Bạn đã có tài khoản?</p>
      <p className='text-red-500 font-bold cursor-pointer' onClick={() => {
          login()
          
      }}> Đăng Nhập </p>
      </div>


      
      </div>


      <div className='flex-1'> 
      
      <img src='https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png'/>
      </div>




      </div>


      </Col>
      <Col span={4}></Col>
    </Row> </div>


    </div>




    </div>
  )
}

export default SignUpComponent
