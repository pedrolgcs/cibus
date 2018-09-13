'use strict'

const Role = use('Role')

class RoleController {
  // retur all roles
  async index ({ response }) {
    try {
      const roles = await Role.query()
        .with('permissions')
        .fetch()
      return response.status(200).send(roles)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }
  // create role
  async store ({ request, response }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions'
    ])
    try {
      const role = await Role.create(data)
      if (permissions) {
        await role.permissions().attach(permissions)
      }
      await role.load('permissions')
      return response.status(201).send(role)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }
  // show role
  async show ({ response, params }) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.load('permissions')
      return response.status(200).send(role)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
  // update role
  async update ({ request, response, params }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions'
    ])
    try {
      const role = await Role.findOrFail(params.id)
      role.merge(data)
      await role.save()
      if (permissions) {
        await role.permissions().sync(permissions)
      }
      await role.load('permissions')
      return response.status(201).send(role)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }
  async destroy ({ response, params }) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.delete()
      return response.status(200).send(role)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = RoleController
