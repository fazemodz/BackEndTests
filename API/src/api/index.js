const express = require('express');

const emojis = require('./routes/emojis');
const youtubeapi = require('./routes/youtubeapi');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
router.use('/youtubeapi', youtubeapi);
router.use('/emojis', emojis);

module.exports = router;
