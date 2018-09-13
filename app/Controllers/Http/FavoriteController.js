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
    // verifico se já existe esse registro no banco
    const verify = await Favorite.query().where({user_id: auth.user.id} && {restaurant_id: data})
    if (verify.length > 0) {
      return response.status(204).send()
    }
    try {
      const favorit = await Favorite.create({...data, user_id: auth.user.id})
      return response.status(201).send(favorit)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Delete a favorite with id.
   * DELETE favorites/:id
   */
  async destroy ({ params, response }) {
    try {
      const favorit = await Favorite.findOrFail(params.id)
      await favorit.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = FavoriteController
