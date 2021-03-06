'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi'
  }

  async getArticleList() {
    let sql ='SELECT article.Id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.addTime as addTime,' +
              'article.view_count as count,' +
              'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' + 
    'ORDER BY article.id DESC'

    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data: results}
  }

  async getArticleById() {
    let id = this.ctx.params.id
    let sql ='SELECT article.Id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.addTime as addTime,' +
              'article.article_content as article_content,' +
              'article.view_count as count,' +
              'type.typeName as typeName,'+
              'type.Id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE article.Id = '+ id 
            const result = await this.app.mysql.query(sql)
            this.ctx.body = {data: result}
  }
  // 得到类别和名称
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data: result}
  }

  // 根据类别 id获取文章列表
  async getListById() {
    let id = this.ctx.params.id
    let sql ='SELECT article.Id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.addTime as addTime,' +
              'article.article_content as article_content,' +
              'article.view_count as count,' +
              'type.typeName as typeName,'+
              'type.Id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE type.Id = '+ id 
            const result = await this.app.mysql.query(sql)
            this.ctx.body = {data: result}
  }
}


module.exports = HomeController;
