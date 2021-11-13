import React from 'react'
import './side-menu.less'

class SideMenu extends React.PureComponent {
  state = {
    str: 'SideMenu Component'
  }

  render() {
    const { str } = this.state

    return (
      <div>
        {str}
      </div>
    )
  }
}

export default SideMenu
