import React, { Component, ChangeEventHandler, ChangeEvent } from 'react'
import { SEARCH_MODE, CREATE_MODE, ALL_TODO_FILTER, NEED_TODO_FILTER, COMPLETED_TODO_FILTER } from '../../utils/common'
import { setChildrenProps, funcsBindWith } from '../../utils/util'
import debounce from '../../utils/debounce';

interface Props {
  
}
interface State {
  mode: string,
  curFilter: string,
  queryContent: string,
  todoListFullContent: Array<ListItem>,
  filteredListContent: Array<ListItem>
}

interface ListItem {
  state: number,
  content: string
}

export default class StateProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mode: CREATE_MODE,
      curFilter: ALL_TODO_FILTER,
      queryContent: '',
      todoListFullContent: [
        {
          state: 0,
          content: '周三去参加朋友生日会'
        },
        {
          state: 0,
          content: '周日参加英语沙龙'
        },
        {
          state: 1,
          content: '本周内完成照片冲洗'
        },
        {
          state: 0,
          content: '做一个 React 小项目'
        }
      ],
      filteredListContent: []
    }
  }
  componentWillMount() {
    this.updateFilterList(ALL_TODO_FILTER)
  }
  componentDidUpdate(){}
  updateFilterList(type: string) {
    const { todoListFullContent } = this.state
    const filterList = todoListFullContent.filter((item: ListItem) => {
      switch(type) {
        case NEED_TODO_FILTER:
          return item.state === 0
        case COMPLETED_TODO_FILTER:
          return item.state === 1
        default:
          return true
      }
    })
    console.log('filterList >>> ', filterList)
    this.setState({
      curFilter: type,
      filteredListContent: filterList
    })
  }

  render() {
    const children = setChildrenProps(this.props.children, {
      data: this.state,
      actions: funcsBindWith(this, ['switchMode', 'todoContentFilter', 'createTodoItem', 'searchInputChangeHandler'])
    });
    // console.log(`children >>> `, children);
    return (
      <div>
        {children}
      </div>
    )
  }
  // 切换输入框类型，新增/搜索
  switchMode(mode: string) {
    console.log(`switch mode to >>`, mode)
    this.setState({ mode })
  }
  // 待办内容过滤器
  todoContentFilter(type: string) {
    const { curFilter } = this.state
    console.log('todoContentFilter >>> ', type)
    if(curFilter === type) return false
    this.updateFilterList(type)
  }
  // 创建 todo 项
  createTodoItem(content: string) {
    const { todoListFullContent } = this.state
    console.log('createTodoItem~~~~ ', content)
    todoListFullContent.push({
      content: content,
      state: 0
    })
    this.setState({
      todoListFullContent
    }, () => {
      this.updateFilterList(this.state.curFilter)
    })
  }
  searchInputChangeHandler = debounce((content: string) => {
    console.log('searching content >>> ', content)
  }, 500, this)
  
}
