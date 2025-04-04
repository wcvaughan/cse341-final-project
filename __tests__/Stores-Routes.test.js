const request = require('supertest');
const express = require('express');
const router = require('../routes/store-routes');

const app = new express();
app.use('/', router);

jest.mock('../db/connect', () => ({
    getDb: () => ({
      collection: () => ({
        find: () => ({
          toArray: () =>
            Promise.resolve([
                {
                    _id: "67ef030962ad81060d719331",
                    name: "Main Street Market",
                    location: "123 Main St, Springfield",
                    hours: "Mon-Fri 8am-6pm",
                    manager: "Jane Doe",
                    contact: "555-1234",
                    inventoryCount: 100,
                    status: "open"
                  },
                  {
                    _id: "67ef030962ad81060d719332",
                    name: "Green Valley Grocers",
                    location: "456 Elm St, Greenfield",
                    hours: "Daily 7am-9pm",
                    manager: "Robert Smith",
                    contact: "555-5678",
                    invenctoryCount: 200,
                    status: "open"
                  }
            ])
        }),
        findOne: ({ _id }) => {
          if (_id.toString() === '67ef030962ad81060d719332') {
            return Promise.resolve({
                _id: "67ef030962ad81060d719332",
                name: "Green Valley Grocers",
                location: "456 Elm St, Greenfield",
                hours: "Daily 7am-9pm",
                manager: "Robert Smith",
                contact: "555-5678",
                invenctoryCount: 200,
                status: "open"
              });
          }
          return Promise.resolve(null);
        }
      })
    })
}));

describe('Store Routes', () => {
    test('GET all stores /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Store Routes', () => {
    test('GET one store /:storeId', async () => {
      const storeId = '67ef030962ad81060d719332';
      const res = await request(app).get(`/${storeId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        _id: "67ef030962ad81060d719332",
        name: "Green Valley Grocers",
        location: "456 Elm St, Greenfield",
        hours: "Daily 7am-9pm",
        manager: "Robert Smith",
        contact: "555-5678",
        invenctoryCount: 200,
        status: "open"
      });
    });
  });