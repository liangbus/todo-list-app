import React, { Component } from 'react'

interface Props {
  filteredListContent: [],
  upateTodoListStatus: Function
}
interface State {
  
}
interface TodoItem {
  id: number,
  content: string,
  state: number
}
export default class ListContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  shouldComponentUpdate(nextProps: Props, nextStates: State) {
    console.log('OperateBar shouldComponentUpdate nextProps: ', nextProps)
    return true
  }
  checkboxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const dataset = e.target.dataset
    const { upateTodoListStatus } = this.props
    const id = dataset.id && (+dataset.id) || -1
    console.log(`checkboxChangeHandler isChecked >>> `, dataset)
    upateTodoListStatus(id, e.target.checked)
  }
  render() {
    const todoList = this.props.filteredListContent.map((todoItem: TodoItem, index) => {
      return (
        // 遍历需要增加 key
        <li className={'todo-list-item ' + (todoItem.state === 1 ? 'finished' : '')} key={todoItem.id}>
          <label htmlFor={`checkbox-${todoItem.id}`}>
            <input
              id={`checkbox-${todoItem.id}`}
              type="checkbox"
              className="item-checkbox"
              checked={todoItem.state === 1 ? true : false}
              data-id={todoItem.id}
              onChange={this.checkboxChangeHandler.bind(this)}
            />
            <span>{todoItem.content}</span>
          </label>
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
