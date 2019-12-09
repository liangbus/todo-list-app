import React, { Component, ChangeEvent } from 'react'

interface Props {
  searchInputChangeHandler: Function,
  queryContent: string
}
interface State {
  searchContent: string
}

export default class SearchInputBox extends Component<Props, State> {
  state = {
    searchContent: this.props.queryContent
  }
  shouldComponentUpdate(nextProps: Props, nextStates: State) {
    if(nextProps.queryContent.trim() === this.state.searchContent) {
      return false
    }
    console.log('SearchInputBox shouldComponentUpdate nextProps: ', nextProps)
    return true
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
        placeholder="Search your todo item."
        onChange={ this.onInputValueChange.bind(this) }
      />
    )
  }
}
