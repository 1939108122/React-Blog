import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/api'

const { confirm } = Modal;

function ArticleList (props) {
  const [ list, setList ] = useState([])

  useEffect(()=> {
    getList()
  }, [])

 const getList = () => {
  axios({     //请求文章列表
    method: 'get',
    url: servicePath.getArticleList,
    withCredentials: true
  }).then((res) => {
    setList(res.data.list)
    })
 }
 const delArticle = (id) => {
   confirm({
     title: '确定要删除这篇文章吗？',
     content: '点击确认按钮您将永久删除文章，是否确认？',
     onOk() {
      axios(servicePath.delArticle + id, {withCredentials: true}).then(
        res=> {
          message.success('文章删除成功！')
          getList()  //刷新列表
        }
      )
     },
     onCancel() {
       message.warning('您已取消删除')
     }
   })
 }

  const updateArticle = (id) => {
    props.history.push('/index/add/' + id)
  }
  return (
    <div>
      <List 
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={
          (item => (
            <List.Item>
              <Row className="list-div">
                <Col span={8}>
                  <b>{item.title}</b>
                </Col>
                <Col span={4}>
                  <b>{item.typeName}</b>
                </Col>
                <Col span={4}>
                  <b>{item.count}</b>
                </Col>
                <Col span={4}>
                  <b>{item.addTime}</b>
                </Col>
                <Col span={4}>
                  <Button type="primary"onClick={() => {updateArticle(item.id)}} >修改</Button>&nbsp;&nbsp;
                  <Button onClick={() => {delArticle(item.id)}}>删除</Button>
                </Col>
            </Row>
          </List.Item>
          ))
        }
      />
    </div>
  )
}

export default ArticleList