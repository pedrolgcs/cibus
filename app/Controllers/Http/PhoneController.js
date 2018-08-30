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
  async index ({ response }) {
    try {
      const phones = await Phone.all()
      return response.status(200).send(phones)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new phone.
   * POST phones
   */
  async store ({ request, response }) {
  }

  /**
   * Update phone details.
   * PUT or PATCH phones/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a phone with id.
   * DELETE phones/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PhoneController
