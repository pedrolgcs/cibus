'use strict'

const Model = use('Model')

class Favorite extends Model {
  // retorna os restaurantes que tenham seus donos ativos
  static scopeActiveRestaurants (query) {
    return query.whereHas('restaurants.user', (builder) => {
      builder.where('active', true)
    })
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  restaurants () {
    return this.belongsTo('App/Models/Restaurant')
  }
  /*
    Digo ao model que não vou usar o timeStamps padrão
  */
  static get createdAtColumn () {
    return null
  }
  static get updatedAtColumn () {
    return null
  }
}

module.exports = Favorite
