import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import { inject, observer } from 'mobx-react'

@inject("UserList") // 注入 mobx-store 中的 UserList
@withRouter // 注入 router 功能
@observer // 将实例加入加入观察队列
class List extends React.PureComponent {
  addUser = () => {
    const { history } = this.props

    history.push('/user/add?name=123')
  }

  componentDidMount() {
    const { UserList } = this.props

    UserList.getUserList()
  }

  render() {
    const { UserList } = this.props
    const { userList: list } = UserList

    return (
      <div>
        <h2>User List Page</h2>
        <h3>组件：{UserList.name}</h3>
        <Button onClick={this.addUser}>添加用户</Button>
        <hr/>
        <ol>
          {list.map((_, idx) => (
            <li key={idx}> -> {_.user_name}</li>
          ))}
        </ol>
      </div>
    )
  }
}

export default List
