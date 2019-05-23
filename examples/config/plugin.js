'use strict';

const path = require('path')

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  typeorm: {
    enable: true,
    package: 'egg-typeorm-js'
  }
};
