import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Page/HomePage.jsx';
import SignIn from './Page/SignIn.jsx';
import SignUp from './Page/SignUp.jsx';
import ProductDetaiPage from './Page/ProductDetaiPage.jsx';
import UserInfo from './Page/UserInfo.jsx';
import SystemAdmin from './Page/SystemAdmin.jsx';
import EditUser from './Page/EditUser.jsx';
import Carts from './Page/Carts.jsx';
import Order from './Page/Order.jsx';
import MyOrder from './Page/MyOrder.jsx';
import GetAllOrderForMe from './Component/MyOrderComponent/GetAllOrderForMe.jsx';
import AddUserForAdmin from './Component/SignInComponent/AddUserForAdmin.jsx';
import EditProduct from './Page/EditProduct.jsx';
import AddProduct from './Page/AddProduct.jsx';
import { Result } from 'antd';
import ResultPage from './Component/ProductList/ResultPage.jsx';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: 'signup',
    element: <SignUp/>
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetaiPage/>
  },
  {
    path: '/userinfo',
    element: <UserInfo/>
  }, 
  {
    path: 'system/admin',
    element: <SystemAdmin/>
  }
  , 
  {
    path: '/system/admin/edit-user/:id',
    element: <EditUser/>
  }
  , 
  {
    path: '/system/admin/edit-product/:id',
    element: <EditProduct/>
  }
  , 
  {
    path: '/carts',
    element: <Carts/>
  }
  , 
  {
    path: '/order/:id',
    element: <Order/>
  },
  {
    path: '/my-orders/:id',
    element: <MyOrder/>
  },
  {
    path: '/my-orders',
    element: <GetAllOrderForMe/>
  }, 
  {
    path: '/system-admin/add-user/',
    element: <AddUserForAdmin/>
  },
  {
    path: '/system-admin/add-product/',
    element: <AddProduct/>
  }, 
  {
    path: '/result_page/:id',
    element: <ResultPage />
  }


  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />


  </QueryClientProvider>
  </StrictMode>,
)

