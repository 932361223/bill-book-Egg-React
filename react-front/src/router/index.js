import Data from '@/container/Data'
import User from '@/container/User'
import Home from '@/container/Home'
import Detail from '@/container/Detail'
import Login from '@/container/Login'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/detail",
    component: Detail
  }
];

export default routes