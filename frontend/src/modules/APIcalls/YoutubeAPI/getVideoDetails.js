import React, { Component } from 'react'
import axios from 'axios'
//Z3RA7bi5FUM  https://youtu.be/Z3RA7bi5FUM https://youtube.com/Z3RA7bi5FUM 
export default class getVidGetVideoDetailseoDetails extends Component {
    state = {
        YoutubeURL: '',
        DataArray: [],
        SnippetArray: [],
        thumbnailsArray: [],
        ChannelDataArray: [],
        ChannelSnippetArray:[],
        ChannelThumbnailArray:[],
        ChannelStatisticsArray:[]
    }
    GetAPIData(NewYoutubeURL) {
        
        axios.get(`http://localhost:5000/api/v1/youtubeapi/getvideostats/${NewYoutubeURL}`)
            //axios.get('http://localhost:5000/')
            .then((response) => {
                this.setState({ DataArray: response.data.items[0] });
                this.setState({ SnippetArray: response.data.items[0].snippet })
                this.setState({ thumbnailsArray: response.data.items[0].snippet.thumbnails.standard });
                // console.log(response.data.items[0].snippet.thumbnails)
                console.log('Data has been received!!');
                this.GetChannelData();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    GetChannelData(){
        let ChannelID = this.state.SnippetArray.channelId;
        axios.get(`http://localhost:5000/api/v1/youtubeapi/getchannelstats/${ChannelID}`)
        .then((response)=>{
            this.setState({ChannelDataArray: response.data.items[0]});
            this.setState({ChannelSnippetArray: response.data.items[0].snippet})
            this.setState({ChannelThumbnailArray: response.data.items[0].snippet.thumbnails.medium})
            this.setState({ChannelStatisticsArray: response.data.items[0].statistics})
        })
        .catch((error) => {
            console.log(error)
        })
    }
    YoutubrURLCheck(){
        
        if(this.state.YoutubeURL.includes("https://www.youtube.com/watch?v=")){
            let NewYoutubeURL = this.state.YoutubeURL.slice(32);
            this.setState({
                YoutubeURL: '',
            })
            this.GetAPIData(NewYoutubeURL)
            this.RenderData()
        }else;
        if(this.state.YoutubeURL.includes("https://youtu.be/")){
            let NewYoutubeURL2 = this.state.YoutubeURL.slice(17)
           
        }else;
    }
    ChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        this.YoutubrURLCheck();
        
    }
    RenderData() {
        
        return (
            <div>
                <pre>
                    <p>{this.state.SnippetArray.title}</p>
                    <p>{this.state.SnippetArray.description}</p>
                    <img src={this.state.thumbnailsArray.url}/>
                </pre>
                <pre>
                    <p>{this.state.ChannelSnippetArray.title}</p>
                    <p>{this.state.ChannelSnippetArray.description}</p>
                    <p>{this.state.ChannelSnippetArray.customUrl}</p>
                    <p>{this.state.ChannelSnippetArray.publishedAt}</p>
                    <img src={this.state.ChannelThumbnailArray.url}/>
                    <p>Total View Count: {this.state.ChannelStatisticsArray.viewCount}</p>
                    <p>Total Subs: {this.state.ChannelStatisticsArray.subscriberCount}</p>
                    <p>Total video Count: {this.state.ChannelStatisticsArray.videoCount}</p>
                </pre>
            </div>
        )
    }
    render() {
        return (
            <div>
                <form>
                    <input
                        name="YoutubeURL"
                        placeholder="Add a YouTube URL to search for video details"
                        value={this.state.YoutubeURL}
                        onChange={e => this.ChangeHandler(e)}
                    />
                    <br /> 
                    <button onClick={e => this.onSubmit(e)}>Submit</button>
                </form>
            {this.RenderData()}
            </div>
        )
    }
}