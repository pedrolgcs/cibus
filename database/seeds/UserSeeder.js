'use strict'

const Factory = use('Factory')

class UserSeeder {
  async run () {
    const userPedro = await Factory.model('App/Models/User').create({
      name: 'Pedro Henrique',
      username: 'pedro',
      email: 'pedro.lg.cs@gmail.com',
      password: 'pedro',
      active: 1
    })
    const userJana = await Factory.model('App/Models/User').create({
      name: 'Janaina Luana',
      username: 'jana',
      email: 'jana@gmail.com',
      password: 'jana',
      active: 0
    })
    // Pedro Restaurants
    const restPedro = await Factory.model('App/Models/Restaurant').make()
    await userPedro.restaurants().save(restPedro)
    const phonePedro = await Factory.model('App/Models/Phone').make()
    await restPedro.phones().save(phonePedro)
    const phonePedro2 = await Factory.model('App/Models/Phone').make()
    await restPedro.phones().save(phonePedro2)

    // Jana Restaurant
    const restJana = await Factory.model('App/Models/Restaurant').make()
    await userJana.restaurants().save(restJana)
    const phoneJana = await Factory.model('App/Models/Phone').make()
    await restJana.phones().save(phoneJana)

    // roles
    const administrator = await Factory.get('roles').table('roles').create({
      slug: 'administrator',
      name: 'Administrator',
      description: 'Administrador da API'
    })
    const cliente = await Factory.get('roles').table('roles').create({
      slug: 'cliente',
      name: 'Cliente',
      description: 'Cliente dono de restaurantes'
    })
  }
}

module.exports = UserSeeder
