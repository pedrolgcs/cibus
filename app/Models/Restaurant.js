'use strict'

const Model = use('Model')

class Restaurant extends Model {
  // seleciona os restaurantes que tem seu proprietário ativo
  static scopeActiveUser (query) {
    return query.whereHas('user', (builder) => {
      builder.where('active', true)
    })
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  phones () {
    return this.hasMany('App/Models/Phone')
  }
}

module.exports = Restaurant
