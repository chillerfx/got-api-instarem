import express from 'express';
import { battleInterface } from '../services/battleInterface';

const router = express.Router();
const bI = new battleInterface();
router.get('/', (req, res) => {
  bI.initData();
  res.json({"nothing to see" : "false"})
});
router.get('/list', (req, res) => {
  bI.getBattleList()
  .then(list => {
    res.json(list)
  })
})
router.get('/count', (req, res) => {
  bI.getBattleCount()
  .then(count => {
    res.json(count)
  })
})
router.get('/stats', (req, res) => {
  bI.getBattleStats()
  .then(stats => {
    res.json(stats)
  })
})
router.get('/search', (req, res) => {
  bI.getSearch(req.query)
  .then(search => {
   res.json(search)
  })
})
module.exports = router;
