import React, { useEffect, useState } from "react";
import { Col, Row, Input, Alert } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../Component/HomePage/Header";

const AddProduct = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product/create`,
        data,
        {
          headers: {
            authorization: `authorization ${token}`
          },
        },
      );
      return res.data;
    },
  });


  useEffect(() => {
    if (mutation.isSuccess) {
      setTimeout(() => {
        navigate("/system/admin");
      }, 1000);
    }
  }, [mutation.isSuccess]);



  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const [type, settype] = useState("");
  const [countinStock, setcountinStock] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div>
      <Header />
      <Row>
        <Col span={6}></Col>
        <Col span={10}>
          <Row className="mt-10">
            <Col span={6}></Col>
            <Col span={16}>
              {mutation.isLoading && (
                <div>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                  />
                </div>
              )}

              {mutation.isSuccess && (
                <div className="mb-10">
                  <Alert
                    message="Cập nhật thành công"
                    description="Đang chuyển hướng về giao diện quản trị..."
                    type="success"
                    showIcon
                  />
                </div>
              )}
              {mutation.isError && (
                <Alert
                  message="Lỗi cập nhật"
                  type="error"
                  showIcon
                  className="mb-4"
                />
              )}
              <div className="rounded border border-gray-300 p-4 shadow-2xl w-250">
                <p className="text-2xl font-bold text-blue-700">
                  Giao diện thêm sản phẩm
                </p>
                <div className="flex-col">
                  <div className="m-2 flex">
                    <p className="flex-1/3">Tên sản phẩm</p>
                    <Input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Url</p>
                    <Input
                      value={url}
                      onChange={(e) => seturl(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Loại sản phẩmphẩm</p>
                    <Input
                      value={type}
                      onChange={(e) => settype(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Giá</p>
                    <Input
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </div>

                  <div className="m-2 flex">
                    <p className="flex-1/3"> Số hàng còn lại trong </p>
                    <Input value={countinStock}
                    onChange={(e) => setcountinStock(e.target.value)} />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3"> Mô tả </p>
                    <Input onChange={(e) => setdescription(e.target.value)} 
                        value={description}
                    />
                  </div>

                  <div>
                    <button
                      className="cursor-pointer rounded-sm border border-blue-600 bg-blue-600 p-1 text-white"
                      onClick={() => {
                        mutation.mutate({
                          name: name,
                          type: type,
                          price: price,
                          image: url,
                          description: description,
                          countinStock: countinStock,

                        });
                      }}
                    >
                      Tạo sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}></Col>
          </Row>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
};

export default AddProduct;
