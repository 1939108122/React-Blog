let url = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: url + 'checkLogin',  //首页接口
  getTypeInfo: url + 'getTypeInfo',  //文章类别接口
  addArticle: url + 'addArticle',  //添加文章
}

export default servicePath