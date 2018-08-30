'use strict'

const Model = use('Model')

class Restaurant extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  phones () {
    return this.hasMany('App/Models/Phone')
  }
}

module.exports = Restaurant
