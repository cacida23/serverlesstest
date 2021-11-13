import React from 'react'
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom'
import LoadableComponent from '_c/loadable'

const Home = LoadableComponent(() => import('_p/home'))

class AppRouter extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/home">Home</Link></li>
        </ul>
        <div>
          {/* Switch 只显示一个组件，加上exack表示精准匹配 */}
          {/* 如果有二级路由，不要添加 exact 会匹配不到子路由 */}
          <Switch>
            <Route exact path="/home" component={Home} />
            {/* <Route exact path="*" component={404} /> 如果需要 404 页面 */}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
