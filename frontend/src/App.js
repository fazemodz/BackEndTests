import React, { Component } from 'react'
import GetVideoDetails from './modules/APIcalls/YoutubeAPI/getVideoDetails';
export default class App extends Component {
  render() {
    return (
      <div>
        <GetVideoDetails/>
      </div>
    )
  }
}

