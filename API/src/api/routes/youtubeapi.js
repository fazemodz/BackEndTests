const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/getvideostats', (req, res) => {
  res.json({
    message: "Please use / and a videoID"
  })
})
router.get('/getvideostats/:videoID', (req, res) => {
  // checks if the videoID is the right length
  if (req.params.videoID.length != 11) {
    res.status(400).send('Invalid video ID');
    return;
  } else {
    axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${req.params.videoID}&key=${process.env.Youtube_API_Key}`)
      .then(function (response) {
        //sends the data to the user
        res.status(200).send(response.data)

      })
      .catch(function (error) {
        res.sendStatus(400);
        console.log(error);
      })
  }
})
router.get('/getchannelstats/:channelID', (req, res) => {
  axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${req.params.channelID}&key=${process.env.Youtube_API_Key}`)
    .then(function (response) {
      /*
          Saves the response data from youtube in a new variable, as 
          axios requires us to send response.data to get the request data.
      */
      let SendData = response.data
      //sends the data to the user
      res.status(200).send(response.data)

    })
    .catch(function (error) {

      console.log(error);
    })
})

module.exports = router;