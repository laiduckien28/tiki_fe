import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { Pagination } from 'antd';
import {  useQuery } from '@tanstack/react-query';
import { useNavigate, useParams  } from 'react-router-dom';
import Header from '../HomePage/Header';
const ResultPage = () => {
const token = localStorage.getItem("access_token");

  const { id } = useParams();
  console.log("params_search", id)


    const fnsearch = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product/search?q=${id}`);
    return res.json();
  };
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['fnsearch', id],
    queryFn: fnsearch 
  });
  if( isSuccess == true) {
  console.log("data_search", data)

  }



const navigate = useNavigate()
// console.log("Get-All-Product", data.data.message)
const array_all_product = data?.message
console.log("array_all_product", array_all_product)
const product_detail_id = (id) => {
  navigate(`/product-detail/${id}`)
}
  
  return (
    <div > 

    <Header />

    <div className='block sm:hidden'>               <Row>
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> */}

        <Col span={1}></Col>
        <Col span={21} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>      
        <div className='font-bold px-2 mt-1 text-[10px] text-black'> Kết Quả Tìm Kiếm </div>

        {
          isLoading &&         <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin 

className='ml-150'
/>} />
        }



        <div  className='grid grid-cols-2 gap-1'>
        {
            !array_all_product || array_all_product.length === 0  ? (
                <p className='font-bold text-blue-700 text-[13px] ml-3'> Không tìm thấy sản phẩm</p>
            ) : (
  array_all_product?.map((product) => (
      <div className='bg-white px-2 border-solid rounded ml-2 mr-2 mt-2 shadow-xl  relative'> 
        <img src={product.image} alt={product.name} 

          onClick={() => {
            console.log("id_product", product._id)
                        if( token == null ) {
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
            )
            
        }

        


        </div>

        </Col>
        <Col span={2}></Col>
        </Row>
</div>
        <div className='hidden sm:block'>               <Row>

        <Col span={6}></Col>
        <Col span={16} className=' border-white border-4 rounded-lg mt-5 inset-shadow-2xs bg-gray-100
'>      
        <div className='font-bold px-4 mt-2 text-2xl text-black'> Kết Quả Tìm Kiếm </div>
        {
          isLoading &&         <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin 

className='ml-150'
/>} />
        }



        <div  className='grid grid-cols-4 gap-4'>
        {
            !array_all_product || array_all_product.length === 0 ? (
                <div> 
                    <p className='font-bold text-blue-700 text-[15px] ml-4 mt-5'> Không tìm thấy sản phẩm</p>
                </div>
            ) : 
            (
                  array_all_product?.map((product) => (
      <div className='bg-white px-4 border-solid rounded mx-4 mt-4 my-4 shadow-xl'> 
        <img src={product.image} alt={product.name} 

          onClick={() => {
            console.log("id_product", product._id)
                        if( token == null ) {
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
            )
        }
        

        </div>

        </Col>
        <Col span={2}></Col>
        </Row>
</div>


    
    </div>

  )
}

export default ResultPage
