const request = require('supertest');
const express = require('express');
const router = require('../routes/item-routes');

const app = new express();
app.use('/', router);

jest.mock('../db/connect', () => ({
    getDb: () => ({
      collection: () => ({
        find: () => ({
          toArray: () =>
            Promise.resolve([
              {
                _id: "67ef010962ad81060d719314",
                name: "Apple",
                category: "Fruit",
                price: 0.99,
                stock: 100,
                storeId: "641234abcde123456789abcd",
                description: "Fresh and juicy apples",
                isOnSale: false,
                imageUrl: "https://example.com/images/apple.jpg"
              },
              {
                _id: "67ef010962ad81060d719318",
                name: "Brown Rice",
                category: "Grains",
                price: 1.49,
                stock: 120,
                storeId: "641234abcde123456789abcd",
                description: "Whole grain brown rice",
                isOnSale: false,
                imageUrl: "https://example.com/images/brown-rice.jpg",
                createdAt: "2025-04-03T21:44:22.432Z"
              }
            ])
        }),
        findOne: ({ _id }) => {
          if (_id.toString() === '67ef010962ad81060d719318') {
            return Promise.resolve({
              _id: "67ef010962ad81060d719318",
              name: "Brown Rice",
              category: "Grains",
              price: 1.49,
              stock: 120,
              storeId: "641234abcde123456789abcd",
              description: "Whole grain brown rice",
              isOnSale: false,
              imageUrl: "https://example.com/images/brown-rice.jpg"
            });
          }
          return Promise.resolve(null);
        }
      })
    })
}));

describe('Item Routes', () => {
    test('GET all items /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Item Routes', () => {
    test('GET one item /:itemId', async () => {
      const itemId = '67ef010962ad81060d719318';
      const res = await request(app).get(`/${itemId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        _id: "67ef010962ad81060d719318",
        name: "Brown Rice",
        category: "Grains",
        price: 1.49,
        stock: 120,
        storeId: "641234abcde123456789abcd",
        description: "Whole grain brown rice",
        isOnSale: false,
        imageUrl: "https://example.com/images/brown-rice.jpg"
      });
    });
  });