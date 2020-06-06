import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List, Icon } from 'antd'
import { useState } from 'react'
import servicePath from './api/url'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import '../public/pages/index.css'

export default function Home(list) {
  const [myList, setList] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>} 
            itemLayout="vertical"
            dataSource={myList}
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
                <div className="list-context"
                dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                >
                    
                </div>
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

Home.getInitialProps = async () => {
  const promise = new Promise ((resolve)=> {
    axios.get(servicePath.getArticleList).then(
      (res)=> {
        console.log('---------', res.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}