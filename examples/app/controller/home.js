'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const list = await ctx.repo.UserConfig.find()
    ctx.body = list
  }

  async test() {
    const { ctx } = this;
    const list = await ctx.repo.Member.find()
    ctx.body = list
  }
}

module.exports = HomeController;
