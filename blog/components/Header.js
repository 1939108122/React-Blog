import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import servicePath from '../pages/api/url'
import axios from 'axios'
import '../public/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'


const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(()=> {
    const fetchData = async ()=> {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          return res.data.data
        }
      )
      setNavArray(result)  //赋值
    }
    fetchData()  //调用函数
  }, [])

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/index')
    }
    else {
      Router.push('/list?id='+e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">热情</span>
          <span className="header-txt">若未变，哪管它沧桑变化</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <Icon type="home" />
                首页
            </Menu.Item>
            {
              navArray.map(item=> {
                return (
                  <Menu.Item key={item.Id} >
                    <Icon type={item.icon} />
                      {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header