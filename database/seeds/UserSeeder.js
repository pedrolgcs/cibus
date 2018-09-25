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
    const restPedro2 = await Factory.model('App/Models/Restaurant').make()
    await userPedro.restaurants().save(restPedro2)
    const phonePedro = await Factory.model('App/Models/Phone').make()
    await restPedro.phones().save(phonePedro)
    const phonePedro2 = await Factory.model('App/Models/Phone').make()
    await restPedro.phones().save(phonePedro2)

    // Jana Restaurant
    const restJana = await Factory.model('App/Models/Restaurant').make()
    await userJana.restaurants().save(restJana)
	const restJana2 = await Factory.model('App/Models/Restaurant').make()
    await userJana.restaurants().save(restJana2)
    const phoneJana = await Factory.model('App/Models/Phone').make()
    await restJana.phones().save(phoneJana)

    // roles
    const administrator = await Factory.get('roles').table('roles').create({
      slug: 'administrator',
      name: 'Administrator',
      description: 'Adiministrador do sistema'
    })
    const client = await Factory.get('roles').table('roles').create({
      slug: 'client',
      name: 'client',
      description: 'Proprietário de restaurantes'
    })

    const admin = await Factory.get('roles').make()
    await userPedro.roles().save(userPedro, admin)

    const cli = await Factory.get('roles').make()
    await userJana.roles().save(userJana, cli)
  }
}

module.exports = UserSeeder
