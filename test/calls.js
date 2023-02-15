const { assert } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Call } = require('../db/models')

describe('Registro de llamadas', function() {
    describe('Crear una nueva llamada', function() {
        it('Que al crear el registro son requeridos todos los datos obligatorios', function() {
            return request(app)
            .post('/calls//initial_calls')
            .send(
                {
                    "phoneNumberFrom": "1112341234",
                    "phoneNumberTo": "2212341234"
                }
            )
            .expect(400)
            .then(res => {
                assert.equal(res.body.message, 'ALL FIELDS ARE REQUIRED')
            })
        })

        it('Que el endpoint responda con 201 al crear la llamada', function() {
            return request(app)
            .post('/calls//initial_calls')
            .send(
                {
                    "phoneNumberFrom": "1112341234",
                    "phoneNumberTo": "2212341234",
                    "timeInit": "2023-02-14 20:16:00"
                }
            )
            .expect(201)
        })
    })
})