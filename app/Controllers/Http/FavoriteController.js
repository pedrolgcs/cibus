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
  async index ({ response, auth }) {
    // const busca = await Favorite.query().where({ 'user_id': auth.user.id })
    // console.log(busca)
    try {
      const favorits = await Favorite.query()
        .where('user_id', auth.user.id)
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
  async store ({ request, response, auth }) {
    const data = request.only(['restaurant_id'])
    try {
      const favorit = await Favorite.create({...data, user_id: auth.user.id})
      return response.status(201).send(favorit)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
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
