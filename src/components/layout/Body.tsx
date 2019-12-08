import React, { Component } from 'react'
import ListContent from '../ui/ListContent'
import OperateBar from '../ui/OperateBar'

interface Props {
  switchMode: Function,
  todoContentFilter: Function,
  upateTodoListStatus: Function,
  uncompletedCount: number,
  mode: string,
  curFilter: string,
  filteredListContent: []
}
interface State {
  
}

export default class Body extends Component<Props, State> {
  constructor(props: Props){
    super(props)
  }
  state = {}

  render() {
    // console.log('Body props >> ', this.props)
    return (
      <div>
        <OperateBar {...this.props}/>
        <ListContent {...this.props} />
      </div>
    )
  }
}
