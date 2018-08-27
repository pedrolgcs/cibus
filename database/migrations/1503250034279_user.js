'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 50).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 50).notNullable()
      table.boolean('active').defaultTo(false).notNullable()
      table.enu('user_type', ['admin', 'client', 'user']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
