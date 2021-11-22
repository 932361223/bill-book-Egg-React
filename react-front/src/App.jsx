import React, { useEffect, useState, Fragment, useMemo } from 'react'
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom"
import routes from '@/router'

import NavBar from '@/components/NavBar';

import { ConfigProvider } from 'zarm'

import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
function App () {
  const location = useLocation()
  console.log(location);
  const { pathname } = location

  const needNav = ['/', '/data', '/user']

  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return (
    <Fragment>
      <ConfigProvider locale={zhCN} primaryColor="#1890ff">
        <Switch>
          {
            routes.map(route => <Route exact key={route.path} path={route.path}>
              <route.component />
            </Route>)
          }
        </Switch>
      </ConfigProvider>
      <NavBar showNav={showNav} />
    </Fragment>
  )

}

export default App