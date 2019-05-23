'use strict'

const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Test",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true
      },
      group_id: {
        type: "int",
        unique: true
      },
      member_id: {
        type: "int",
        unique: true
      },
      push_channel: {
        type: "varchar"
      },
      created_at: {
        type: "datetime",
        nullable: true
      },
      updated_at: {
        type: "datetime",
        nullable: true
      }
    }
})