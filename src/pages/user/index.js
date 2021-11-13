import React from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import AddComp from './add'
import ListComp from './list'
import styles from './user.less'

export default class User extends React.PureComponent {
  state = {
    str: 'User Component'
  }

  render() {
    const { str } = this.state

    return (
      <div class={classNames("user-container", styles.userContainer)}>
        {str}
        <div>
          <Route path="/user/add" component={AddComp} />
          <Route path="/user/list" component={ListComp} />
        </div>
      </div>
    )
  }
}
