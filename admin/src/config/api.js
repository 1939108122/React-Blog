let url = 'http://127.0.0.1:7001/admin/'
// let url = 'http://47.93.232.180:7001/admin/'

let servicePath = {
  checkLogin: url + 'checkLogin',  //首页接口
  getTypeInfo: url + 'getTypeInfo',  //文章类别接口
  addArticle: url + 'addArticle',  //添加文章
  updateArticle: url + 'updateArticle',  //修改文章
  getArticleList: url + 'getArticleList',  //文章列表
  delArticle: url + 'delArticle/',  //删除文章
  getArticleById: url + 'getArticleById/',  //根据ID获取文章
}

export default servicePath