import React, {  useState } from 'react'
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate  } from 'react-router-dom';
const ProductAll = () => {
  const limit = 8;
  const [ page, setpage ] = useState(1)
  const getAllProduct = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await fetch(`http://localhost:3001/api/product/getall?limit=${limit}&page=${page}`);
    return res.json();
  };
  const { data, isLoading } = useQuery({
    queryKey: ['get_all_product', page],
    queryFn: getAllProduct,
    keepPreviousData: true, 
  });


console.log("data", data)
const navigate = useNavigate()
// console.log("Get-All-Product", data.data.message)
const array_all_product = data?.data?.message
console.log("array_all_product", array_all_product)
const product_detail_id = (id) => {
  navigate(`/product-detail/${id}`)
}
  
  return (
    <div > 
    
        <Row>
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> */}

        <Col span={6}></Col>
        <Col span={16} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>      
        <div className='font-bold px-4 mt-2 text-2xl text-black'> Gợi ý hôm nay </div>
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
            product_detail_id(product._id)
          }} className='cursor-pointer rounded-sm pt-4'
        />
        <div className='py-2'> 
          <p>{product.name}</p>
          <p className='font-bold py-1 text-red-600'>{product.price}</p>
          <p>Made in Japan</p>
        </div>
    </div>
  ))
}
        </div>
        <div className='my-5 flex justify-center'> 
        <Pagination defaultCurrent={1} total={50} pageSize={8} 
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

  )
}

export default ProductAll
