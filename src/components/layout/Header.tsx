import React, { Component } from 'react'
import InputField from '../ui/InputField';
interface Props {
  switchMode: Function,
  createTodoItem: Function,
  searchInputChangeHandler: Function,
  mode: string
}
interface State {
  
}
export class Header extends Component<Props, State> {
  render() {
    const { mode } = this.props
    console.log('in Header render >> ', mode)
    return (
      <div className="header-field">
        <div className="title-field">
          <span>Write something TODO ~</span>
        </div>
        <InputField {...this.props}/>
      </div>
    )
  }
}