import React, { useEffect, useState } from 'react'
import { Alert } from 'antd';
import { Checkbox } from 'antd';

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
import SystemAdminUser from '../UserInfoComponent/SystemAdminUser.jsx';
import Header from '../HomePage/Header.jsx';
const AddUserForAdmin = () => {
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
  const [ isadmin, setisadmin ] = useState(false)



  const navigate = useNavigate()
//   const backtohome = () => {
//     navigate('/')
//   }

  const admin = () => {
    navigate('/system/admin')
  }

  useEffect(() => {
    if(mutation.isSuccess) {
      setTimeout(() => {
        admin()
      }, 1000)
    }
  }, [mutation.isSuccess])

  return (
    <div className="relative" >

    <div > 
        <Header/>    </div>

    

    <div className="absolute top-50 w-full " > 
    <Row>

      <Col span={10}></Col>
      
      <Col span={8} >

      {
        mutation.isSuccess ? ( 
          <div className='mb-10'> 
      
      <Alert
      message="Đăng kí thành công"
      description="Đang chuyển hướng sang màn hình quản trị"
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
        admin()
      }}>

<CloseCircleFilled/>
</div>
      <div className='flex-2'> 
      <div> 
        <p className='font-bold text-[20px]'> Giao diện tạo tài khoản dành cho admin</p>
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

      <div className='py-1'> 
            <p> Role </p>
            <Checkbox 
            checked = {isadmin == true}
            onChange={(e) => {
                
                setisadmin(e.target.checked)
            }}> Admin </Checkbox>
            <Checkbox 
            checked = {isadmin == false}
            onChange={(e) => {
                setisadmin(!e.target.checked)
            }}> User</Checkbox>
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
            confirmpassword: confirmpassword,
            isadmin: isadmin
          }
        ),
        console.log("mutation", mutation)
        
        
        }}> 
        Tạo tài khoản
        </button>
      </div>




      
      </div>


      <div className='flex-1'> 
      
      <img src='https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png'/>
      </div>




      </div>


      </Col>
      <Col span={4}></Col>
    </Row>
    </div>




    </div>
  )
}

export default AddUserForAdmin
