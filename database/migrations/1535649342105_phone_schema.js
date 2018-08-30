'use strict'

const Schema = use('Schema')

class PhoneSchema extends Schema {
  up () {
    this.create('phones', (table) => {
      table.increments()
      table.string('phone', 20).notNullable()
      table.boolean('message').notNullable()
      table
        .integer('restaurant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('phones')
  }
}

module.exports = PhoneSchema
