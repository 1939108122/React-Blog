import React,{ useState } from 'react';
import 'antd/dist/antd.css'
import { Button, Card, Icon, Input, Spin, message} from 'antd'
import '../static/css/Login.css'
import servicePath from '../config/api'
import axios from 'axios'
function Login (props) {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const checkLogin = ()=> {   //登录时进行的操作（验证...）
    setIsLoading(true)
    if (!userName)
    {
      message.error('用户名不能为空！')
      setTimeout(()=> {
        setIsLoading(false)
      },500)
      return false
    }
    else if(!password)
    {
      message.error('密码不能为空！')
      setTimeout(()=> {
        setIsLoading(false)
      },500)
      return false
    }
    const dataProps = {
      'userName': userName,
      'password': password
    }
    axios({     //后台请求验证
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res=> {
        setIsLoading(false)
        if (res.data.data === '登录成功')
        {
          localStorage.setItem('openId',res.data.openId) //保存数据到本地
          props.history.push('/index')  //成功后跳转到首页
        }
        else{
          message.error('用户名或密码错误！')
        }
      }
    )
  }
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="heyhawk blog system" bordered style={{width:"400px"}}>
          {/* 输入用户名的输入框 */}
          <Input
            id="username"
            size="large"
            placeholder="Enter your userName"
            onChange={(e)=> {setUserName(e.target.value)}}
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} 
          />
          <br/><br/>
            {/* 输入用户名密码的输入框 */}
           <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            onChange={(e)=> {setPassword(e.target.value)}}
            prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>} 
          />
          <br/><br/>
          <Button type="primary" block size="large" onClick={checkLogin}>Login</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login