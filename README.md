# egg-typeorm

[Typeorm](https://typeorm.io/) plugin for Egg.js

*Note: This plugin just for integrate Typeorm(used JavaScript) into Egg.js, more documentation please visit https://typeorm.io/.*


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-typeorm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-typeorm
[travis-image]: https://img.shields.io/travis/eggjs/egg-typeorm.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-typeorm
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-typeorm.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-typeorm?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-typeorm.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-typeorm
[snyk-image]: https://snyk.io/test/npm/egg-typeorm/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-typeorm
[download-image]: https://img.shields.io/npm/dm/egg-typeorm.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-typeorm

<!--
Description here.
-->

## Install

```bash
$ npm i egg-typeorm-js --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.typeorm = {
  enable: true,
  package: 'egg-typeorm-js',
};
```

```js
// {app_root}/app/entities/user.js
'use strict'

const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true
      },
      member_id: {
        type: "int",
        unique: true
      },
      name: {
        type: "varchar"
      }
    }
})
```

```js
// {app_root}/app/controller/member.js

'use stric'

async find() {
  const { ctx } = this
  const list = await ctx.repo.User.find() // entity会根据文件名加载到ctx.repo的属性上
  ctx.body = list
}
```

## Configuration

1、单个链接配置

```js
// {app_root}/config/config.default.js
exports.typeorm = {
  client: {
    "type": "mysql",
    "host": "",
    "port": 3306,
    "username": "",
    "password": '',
    "database": "",
    "synchronize": true,
    "logging": false,
  }
};
```

单个数据库配置时，entity的文件在{app_root}/app/entites下

2、多个连接配置

```js
// {app_root}/config/config.default.js
exports.typeorm = {
  clients: {
    "db1": {
      "name": "db1",
      "type": "mysql",
      "host": "",
      "port": 3306,
      "username": "",
      "password": '',
      "database": "",
      "synchronize": true,
      "logging": false,
      "baseDir": "entities/db1"
    },
    "db2": {
      "name": "db2",
      "type": "mysql",
      "host": "",
      "port": 3306,
      "username": "",
      "password": '',
      "database": "",
      "synchronize": true,
      "logging": false,
      "baseDir": "entities/db2"
    },
  }
};
```

多个连接配置时，需要制定name和entities的路径，默认在{app_root}/app/entites下

## Example
Please open an issue [here](https://github.com/lvwxx/egg-typeorm/tree/master/examples).
<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/lvwxx/egg-typeorm/issues).

## License

[MIT](LICENSE)
