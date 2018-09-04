'use strict'
const Favorite = use('App/Models/Favorite')
/**
 * Resourceful controller for interacting with favorites
 */
class FavoriteController {
  /**
   * Show a list of all favorites.
   * GET favorites
   */
  async index ({ params, response }) {
    try {
      const favorits = await Favorite.query()
        .where('user_id', params.id)
        .ActiveRestaurants()
        .with('restaurants')
        .fetch()
      return response.status(200).send(favorits)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new favorite.
   * POST favorites
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single favorite.
   * GET favorites/:id
   */
  async show ({ params, request, response }) {
  }

  /**
   * Update favorite details.
   * PUT or PATCH favorites/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a favorite with id.
   * DELETE favorites/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FavoriteController
