import {Divider, Avatar } from 'antd'
import '../public/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" />
        <div className="author-introduction">
        基尼钛美俱乐部，专业从事篮球事业五十年，陪伴您一起享受篮球的乐趣。
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={ <GithubOutlined /> } className="account" />
        <Avatar size={28} icon={ <QqOutlined /> } className="account" />
        <Avatar size={28} icon={ <WechatOutlined /> } className="account" />
        </div>
      </div>
    </div>
  )
}

export default Author