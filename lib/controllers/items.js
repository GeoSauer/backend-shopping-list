const { Router } = require('express');
const Item = require('../models/Item.js');

(module.exports = Router())
  .post('/', async (req, res, next) => {
    try {
      const newItem = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        userId: req.user.id,
        bought: req.body.bought,
      });
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const userItems = await Item.getAll(req.user.id);
      console.log('why', req.params.userId);
      if (!userItems) {
        next();
      }
      res.json(userItems);
    } catch (error) {
      next(error);
    }
  });

// TO DO - implement items CRUD
