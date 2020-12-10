const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Agus marsono',
        email: 'myreminder.a@gmail.com',
        password: 'MYpass777'
    }).expect(201)
})
