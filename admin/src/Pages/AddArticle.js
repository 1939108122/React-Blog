import React, { useState, useEffect } from 'react';
import marked from 'marked'
import { Row, Col, Select, Input, Button, DatePicker, message } from 'antd'
import '../static/css/AddArticle.css'
import servicePath from '../config/api'
import axios from 'axios'
const { Option } = Select
const { TextArea } = Input

function AddArticle (props) {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别

  useEffect(()=> {  //生命周期函数使用（一次）
    getTypeInfo()
    //获取文章ID
    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
    
  }, [])
  // 转换代码的一些设置
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  // 监听文章内容改变时对应预览内容转换内容并显示的事件
  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  // 监听文章简介改变时对应预览简介内容转换内容并显示的事件
  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo =() =>{  //获取文章类别函数
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then((res)=> {
      if (res.data.data === '没有登录')
      {
        localStorage.removeItem('openId')
        props.history.push('/')
      }
      else {
        setTypeInfo(res.data.data)
      }
    })
  }
  const selectChange = (value) =>{
    setSelectType(value)
  }
    // 保存文章时的检验及存入数据库
  const saveArticle = ()=>{
    if(!selectedType || selectedType === '请选择类型'){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }
    // 检验成功后存入数据库

    // let datetext= showDate.replace('-','/') //把字符串转换成时间戳
    // let date = (new Date(datetext).getTime())/1000
    // const dataProps={  //传递到接口的参数
    //   type_id: selectedType,
    //   title: articleTitle,
    //   article_content: articleContent,
    //   introduce: introducemd,
    //   addTime: date,
    //   view_count: 0
    // }
    let dataProps = {}
    dataProps.type_id = selectedType 
    dataProps.title = articleTitle
    dataProps.article_content =articleContent
    dataProps.introduce =introducemd
    let datetext= showDate.replace('-','/') //把字符串转换成时间戳
    dataProps.addTime =(new Date(datetext).getTime())/1000

    if (articleId === 0)
    {
      dataProps.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(res=> {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章添加成功')
          
        }
        else {
          message.error('文章添加失败')
        }
      })
    }
    else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(res=> {
        if (res.data.isSuccess) {
          // console.log(res.data)
          message.success('文章修改成功')
          
        }
        else {
          message.error('文章修改失败')
        }
      })
    }
  }
  // 根据id显示要修改的文章
  const getArticleById = (id)=>{
      axios(servicePath.getArticleById+id,{ 
          withCredentials: true,
      }).then(
          res=>{
              console.log(res.data.data)
              let articleInfo= res.data.data[0]
              setArticleTitle(articleInfo.title)
              setArticleContent(articleInfo.article_content)
              let html=marked(articleInfo.article_content)
              setMarkdownContent(html)
              setIntroducemd(articleInfo.introduce)
              let tmpInt = marked(articleInfo.introduce)
              setIntroducehtml(tmpInt)
              setShowDate(articleInfo.addTime)
              setSelectType(articleInfo.typeId)

          }
      )
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                size="large"
                placeholder="文章标题"
                onChange={(e)=> {setArticleTitle(e.target.value)}}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select size="large" defaultValue={selectedType} onChange={selectChange}>
              {
                typeInfo.map((item, index) => {
                  return (
                  <Option key={index} value={item.Id}>{ item.typeName }</Option>
                  )
                })
              }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={20}>
            <Col span={12}>
              <TextArea className="markdown-content"
                placeholder="文章内容"
                rows={35}
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html"
              dangerouslySetInnerHTML={{__html: markdownContent}}
              > 
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
              <br/><br/>
            </Col>
            <Col span={24}>
              <TextArea rows={4} placeholder="文章简介"
              value={introducemd}
              onChange={changeIntroduce}
              >
              </TextArea>
              <br/><br/>
              <div className="introduce-html"
                dangerouslySetInnerHTML={{__html: introducehtml}}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
              </div>
              <DatePicker
              size="large"
              placeholder="发布日期"
              onChange={(date, dateString)=> {setShowDate(dateString)}}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}


export default AddArticle