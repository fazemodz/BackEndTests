const express = require('express');
const router = express.Router();
const axios = require('axios');
const util = require('util'); 
const decycle = require('json-decycle')
let config = {
    headers: {
        'Accept': 'application/json'
    }
}
router.get('/getvideostats', (req, res)=>{
    res.json({
        message: "Please use / and a videoID"
    })
})
router.get('/getvideostats/:videoID', (req, res)=>{
    axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${req.params.videoID}&key=${process.env.Youtube_API_Key}`)
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
router.get('/getvideostats/stringver/:videoID', (req, res)=>{
    axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${req.params.videoID}&key=${process.env.Youtube_API_Key}`)
    .then(function (response) {
        //sends the data to the user
        res.status(200).send(JSON.stringify(response.data))
        console.log(response.data);
      })
      .catch(function (error) {
        
        console.log(error);
      })
})

module.exports = router;