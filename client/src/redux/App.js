import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Products from './components/Products';
import Cart from './components/Cart';
import Editproducts from './Editproducts';
import Addproducts from './components/Addproducts';

function App() {
  let BrowserRouter = createBrowserRouter(
    [
      {
        path:'',
        element:<RootLayout/>,
        children:
        [
          {
            path:'',
            element:<Home/>
          },
          {
            path:'/register',
            element:<Register/>
          },
          {
            path:'/login',
            element:<Login/>
          },
          {
            path:'/profile',
            element:<Profile/>,
            children:
            [
              {
                path:'/profile/products',
                element:<Products/>
              },
              {
                path:'/profile/cart',
                element:<Cart/>
              },
              {
                path:'/profile/addproducts',
                element:<Addproducts/>
              },
              {
                path:'/profile/editproducts',
                element:<Editproducts/>
              }
            ]
          }
        ]
      }
    ]
  )

  return <RouterProvider router={BrowserRouter}/>
}

export default App
