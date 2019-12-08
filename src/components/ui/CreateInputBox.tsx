import React, { Component } from 'react'

interface Props {
  createTodoItem: Function,
}
interface State {
  value: string
}

export default class CreateInputBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  onKeyupHandler(e: any) {
    const { createTodoItem } = this.props
    if(e.keyCode === 13) {
      // 按 ENTER => 新增
      createTodoItem(this.state.value)
      this.setState({
        value: ''
      })
    }
  }
  onInputValueChange(e: any) {
    const value = e.target.value
    // console.log('onInputValueChange value >>>> ', value)
    this.setState({ value })
  }
  render() {
    // const { createTodoItem } = this.props
    const { value } = this.state
    return (
      <input
        autoFocus
        type="text"
        value={value}
        placeholder="The next todo things is? Press [ENTER] to add one."
        onKeyUp={this.onKeyupHandler.bind(this)}
        onChange={this.onInputValueChange.bind(this)}
      />
    )
  }
}
