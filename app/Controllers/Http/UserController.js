'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ response }) {
    try {
      const users = await User.all()
      return response.send(users)
    } catch (error) {
      return response.send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    try {
      const user = await User.create(data)
      return response.send(user)
    } catch (error) {
      return response.send({ message: `${error}` })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, request, response }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
