import {Divider, Avatar, Tooltip, Tag } from 'antd'
import imgeUrl from './images'
import '../public/components/author.css'
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src={imgeUrl.kobe}/>
        <div className="author-introduction">
          <div>基尼钛美俱乐部</div>
          <div>专业从事篮球二十年</div>
          <div className="Tag-style">
            <Tag color="magenta">crossover</Tag>
            <Tag color="cyan">终结者</Tag>
            <Tag color="green">花式扣篮</Tag>
          </div>
          <div className="Tag-style">
            <Tag color="gold">经典拉杆</Tag>
            <Tag color="purple">果冻上篮</Tag>
          </div>
          <div className="Tag-style">
          <Tag color="orange">只给九分</Tag>
          </div>
        <Divider>社交账号</Divider>
        <Tooltip title="https://github.com/1939108122">
          <a href="https://github.com/1939108122"><Avatar size={28} icon="github" className="account"  /></a>
        </Tooltip>
        <Tooltip title="QQ 1939108122">
          <Avatar size={28} icon="qq" className="account"/>
        </Tooltip>
        <Tooltip title="wechat 13677904470">
          <Avatar size={28} icon="wechat" className="account" />
        </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Author