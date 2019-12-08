import React, { Component, SyntheticEvent } from 'react'
import { SEARCH_MODE, CREATE_MODE, ALL_TODO_FILTER, NEED_TODO_FILTER, COMPLETED_TODO_FILTER } from '../../utils/common'

interface Props {
  switchMode: Function,
  todoContentFilter: Function,
  mode: string,
  curFilter: string,
  filteredListContent: []
}
interface State {
  leftTodo: number
}

export default class OperateBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { switchMode, todoContentFilter, mode, curFilter } = this.props
    // console.log('switchMode >> ', switchMode);
    return (
      <div className="operate-field">
        <div className="left-operatei-field">
          <div className="add-search-field">
            <a href="#add" className={'show-add-btn ' + (mode === CREATE_MODE ? 'actived ' : '')} data-mode="create" onClick={() => switchMode(CREATE_MODE)}></a>
            <a href="#search" className={'show-search-btn ' + (mode === SEARCH_MODE ? 'actived ' : '')} data-mode="search" onClick={() => switchMode(SEARCH_MODE)}></a>
          </div>
          <div className="list-info-field">
            {
              this.props.filteredListContent.length < 1 ? 
              <span>Write down a first TODO note~</span>
              :
              <span>{this.props.filteredListContent.length} things left TODO</span>
            }
          </div>
        </div>
        <div className="list-filter-field">
          <a href="#all" className={'filter-item filter-all ' + (curFilter === ALL_TODO_FILTER ? 'actived ' : '')} onClick={() => todoContentFilter(ALL_TODO_FILTER)}>All</a>
          <a href="#todo" className={'filter-item filter-todo ' + (curFilter === NEED_TODO_FILTER ? 'actived ' : '')} onClick={() => todoContentFilter(NEED_TODO_FILTER)}>TODO</a>
          <a href="#completed" className={'filter-item filter-completed ' + (curFilter === COMPLETED_TODO_FILTER ? 'actived' : '')} onClick={() => todoContentFilter(COMPLETED_TODO_FILTER)}>Completed</a>
        </div>
      </div>
    )
  }
}
