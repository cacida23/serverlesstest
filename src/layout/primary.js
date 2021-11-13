import React from 'react'
import { Layout } from 'antd'
import SideMenu from '_c/layout/SideMenu'
import HeaderComp  from '_c/layout/Header'
import styles from './primary.less'

const { Header, Sider, Content } = Layout
const headerStyle = {
  pading: 0,
  backgroundColor: '#fff',
}
const contentStyle = {
  margin: '24px 16px',
  padding: 24,
  backgroundColor: '#fff',
  minHeight: 290,
}

class PrimaryLayout extends React.Component {
  state = {
    collapsed: false,
  }

  render() {
    const { children } = this.props
    const { collapsed } = this.state

    return (
      <Layout class={styles.mainStyle}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div class="logo" />
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <HeaderComp />
          </Header>
          <Content style={contentStyle}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
