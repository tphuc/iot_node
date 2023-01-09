const express = require('express')
const _ = require('lodash');
const router = express.Router()
const {db} = require('../utils/db')

const { toInt } = require('../utils/number')

router.post('/', async (req, res, next) => {
  try {
    let { distance } = req.query
    let timestamp = new Date()
    let hour = timestamp.getHours()
    let record = await db.Record?.create({
      data: {
        distance: toInt(distance),
        hour: hour.toString()
      }
    })
    res.json(record);
   
  } catch (err) {
    next(err);
  }
});


router.get('/config', async (req, res, next) => {
  try {
    let record = await db.Record?.findUnique({
      where: {
        id: 1
      },
    })
    res.json(record);
   
  } catch (err) {
    next(err);
  }
});


router.post('/config', async (req, res, next) => {
  try {
    let { inhibitTime } = req.body
    let record = await db.Record?.update({
      where: {
        id: 1
      },
      data: {
        inhibitTime: toInt(inhibitTime)
      }
    })
    res.json(record);
   
  } catch (err) {
    next(err);
  }
});

router.get('/report', async (req, res, next) => {
  try {

    let currentTime = new Date()
    const oneDayAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
    let records = await db.Record?.groupBy({
      by: ['hour'],
      _count: {
        _all: true
      },
      where: {
        createdAt: {
          gte: oneDayAgo
        }
      },
    })
    res.json(records);
   
  } catch (err) {
    next(err);
  }
});












module.exports = router
