'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * create a new user
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
   * show user by ID
   * GET users/:id
   */
  async show ({ params, response, auth }) {
    try {
      const user = await User.findOrFail(params.id)
      // verifico se o usuário está olhando ele mesmo
      if (user.id !== auth.user.id) {
        return response.status(403).send({ message: `Not authorized` })
      }
      await user.loadMany(['roles', 'permissions'])
      return response.status(200).send(user)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * list all users
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response, auth }) {
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
      // verifico se o usuário está atualizando ele mesmo
      if (user.id !== auth.user.id) {
        return response.status(403).send({ message: `Not authorized` })
      }
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
}

module.exports = UserController
