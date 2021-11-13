import React from 'react'
import './header.less'

class Header extends React.PureComponent {
  state = {
    str: 'Header Component'
  }

  render() {
    const { str } = this.state

    return (
      <div class="header-wrap">
        {str}
      </div>
    )
  }
}

export default Header
