const request = require('supertest');
const express = require('express');
const router = require('../routes/user-routes');

const app = new express();
app.use('/', router);

jest.mock('../db/connect', () => ({
    getDb: () => ({
      collection: () => ({
        find: () => ({
          toArray: () =>
            Promise.resolve([
                {
                    _id: "64e5a730cc6cfc6f91a1fabc",
                    name: "John Doe",
                    email: "john@example.com",
                    password: "myStrongP@ssword",
                    role: "user",
                    address: "456 Elm Street"
                },
                {
                    _id: "67ef040962ad81060d719341",
                    name: "Emily Carter",
                    email: "emily@example.com",
                    password: "StrongP@ss123",
                    role: "admin",
                    address: "789 Oak Avenue"
                }
            ])
        }),
        findOne: ({ _id }) => {
          if (_id.toString() === '641234abcde123456789abcd') {
            return Promise.resolve({
                _id: "641234abcde123456789abcd",
                name: "Emily Carter",
                email: "emily@example.com",
                password: "StrongP@ss123",
                role: "admin",
                address: "789 Oak Avenue"
            });
          }
          return Promise.resolve(null);
        }
      })
    })
}));

describe('User Routes', () => {
    test('GET all users /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('User Routes', () => {
    test('GET one user /:userId', async () => {
      const userId = '641234abcde123456789abcd';
      const res = await request(app).get(`/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        _id: "641234abcde123456789abcd",
        name: "Emily Carter",
        email: "emily@example.com",
        password: "StrongP@ss123",
        role: "admin",
        address: "789 Oak Avenue"
      });
    });
  });