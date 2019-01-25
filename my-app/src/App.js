import React, { Component } from 'react';
import './App.css';
import request from 'request';
import Spotify from 'spotify-web-api-node';
import Search from './components/search';
import List from './components/list';
import _ from 'lodash';

require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);
        
        console.log(this); // App class object
        console.log(this.onChange); // undefined (property exists)

        // //to hande setState within componentDidMount()
        // this.onChange = this.onChange.bind(this);

        this.state = {
            term: '',
            token: '',
            tracks: [],
            features: []
        }
        
    };//end constructor


    // onChange(state) {
    //   this.setState(state);
    // }


    searchTrack(term) {
        this.setState({term});

        var SpotifyWebApi = require('spotify-web-api-node');
    };//end searchTrack function     


    componentWillReceiveProps() {
        const spotifyApi = new Spotify();
  
        //handle cross-origin request error
        const CORSproxy ='https://cors-anywhere.herokuapp.com/';

        //keys from spotify api registration
        var clientId ='6a3a6f36818541b6b9da8b432817493f';
        var clientSecret = 'd8e3892171ca4908bede6152bbb63211';
        
        //authorize spotify api data request
        var authorization = {
          url: CORSproxy + 'https://accounts.spotify.com/api/token',
          headers: {
              'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
          },
          form: {
              grant_type: 'client_credentials'
          },
          json: true
        };
        
        request.post(authorization, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                //this.setState({token: body.access_token});
                this.setState({token: body.access_token});

                spotifyApi.setAccessToken(this.state.token);

                spotifyApi.searchTracks(this.state.term).then(
                    function(data) {
                        this.state({tracks: [...data.body.tracks.items]});

                        let ids = new Array();
                        this.state.tracks.forEach(track => {
                            ids.push(track.id)
                        });//end forEach ids loop

                        spotifyApi.getAudioFeaturesForTrack(ids).then(
                            function(data) {
                                this.setState({features: [...data.body.audio_features]});
                                console.log(data.body);
                        });//end spotifyApi getAudioFeaturesForTrack       
                    // }, function(err) {
                    //     console.error(err);
                    //   }//end error function
                });//end spotifyApi searchTracks
            }//end if no error and 200 
        });//end request post function
    };//end componentDidMount   


    render() {
        const searchTrack = _.debounce(term => {this.searchTrack(term) }, 500);
    
        const component1 = <Search onSearchTermChange = {searchTrack}/>
        let component2;
    
        if(!this.state.tracks[1]) component2 = <div></div>
        else component2 = <List tracks = {this.state.tracks} features = {this.state.features}/>
    
        return(
        <div className="App">
            {component1}
            {component2}
        </div>
        );//end return
    }//end render

};//end component

export default App;