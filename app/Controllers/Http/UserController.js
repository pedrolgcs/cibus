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
  async index ({ response, auth }) {
    // usando o ACL no controller
    // const u = await auth.getUser()
    // console.log(await u.can('update'))
    try {
      const users = await User.query()
        .with('roles')
        .with('permissions')
        .fetch()
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
    const { roles, permissions, ...data } = request.only([
      'name',
      'username',
      'email',
      'password',
      'phone',
      'roles',
      'permissions'
    ])
    try {
      const user = await User.create(data)
      if (roles) {
        await user.roles().attach(roles)
      }
      if (permissions) {
        await user.permissions().attach(permissions)
      }
      await user.loadMany(['roles', 'permissions'])

      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)
      await user.loadMany(['roles', 'permissions'])
      return response.status(200).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response }) {
    const { roles, permissions, ...data } = request.only([
      'name',
      'username',
      'email',
      'password',
      'phone',
      'roles',
      'permissions'
    ])
    try {
      const user = await User.findOrFail(params.id)
      user.merge({...data})
      await user.save()
      if (roles) {
        await user.roles().sync(roles)
      }
      if (permissions) {
        await user.permissions().sync(permissions)
      }
      await user.loadMany(['roles', 'permissions'])
      return response.status(201).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = UserController
