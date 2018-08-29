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
      return response.status(500).send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response }) {
    const data = request.only([
      'name',
      'username',
      'email',
      'password',
      'phone'
    ])
    try {
      const user = await User.create(data)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, auth, response }) {
    try {
      const user = await User.findOrFail(params.id)
      if (user.id !== auth.user.id) {
        return response.status(401).send({ message: `Not authorized` })
      }
      return response.status(200).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, auth, request, response }) {
    const data = request.only([
      'name',
      'email',
      'password',
      'phone'
    ])
    try {
      const user = await User.findOrFail(params.id)
      if (user.id !== auth.user.id) {
        return response.status(401).send({ message: `Not authorized` })
      }
      user.merge({...data})
      await user.save()
      return response.status(201).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, auth, response }) {
    try {
      const user = await User.findOrFail(params.id)
      if (user.id !== auth.user.id) {
        return response.status(401).send({ message: `Not authorized` })
      }
      await user.delete()
      return response.status(200).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = UserController
