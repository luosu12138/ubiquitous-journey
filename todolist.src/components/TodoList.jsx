import React, { useState } from "react";
import '../App.css';
import { List, Checkbox } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import moment from "moment";

function TodoList({ listData, setListData }) {
  const [existedIds, setExistedIds] = useState([]);
  //添加待办任务(改变待办任务状态)
  const onChange = (id) => {
    if (!existedIds.includes(id)) {
      setExistedIds([
        ...existedIds, id
      ]);
    }
    else {
      setExistedIds(existedIds.filter(item => item !== id));
    }
  };
  //删除待办任务
  const onDelete = (id) => {
    setListData(
      listData.filter(item => item.id !== id)
    );
  };

  //渲染函数
  return (
    <List
      size='large'
      dataSource={listData}
      renderItem={(item, index) => (
        <List.Item>
          <span
            id="item"
            style={{
              textDecoration: existedIds.includes(item.id) ? 'line-through' : 'none',
              color: moment(item.date) >= moment() ? 'black' : 'red'
            }}
          >
            {item.task}
            <br />
            截止时间：{item.date}
          </span>
          <span>
            <Checkbox onChange={() => onChange(item.id)} />
            <br />
            <DeleteOutlined id="delete" onClick={() => onDelete(item.id)} />
          </span>
        </List.Item>
      )}
    />
  )
}

export default TodoList;