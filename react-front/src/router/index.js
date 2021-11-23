import Data from '@/container/Data'
import User from '@/container/User'
import Home from '@/container/Home'
import Detail from '@/container/Detail'
import Login from '@/container/Login'
import UserInfo from '@/container/UserInfo'
import About from '@/container/About'
import Account from '@/container/Account'

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
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/Account",
    component: Account
  }
];

export default routes