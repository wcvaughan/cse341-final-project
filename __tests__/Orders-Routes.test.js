const request = require('supertest');
const express = require('express');
const router = require('../routes/order-routes');

const app = new express();
app.use('/', router);

jest.mock('../db/connect', () => ({
    getDb: () => ({
      collection: () => ({
        find: () => ({
          toArray: () =>
            Promise.resolve([
                {
                _id: "67ef020962ad81060d719321",
                userId: "64e5a730cc6cfc6f91a1fabc",
                storeId: "64e5a730cc6cfc6f91a1f123",
                items: [
                    {
                    itemId: "67ef010962ad81060d719314",
                    quantity: 2
                    },
                    {
                    itemId: "67ef010962ad81060d719316",
                    quantity: 1
                    }
                ],
                totalPrice: 2.27,
                status: "pending",
                createdAt: "2025-04-03T21:46:42.237Z"
                },
                {
                _id: "641234abcde123456789abcd",
                userId: "64e5a730cc6cfc6f91a1fabc",
                storeId: "64e5a730cc6cfc6f91a1f123",
                items: [
                    {
                    itemId: "67ef010962ad81060d719317",
                    quantity: 1
                    }
                ],
                totalPrice: 2.99,
                status: "processing",
                createdAt: "2025-04-03T21:47:01.115Z"
                }
            ])
        }),
        findOne: ({ _id }) => {
          if (_id.toString() === '641234abcde123456789abcd') {
            return Promise.resolve(
                {
                    _id: "641234abcde123456789abcd",
                    userId: "64e5a730cc6cfc6f91a1fabc",
                    storeId: "64e5a730cc6cfc6f91a1f123",
                    items: [
                        {
                        itemId: "67ef010962ad81060d719317",
                        quantity: 1
                        }
                    ],
                    totalPrice: 2.99,
                    status: "processing"
                }
            );
          }
          return Promise.resolve(null);
        }
      })
    })
}));

describe('Order Routes', () => {
    test('GET all orders /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Order Routes', () => {
    test('GET one order /:orderId', async () => {
      const orderId = '641234abcde123456789abcd';
      const res = await request(app).get(`/${orderId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        _id: "641234abcde123456789abcd",
        userId: "64e5a730cc6cfc6f91a1fabc",
        storeId: "64e5a730cc6cfc6f91a1f123",
        items: [
            {
            itemId: "67ef010962ad81060d719317",
            quantity: 1
            }
        ],
        totalPrice: 2.99,
        status: "processing"
      });
    });
  });