import React, { Component } from 'react'
import { TodoList } from './components/layout/TodoList'
import StateProvider from './components/service/StateProvider'
import EventHandler from './components/service/EventHandler'
import './style/index.scss'

interface Props {}

export class App extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <StateProvider>
        <EventHandler>
          <TodoList></TodoList>
        </EventHandler>
      </StateProvider>
    )
  }
}