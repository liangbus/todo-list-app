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
  uncompletedCount: number,
  todoListFullContent: Array<ListItem>,
  filteredListContent: Array<ListItem>
}

interface ListItem {
  id: number,
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
      uncompletedCount: 0,
      todoListFullContent: [
        {
          id: 1,
          state: 0,
          content: '周三去参加朋友生日会'
        },
        {
          id: 2,
          state: 0,
          content: '周日参加英语沙龙'
        },
        {
          id: 3,
          state: 1,
          content: '本周内完成照片冲洗'
        },
        {
          id: 4,
          state: 0,
          content: '做一个 React 小项目'
        }
      ],
      filteredListContent: []
    }
  }
  componentWillMount() {
    this.updateFilterList(ALL_TODO_FILTER)
    this.updateUncompletedCount();
  }
  componentDidUpdate(){}
  // 更新过滤器
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
  // 未完成项目个数
  updateUncompletedCount() {
    const { todoListFullContent } = this.state
    const count = todoListFullContent.reduce((acc: number, next: ListItem) => {
      return acc + (next.state === 0 ? 1 : 0)
    }, 0)
    this.setState({
      uncompletedCount: count
    })
  }
  render() {
    const children = setChildrenProps(this.props.children, {
      data: this.state,
      actions: funcsBindWith(this, ['switchMode', 'todoContentFilter', 'createTodoItem', 'searchInputChangeHandler', 'upateTodoListStatus'])
    });
    // console.log(`children >>> `, children);
    return (
      <div>
        {children}
      </div>
    )
  }
  // 生成 id
  generateId() {
    const { todoListFullContent } = this.state
    const lastTodoItem = todoListFullContent.slice(-1).pop()
    return lastTodoItem && (lastTodoItem.id + 1) || 1
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
      id: this.generateId(),
      content: content,
      state: 0
    })
    this.setState({
      todoListFullContent
    }, () => {
      this.updateFilterList(this.state.curFilter)
      this.updateUncompletedCount();
    })
  }
  searchInputChangeHandler = debounce((content: string) => {
    console.log('searching content >>> ', content)
    const searchResult = this.getMatchedTodoItems(content);
    this.setState({
      filteredListContent: searchResult
    })
  }, 300, this)
  // 匹配 todo list 项内容
  getMatchedTodoItems(sContent: string) {
    const { filteredListContent } = this.state
    if (!sContent) return this.state.todoListFullContent
    const resList: Array<ListItem> = filteredListContent.filter(item => {
      return item.content.includes(sContent)
    })
    return resList
  }
  upateTodoListStatus(id: number, isCompleted: boolean) {
    console.log(`id > ${id}   isChecked > ${isCompleted} `)
    const { todoListFullContent } = this.state
    const updatedList = todoListFullContent.map(item => {
      if(item.id === id) {
        item.state = isCompleted ? 1 : 0
      }
      return item
    })
    console.log('updated list >> ', updatedList);
    this.setState({
      todoListFullContent: updatedList
    }, () => {
      this.updateUncompletedCount();
    })
  }
}
