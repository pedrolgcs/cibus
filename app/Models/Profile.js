'use strict'

const Model = use('Model')

class Profile extends Model {
  // relacionamento com user, de que um profile pertence a um user
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Profile
