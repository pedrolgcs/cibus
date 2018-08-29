'use strict'

const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.string('logo').nullable()
      // working
      table.time('opening_time').notNullable()
      table.time('closing_time').notNullable()
      // delivery
      table.boolean('delivery').notNullable().defaultTo(true)
      table.string('delivery_price').nullable().defaultTo('Combinar')
      table.boolean('payment_card').notNullable()
      table.text('notice').nullable()
      // adress
      table.decimal('latitude', 9, 6).nullable()
      table.decimal('longitude', 9, 6).nullable()
      table.string('city', 150).notNullable()
      table.string('neighborhood', 150).notNullable()
      table.string('street').notNullable()
      table.string('number', 20).notNullable()
      table.string('complement').nullable()
      // social network
      table.string('social_facebook').nullable()
      table.string('social_instagram').nullable()
      // FK users
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
