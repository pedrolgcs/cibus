'use strict'

const Model = use('Model')

class Phone extends Model {
  restaurant () {
    return this.belongsTo('App/Models/Restaurant')
  }
}

module.exports = Phone
