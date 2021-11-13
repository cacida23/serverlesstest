import { observable, action } from 'mobx'
import axios from 'axios'

class UserList {
  @observable userList

  constructor() {
    this.userList = []
  }

  @action
  async getUserList() {
    const { data: res = {} } = await axios({
      method: 'get',
      url: '/api/user/list',
    })
    const { code, data, message } = res

    if (code === 200) {
      this.userList = data
    }
  }
}

export default new UserList()
