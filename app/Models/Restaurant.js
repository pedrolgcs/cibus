'use strict'

const Model = use('Model')

class Restaurant extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Restaurant
