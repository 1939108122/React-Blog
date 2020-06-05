import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List, Breadcrumb, Icon } from 'antd'


export default function myList() {
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
                <div className="list-title">{item.title}</div>
                <div className="list-icon">
                  <span><Icon type="calendar" />2020-6-2</span>
                  <span><Icon type="folder" />视频教程</span>
                  <span><Icon type="fire" />9999人</span>
                </div>
                <div className="list-context">{item.context}</div>
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
