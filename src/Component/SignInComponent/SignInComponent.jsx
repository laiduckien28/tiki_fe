import React, { useEffect, useState } from 'react'
import { } from 'antd'
import { Input } from 'antd';
import HomePage from '../../Page/HomePage';
import { Col, Row} from 'antd';
import {  CloseCircleFilled  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Alert } from 'antd';

const SignInComponent = () => {
  const navigate = useNavigate()
  const backtohome = () => {
    navigate('/')
  }

  const signup = () => {
    navigate('/signup')
  }

  const home = () => {
    navigate('/')
  }

    const [ password, setpassword ] = useState('')
    const [ email, setemail ] = useState('')






  const mutation = useMutation({
    mutationFn: async (data) => {
      const res =  await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signin`, data , {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return res.data
    },
  })


  
  
  useEffect(() => {
    if(mutation.isSuccess) {
      setTimeout(() => {
        home()
      }, 1000),
      console.log("Access Token:", mutation.data?.message?.access_token);
      localStorage.setItem("access_token", mutation.data?.message?.access_token)
    }

    else if (mutation.isError) {
      console.log("An error occurred:", mutation.error.message)
    }


  },[ mutation.isSuccess, mutation.isError])



  return (
    <div className="relative" >


    <div > 
        <HomePage/>
    </div>

    

    <div className="absolute top-50 w-full" > 
    <div className='block sm:hidden'>     <Row>
      <Col span={1}></Col>
      <Col span={22} >
      {
        mutation.isSuccess ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng nhập thành công"
      description="Đang chuyển hướng sang trang chủ"
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
      message="Đăng kí không thành công"
      description="Vui Lòng Kiểm Tra Lại Thông Tin Đăng NhậpNhập "
      type="error"
      showIcon
    />
      </div>
        ) : null
      }
      <div className='flex border border-gray-100 shadow-2xl rounded-sm p-3 bg-white justify-between relative'> 

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

      <div className='py-1'> 
      <Input placeholder="Email của bạn" onChange={(e) => {
        setemail(e.target.value) 
      }} size='small'/>
      </div>
      <div className='py-1'> 
      <Input placeholder="Mật khâủ" 
        onChange={(e) => {

          setpassword(e.target.value)
        }} size='small'
      />
      </div>
      <div className='py-2 items-center'> 
      
        <button className='border border-red-600 bg-red-600 text-white px-1 py-1 rounded text-[13px]'
        onClick={() => {
          mutation.mutate({
            email: email,
            password: password
          })
        }
        }

        

        
        > 
        Đăng Nhập
        </button>
      </div>
      <div className='flex text-[13]'> 
      <p> Quên mật khẩu?</p>
      </div>
      <div className='flex text-[13] gap-2'> 
      <p> Bạn chưa có tài khoản?</p>
      <p className='text-red-600 cursor-pointer' onClick={() => {
        signup()
      }}> Đăng Kí </p>
      </div>

      <div> 
      <p className='flex text-[9px]'> 
      Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng và Chính sách bảo mật thông tin cá nhân của Tiki
      </p>
      </div>
      
      </div>


      <div className='flex-1'> 
      
      <img src='https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png'/>
      </div>




      </div>


      </Col>
      <Col span={1}></Col>
    </Row></div>


        <div className='hidden sm:block'>     <Row>
      <Col span={10}></Col>
      <Col span={8} >
      {
        mutation.isSuccess ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng nhập thành công"
      description="Đang chuyển hướng sang trang chủ"
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
      description="Vui Lòng Kiểm Tra Lại Thông Tin Đăng NhậpNhập "
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
      <Input placeholder="Email của bạn" onChange={(e) => {
        setemail(e.target.value)
      }}/>
      </div>
      <div className='py-1'> 
      <Input placeholder="Mật khâủ" 
        onChange={(e) => {

          setpassword(e.target.value)
        }}
      />
      </div>
      <div className='py-2 items-center'> 
      
        <button className='border border-red-600 bg-red-600 text-white px-1 py-1 rounded'
        onClick={() => {
          mutation.mutate({
            email: email,
            password: password
          })
        }
        }

        

        
        > 
        Đăng Nhập
        </button>
      </div>
      <div className='flex text-[15px]'> 
      <p> Quên mật khẩu?</p>
      </div>
      <div className='flex text-[15px] gap-2'> 
      <p> Bạn chưa có tài khoản?</p>
      <p className='text-red-600 cursor-pointer' onClick={() => {
        signup()
      }}> Đăng Kí </p>
      </div>

      <div> 
      <p className='flex text-[12px]'> 
      Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng và Chính sách bảo mật thông tin cá nhân của Tiki
      </p>
      </div>
      
      </div>


      <div className='flex-1'> 
      
      <img src='https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png'/>
      </div>




      </div>


      </Col>
      <Col span={4}></Col>
    </Row></div>
    </div>




    </div>
  )
}

export default SignInComponent
