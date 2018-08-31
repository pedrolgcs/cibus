'use strict'

const Phone = use('App/Models/Phone')

/**
 * Resourceful controller for interacting with phones
 */
class PhoneController {
  /**
   * Show a list of all phones.
   * GET phones
   */
  async index ({ response, params }) {
    try {
      const phones = await Phone.query().where('restaurant_id', params.id)
      return response.status(200).send(phones)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new phone.
   * POST phones
   */
  async store ({ request, response, params }) {
    const data = request.only(['phone', 'message'])
    try {
      const phone = await Phone.create({...data, restaurant_id: params.id})
      return response.status(201).send(phone)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Update phone details.
   * PUT or PATCH phones/:id
   */
  async update ({ params, request, response }) {
    const data = request.only(['phone', 'message'])
    try {
      const phone = await Phone.findOrFail(params.id)
      phone.merge({...data})
      await phone.save()
      return response.status(201).send(phone)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a phone with id.
   * DELETE phones/:id
   */
  async destroy ({ params, response }) {
    const phone = await Phone.findOrFail(params.id)
    try {
      await phone.delete()
      return response.status(200).send(phone)
    } catch (error) {
      return response.send({ message: `${error}` })
    }
  }
}

module.exports = PhoneController
