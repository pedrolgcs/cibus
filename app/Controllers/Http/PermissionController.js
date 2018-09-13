'use strict'

const Permission = use('Permission')

class PermissionController {
  // lits all permissions
  async index ({ response }) {
    try {
      const permissions = await Permission.all()
      return response.send(permissions)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }
  // create permission
  async store ({ request, response }) {
    const data = request.only(['name', 'slug', 'description'])
    try {
      const permission = await Permission.create(data)
      return response.status(201).send(permission)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }
  // show permission id
  async show ({ params, response }) {
    try {
      const permission = await Permission.findOrFail(params.id)
      return response.status(200).send(permission)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
  // update permission
  async update ({ request, response, params }) {
    const data = request.only(['name', 'slug', 'description'])
    try {
      const permission = await Permission.findOrFail(params.id)
      permission.merge(data)
      await permission.save()
      return response.status(201).send(permission)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }
  // delete permissions
  async destroy ({ response, params }) {
    try {
      const permission = await Permission.findOrFail(params.id)
      await permission.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = PermissionController
