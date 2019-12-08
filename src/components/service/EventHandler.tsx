import React, { Component } from 'react'
import { setChildrenProps, funcsBindWith } from '../../utils/util'

interface Props {
  
}
interface State {
  
}

export default class EventHandler extends Component{
  state = {}
  componentWillMount(){
    // window.addEventListener('keydown', this.keydownHandler.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }
  keydownHandler(e: any){
    console.log(e)
  }

  render() {
    const children = setChildrenProps(this.props.children, this.props);
    return (
      <div>
        {children}
      </div>
    )
  }
}
