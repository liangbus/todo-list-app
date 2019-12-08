import React, { Component } from 'react'

interface Props {
  filteredListContent: []
}
interface State {
  
}
interface TodoItem {
  content: string,
  state: number
}
export default class ListContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const todoList = this.props.filteredListContent.map((todoItem: TodoItem, index) => {
      return (
        // 遍历需要增加 key
        <li className={'todo-list-item ' + (todoItem.state === 1 ? 'finished' : '')} key={index}>
          <input type="checkbox" className="item-checkbox" />
          <span>{todoItem.content}</span>
        </li>
      )
    })

    return (
      <div className="todo-list-content-field">
        <ul>
          {todoList}
        </ul>
      </div>
    )
  }
}
