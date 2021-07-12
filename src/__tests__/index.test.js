const express = require('express')
const request = require('supertest')
const { cookieDefaults } = require('../../index.js')

describe('cookieDefaults', () => {
  it('accepts arguments that are used in the cookie', async () => {
    const app = express()
    // https://github.com/mikewest/http-state-tokens
    // __Host-token=value1; Secure; HttpOnly; SameSite=Lax; path=/
    app.use(
      cookieDefaults({
        prefix: '__Host-',
        path: '/',
        secure: true,
        sameSite: 'lax',
        httpOnly: true,
      }),
    )

    app.get('/', function (_req, res) {
      res.cookie('token', 'value1')
      res.send('Hello World!')
    })

    const response = await request(app).get('/')

    expect(response.headers['set-cookie']).toEqual([
      '__Host-token=value1; Path=/; HttpOnly; Secure; SameSite=Lax',
    ])
  })
})

describe('cookieDefaults', () => {
  it('supplies defaults that the cookies function does not override', async () => {
    const app = express()
    app.use(
      cookieDefaults({
        httpOnly: true,
        sameSite: true,
        secure: true,
      }),
    )

    app.get('/', function (_req, res) {
      res.cookie('token', 'value1', {
        httpOnly: false,
        sameSite: false,
        secure: false,
      })
      res.send('Hello World!')
    })

    const response = await request(app).get('/')

    expect(response.headers['set-cookie']).toEqual([
      'token=value1; Path=/; HttpOnly; Secure; SameSite=Strict',
    ])
  })
})
