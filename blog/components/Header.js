import '../public/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, DribbbleOutlined } from '@ant-design/icons'

const Header = () => {
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">基尼钛美俱乐部,</span>
          <span className="header-txt">专注篮球训练</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                首页
            </Menu.Item>

            <Menu.Item key="video" icon={<YoutubeOutlined />}>
                视频
            </Menu.Item>

            <Menu.Item key="basketball" icon={<DribbbleOutlined />}>
                篮球
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header