import '../public/components/footer.css'
import moment from 'moment'
import { useEffect, useState } from 'react'
const Footer = () => {
  let startTime = new Date("2020/03/15 00:00:00")
  let [time, setTime] = useState({})

  useEffect(() => {
    let myTime = setInterval(function() {
      setTime(moment.duration(new Date() - startTime)._data)
    }, 1000)
    return () => {
      clearInterval(myTime)
    }
  })
  return (
    <>
      <div className="footer-div">
        <div>
          <span>本站已小心翼翼运行：</span>
          <span>{time.years} </span>年&nbsp;
          <span>{time.months} </span>月&nbsp;
          <span>{time.days} </span>天&nbsp;
          <span>{time.hours} </span>小时&nbsp;
          <span>{time.minutes} </span>分&nbsp;
          <span>{time.seconds} </span>秒&nbsp;
        </div>
        <div>Coding-By-Hawk</div>
        <div><a href="http://www.beian.miit.gov.cn/">赣ICP备20003679号</a></div>
      </div>
  </>
  )
}


export default Footer