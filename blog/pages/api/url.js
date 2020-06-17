let url = 'http://127.0.0.1:7001/default/'
// let url = 'http://47.93.232.180:7001/default/'

let servicePath = {
  getArticleList: url + 'getArticleList',  //首页接口
  getArticleById: url + 'getArticleById/',  //文章详情页接口
  getTypeInfo: url + 'getTypeInfo' ,   //文章详情页接口
  getListById: url + 'getListById/'    //类别id接口
}

export default servicePath