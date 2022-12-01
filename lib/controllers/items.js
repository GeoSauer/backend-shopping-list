const { Router } = require('express');
const authDelete = require('../middleware/authDelete.js');
const authorize = require('../middleware/authorize.js');
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
      res.json(userItems);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', authDelete, async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authDelete, async (req, res, next) => {
    try {
      const deletedItem = await Item.delete(req.params.id);
      res.json(deletedItem);
    } catch (error) {
      next(error);
    }
  });

// TO DO - implement items CRUD
