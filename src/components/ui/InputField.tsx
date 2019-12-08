import React, { Component } from 'react'
import CreateInputBox from './CreateInputBox'
import SearchInputBox from './SearchInputBox'
import { SEARCH_MODE, CREATE_MODE } from '../../utils/common'
interface Props {
  createTodoItem: Function,
  searchInputChangeHandler: Function,
  queryContent: string,
  createContent: string,
  mode: string,
}
interface State {
  
}

export default class InputField extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // console.log('InputField constructor props >>> ', props)
  }
  shouldComponentUpdate(nextProps: Props, nextStates: State) {
    console.log('InputField shouldComponentUpdate nextProps: ', nextProps)
    return true
  }
  render() {
    const { mode } = this.props
    // console.log('in InputField render >>> ', mode)
    switch(mode){
      case SEARCH_MODE:
          return (
            <div className="todo-input-field">
              <SearchInputBox {...this.props} />
            </div>
          )
      case CREATE_MODE:
      default:
          return (
            <div className="todo-input-field">
              <CreateInputBox {...this.props} />
            </div>
          ) 
    }
  }
}
