import React, { Component } from 'react'

interface Props {
  createTodoItem: Function,
  createContent: string
}
interface State {
  value: string
}

export default class CreateInputBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.createContent
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
        placeholder="Press [ENTER] to add new one."
        onKeyUp={this.onKeyupHandler.bind(this)}
        onChange={this.onInputValueChange.bind(this)}
      />
    )
  }
}
