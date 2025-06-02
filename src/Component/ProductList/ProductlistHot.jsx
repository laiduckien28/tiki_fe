import React, {  useState } from 'react'
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate  } from 'react-router-dom';
const ProductlistHot = () => {
  const limit = 8;
  const [ page, setpage ] = useState(1)
  const getAllProduct = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product/getall?limit=${limit}&page=${page}`);
    return res.json();
  };
  const { data, isLoading } = useQuery({
    queryKey: ['get_all_product', page],
    queryFn: getAllProduct,
    keepPreviousData: true, 
  });

const token = localStorage.getItem("access_token");

console.log("data", data?.data?.totalproduct)
const totalpage = data?.data?.totalproduct || 50;

const navigate = useNavigate()
// console.log("Get-All-Product", data.data.message)
const array_all_product_test = data?.data?.message || [];
const array_all_product = array_all_product_test.filter(p => p.rating >= 4.9);

const product_detail_id = (id) => {
  navigate(`/product-detail/${id}`)
}
  
  return (
    <div > 

      <div className='block sm:hidden'>
      
      
              <Row>

        <Col span={1}></Col>
        <Col span={21} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100  
'>      
        <div className='font-bold px-2 mt-1 text-[10px] text-black '> Hàng Chất Lượng Cao </div>
        {
          isLoading &&         <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin 

className='ml-150'
/>} />
        }



        <div  className='grid grid-cols-2 gap-1 '>

        {
  array_all_product?.map((product) => (
      <div className='bg-white px-2 border-solid rounded ml-2 mr-2 mt-2 shadow-xl  relative'> 
        <img src={product.image} alt={product.name} 

          onClick={() => {
            console.log("id_product", product._id)
                        if( token!= null ) {
                product_detail_id(product._id)
            } 
            
            else {
              navigate('/signin')
            }
          }} className='cursor-pointer rounded-sm pt-4 max-h-full '
        />
        <div className='py-1 ' > 
          <p className='text-[12px]'>{product.name}</p>
          <p className='font-bold py-1 text-red-600 text-[11px]'>{product.price.toLocaleString()}đ</p>
          <p className='text-[10px]'>Made in Japan</p>
        </div>
    </div>
  ))
}
        </div>
        <div className='my-5 flex justify-center'> 
        <Pagination defaultCurrent={1} size={"small"} pageSize={8} total={totalpage}
                onChange={(current) => {
                  setpage(current), 
                  console.log("current", current)
                }}  className='gap-2'
                
        />
        </div>
        </Col>
        <Col span={1}></Col>
        </Row>
      
       </div>

      <div className='hidden sm:block'> 
              <Row>
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> */}

        <Col span={6}></Col>
        <Col span={16} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>      
        <div className='font-bold px-4 mt-2 text-2xl text-black'> Hàng Chất Lượng Cao </div>
        {
          isLoading &&         <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin 

className='ml-150'
/>} />
        }



        <div  className='grid grid-cols-4 gap-4'>

        {
  array_all_product?.map((product) => (
      <div className='bg-white px-4 border-solid rounded mx-4 mt-4 my-4 shadow-xl'> 
        <img src={product.image} alt={product.name} 

          onClick={() => {
            console.log("id_product", product._id)
                        if( token != null ) {
                product_detail_id(product._id)
            } 
            
            else {
              navigate('/signin')
            }
          }} className='cursor-pointer rounded-sm pt-4'
        />
        <div className='py-2'> 
          <p>{product.name}</p>
          <p className='font-bold py-1 text-red-600'>{product.price.toLocaleString()}đ</p>
          <p>Made in Japan</p>
        </div>
    </div>
  ))
}
        </div>
        <div className='my-5 flex justify-center'> 
        <Pagination defaultCurrent={1} pageSize={8} total={totalpage}
                onChange={(current) => {
                  setpage(current), 
                  console.log("current", current)
                }}
                
        />
        </div>
        </Col>
        <Col span={2}></Col>
        </Row>
      </div>
    
    </div>

  )
}

export default ProductlistHot
