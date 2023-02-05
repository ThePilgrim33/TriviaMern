const { Router } = require('express');
const gameControllers = require('../controllers/gameControllers');
const router = Router();

router.get('/topPlayers', gameControllers.topPlayers);
router.post('/player', gameControllers.updateScore);

module.exports = router;