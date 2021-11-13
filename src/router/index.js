import React from 'react'
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom'
import LoadableComponent from '_c/loadable'

const Home = LoadableComponent(() => import('_p/home'))
const Blog = LoadableComponent(() => import('_p/blog'))
const Resume = LoadableComponent(() => import('_p/resume'))
const User = LoadableComponent(() => import('_p/user'))

class AppRouter extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/resume">Resume</Link></li>
        </ul>
        <div>
          {/* Switch 只显示一个组件，加上exack表示精准匹配 */}
          {/* 如果有二级路由，不要添加 exact 会匹配不到子路由 */}
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route exact path="/resume" component={Resume} />
            <Route path="/user" component={User} />
            {/* <Route exact path="*" component={404} /> 如果需要 404 页面 */}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
