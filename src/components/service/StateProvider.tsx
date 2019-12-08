import React, { Component, ChangeEventHandler, ChangeEvent } from 'react'
import { SEARCH_MODE, CREATE_MODE, ALL_TODO_FILTER, NEED_TODO_FILTER, COMPLETED_TODO_FILTER } from '../../utils/common'
import { setChildrenProps, funcsBindWith } from '../../utils/util'
import debounce from '../../utils/debounce';

interface Props {}
interface State {
  mode: string, // 模式：create | search
  curFilter: string, // 当前过滤条件：全部，TODO，完成
  createContent: string, // 创建新 todo 项的输入框内容
  queryContent: string, // 搜索内容
  uncompletedCount: number, // 未完项成个数
  isSearching: boolean, // 是否在展示搜索结果中
  searchingResult: Array<ListItem>, // 搜索结果列表 copy，用于筛选过滤条件
  todoListFullContent: Array<ListItem>, // 所有数据
  filteredListContent: Array<ListItem> // 过滤后的数据列表
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
      createContent: '',
      uncompletedCount: 0,
      isSearching: false,
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
          state: 1,
          content: '做一个 React 小项目'
        },
        {
          id: 5,
          state: 0,
          content: '约上大家吃晚饭，时间要今晚定下来'
        }
      ],
      searchingResult: [],
      filteredListContent: []
    }
  }
  componentDidMount() {
    this.updateFilterList(ALL_TODO_FILTER)
    this.updateUncompletedCount();
  }
  componentDidUpdate(){}
  // 更新过滤器
  updateFilterList(type: string) {
    const { isSearching, queryContent } = this.state
    let filteredList = [];
    if (isSearching) {
      filteredList = this.getMatchedTodoItems(queryContent, type)
    } else {
      filteredList = this.getFilteredList(type);
    }
    console.log('filterList >>> ', filteredList)
    this.setState({
      curFilter: type,
      filteredListContent: filteredList
    })
  }
  // 获取对应过滤条件下的列表
  getFilteredList(type: string) {
    const { todoListFullContent, isSearching, searchingResult } = this.state
    const targetTodoList = /** isSearching ? searchingResult : **/ todoListFullContent
    const filterList = targetTodoList.filter((item: ListItem) => {
      switch(type) {
        case NEED_TODO_FILTER:
          return item.state === 0
        case COMPLETED_TODO_FILTER:
          return item.state === 1
        default:
          return true
      }
    })
    return filterList
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
    const { queryContent, curFilter } = this.state;
    // console.log(`switch mode to >>`, mode)
    this.setState({ 
      mode,
      isSearching: mode === SEARCH_MODE && !!queryContent
    }, () => {
      this.updateFilterList(curFilter)
    })
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
  // 搜索框内容输入处理
  searchInputChangeHandler = debounce((content: string) => {
    // console.log('searching content >>> ', content)
    const { curFilter } = this.state
    const searchResult = this.getMatchedTodoItems(content, curFilter);
    this.setState({
      queryContent: content,
      searchingResult: searchResult,
      filteredListContent: searchResult
    })
  }, 300, this)
  // 匹配 todo list 项内容
  getMatchedTodoItems(sContent: string, type: string) {
    const { todoListFullContent } = this.state
    let curFilteredList = todoListFullContent
    
    if (type !== ALL_TODO_FILTER) {
      curFilteredList = this.getFilteredList(type)
    }
    this.updateSearchBarStatus(!!sContent)
    // 为空直接返回
    if (!sContent){
      return curFilteredList
    }
    
    const searchingResult: Array<ListItem> = curFilteredList.filter(item => {
      return item.content.includes(sContent.trim())
    })
    return searchingResult
  }
  // 更新搜索框状态
  updateSearchBarStatus(status: boolean) {
    this.setState({
      isSearching: status
    })
  }
  // 更新 todo item 的状态
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
