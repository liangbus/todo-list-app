import React, { Component } from 'react'
import { Header } from './Header'
import Body from './Body'
interface Props {
  actions?: any
  data?: any
}
interface State {}
export class TodoList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // console.log('todo list props ', props)
  }
  render() {
    const { actions = {}, data = {} } = this.props
    const { switchMode, todoContentFilter, createTodoItem, searchInputChangeHandler, upateTodoListStatus } = actions;
    const { mode, filteredListContent, curFilter, uncompletedCount, queryContent, createContent } = data
    // console.log('in Todo List ChangeMode', switchMode)
    return (
      <div className="todo-list-component">
        <Header { ...{ switchMode, createTodoItem, mode, searchInputChangeHandler, queryContent, createContent } }></Header>
        <Body {...{ switchMode, todoContentFilter, mode, uncompletedCount, curFilter, filteredListContent, upateTodoListStatus }}/>
      </div>
    )
  }
}