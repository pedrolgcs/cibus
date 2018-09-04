'use strict'

const Model = use('Model')

class Favorite extends Model {
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
}

module.exports = Favorite
