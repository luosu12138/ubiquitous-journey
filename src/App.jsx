import { useEffect, useState } from 'react';
import TodoList from './components/TodoList.jsx';
import './App.css';
import { Button, Input, DatePicker, message } from 'antd';
import moment from 'moment';

function App() {
  //修改网页标题
  useEffect(() => {
    document.title = 'Todo List'
  }, [])

  //创建消息API
  const [Message, contextHolder] = message.useMessage();

  //状态管理
  const [inputText, setInputText] = useState('');
  const [deadLine, setDeadLine] = useState(null);
  const [listData, setlistData] = useState([]);

  //事件处理
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  }

  const handleDeadLine = (date, dateString) => {
    setDeadLine(dateString);
  }

  const handleOnClick = () => {
    if (inputText && deadLine) {
      setlistData([
        ...listData,
        { id: moment(), task: inputText, date: deadLine }
      ]);
      setInputText('');
      setDeadLine(null);
    }
    else {
      Message.open({
        type: 'error',
        content: '请输入任务名称和截止时间'
      });
    }
  };
  //渲染函数
  return (
    <div>
      {contextHolder}
      <h1 id='title'>Todo List</h1>
      <div id='input'>
        <Input
          onChange={handleTextChange}
          value={inputText}
          placeholder='输入任务名称'
        />
      </div>
      <div id='DatePicker'>
        <DatePicker
          onChange={handleDeadLine}
          value={deadLine ? moment(deadLine, 'YYYY-MM-DD') : null}
          placeholder='选择截止时间'
        />
        <Button
          type='primary'
          onClick={handleOnClick}
          id='add'>
          添加
        </Button>
      </div>
      <div id='list'>
        <TodoList
          listData={listData}
          setListData={setlistData}
        />
      </div>
    </div>
  )
}

export default App;
