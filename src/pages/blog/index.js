import React from 'react'
import { Route } from 'react-router-dom'
import BlogAdd from './add'
import BlogList from './list'
import './blog.less'

export default class Blog extends React.PureComponent {
  state = {
    str: 'Blog Component'
  }

  render() {
    const { str } = this.state

    return (
      <div class="blog-container">
        {str}
        <Route path="/blog/list" component={BlogList} />
        <Route path="/blog/add" component={BlogAdd} />
      </div>
    )
  }
}
