import React, { useEffect, useState } from "react";
import { Col, Row, Input, Alert } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../Component/HomePage/Header";
import { Checkbox } from "antd";

const EditUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  const token = localStorage.getItem("access_token");
  const getdetailuser = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/getuser/${id}`,
      {
        method: "GET",
        headers: {
          token: `authorization ${token}`,
        },
      },
    );
    return await result.json();
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update-user/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
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

  const { data, error } = useQuery({
    queryKey: ["get_data_user_detail", id],
    queryFn: getdetailuser,
  });

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [sdt, setsdt] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState(false);

//   const [stateadmin, setstateadmin] = useState(false);
//   const [stateuser, setstateuser] = useState(false);
  useEffect(() => {
    if (data?.message?.data?.[0]) {
      const user = data.message.data[0];
      setusername(user.name || "");
      setemail(user.email || "");
      setsdt(user.phone || "");
      setaddress(user.address || "");
      setpassword(user.password || "");
      setrole(user.isadmin)
    }
  }, [data]);

  console.log("role", role);

  if (error)
    return <Alert message="Không thể lấy thông tin người dùng" type="error" />;

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
              <div className="rounded border border-gray-300 p-4 shadow-2xl">
                <p className="text-2xl font-bold text-blue-700">
                  Chỉnh sửa thông tin userr
                </p>
                <div className="flex-col">
                  <div className="m-2 flex">
                    <p className="flex-1/3">Họ & Tên</p>
                    <Input
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Email</p>
                    <Input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Số điện thoại</p>
                    <Input
                      value={sdt}
                      onChange={(e) => setsdt(e.target.value)}
                    />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3">Địa chỉ</p>
                    <Input
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div className="m-2 flex">
                    <p className="flex-1/3"> Mật khẩu</p>
                    <Input onChange={(e) => setpassword(e.target.value)} />
                  </div>
                  <div className="m-2 flex">
                    <p className="flex-1/3"> Role</p>
                    <div className="flex-1/3">
                      <Checkbox 
                            checked={ role == true}

                            onChange={(e) => {
                                setrole(e.target.checked)
                            }}                        
                      >
                        Admin
                      </Checkbox>
                    </div>
                    <div className="flex-1/3">
                      <Checkbox 
                      checked={ role == false}
                                                  onChange={(e) => {
                                                    setrole(!e.target.checked)
                            }}
                      >
                        User
                      </Checkbox>
                    </div>
                  </div>

                  <div>
                    <button
                      className="cursor-pointer rounded-sm border border-blue-600 bg-blue-600 p-1 text-white"
                      onClick={() => {
                        mutation.mutate({
                          name: username,
                          email: email,
                          phone: sdt,
                          address: address,
                          password: password,
                          isadmin: role,
                        });
                      }}
                    >
                      Lưu thay đổi
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

export default EditUser;
