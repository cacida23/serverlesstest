import React from 'react'

export default class BlogList extends React.PureComponent {
  state = {
    str: 'Blog List Component'
  }

  render() {
    const { str } = this.state

    return (
      <div class="blog-list-container">
        {str}
      </div>
    )
  }
}
