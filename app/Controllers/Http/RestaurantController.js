'use strict'

/**
 * Resourceful controller for interacting with restaurants
 */
class RestaurantController {
  /**
   * Show a list of all restaurants.
   * GET restaurants
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new restaurant.
   * POST restaurants
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single restaurant.
   * GET restaurants/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update restaurant details.
   * PUT or PATCH restaurants/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a restaurant with id.
   * DELETE restaurants/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RestaurantController
