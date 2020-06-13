import {Divider, Avatar } from 'antd'
import '../public/components/author.css'
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://hawkkke.oss-cn-beijing.aliyuncs.com/fupo.jpg?Expires=1592061557&OSSAccessKeyId=TMP.3KgBed99GUJY8yj7CyVQ3Zjjd97Q8da6fVe6zgXabuMxvMyqS7SeL5ZHFxtVZqLYA64rrwcf439wuCgEwgGC7gSFAxjDpF&Signature=gJn95yrfHZuk3IfHP0a%2BhtuDUg8%3D" />
        <div className="author-introduction">
        基尼钛美俱乐部，专业从事篮球事业五十年，陪伴您一起享受篮球的乐趣。
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account"  src="https://github.com/1939108122"/>
        <Avatar size={28} icon="qq" className="account"/>
        <Avatar size={28} icon="wechat" className="account" />
        </div>
      </div>
    </div>
  )
}

export default Author