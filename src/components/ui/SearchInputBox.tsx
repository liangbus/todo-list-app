import React, { Component, ChangeEvent } from 'react'

interface Props {
  searchInputChangeHandler: Function
}
interface State {
  searchContent: string
}

export default class SearchInputBox extends Component<Props, State> {
  state = {
    searchContent: ''
  }
  onInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { searchInputChangeHandler } = this.props
    const searchContent = e.target.value
    // console.log('onInputValueChange value >>>> ', value)
    this.setState({ searchContent }, () => {
      searchInputChangeHandler(searchContent)
    })
  }
  render() {
    return (
      <input
        autoFocus
        type="text"
        value={this.state.searchContent}
        placeholder="Search your todo list."
        onChange={ this.onInputValueChange.bind(this) }
      />
    )
  }
}
