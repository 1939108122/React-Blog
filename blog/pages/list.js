import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb, Icon } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import servicePath from './api/url'

export default function myList(mylist) {
  const [list, setList ] = useState(mylist.data)
  useEffect(()=> {
    setList(mylist.data)
  })
  return (
    <>
      <Head>
        <title>列表</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>} 
            itemLayout="vertical"
            dataSource={list}
            renderItem={(item)=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/detail', query: {id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" />{item.addTime}</span>
                  <span><Icon type="folder" />{item.typeName}</span>
                  <span><Icon type="fire" />{item.count}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
            />
        </Col>
        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}


myList.getInitialProps = async (context) => {
  let id = context.query.id

  const promise = new Promise ((resolve)=> {
    axios.get(servicePath.getListById + id).then(
      (res)=> {
        console.log('---------', res)
        resolve(res.data)
      }
    )
  })
  return await promise
}