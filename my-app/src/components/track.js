import React, { Component } from 'react';

class Track extends Component {
    constructor(props) {
        super(props);

        this.state = {
            track: this.props.track,
            features: this.props.features
        }

        getTempo() {
            if(this.props.features) return Math.floor(this.props.features.tempo);
        }//end getTempo

        getArtist() {
            let artists = '';
            let first = true;

            this.props.track.artists.map(artist => {
                if(!first) artists += ' & ';

                artists += artist.name;
                first = false
            })
            return artists;
        }//end getArtist

    }//end constructor

    render() {
        return(
            <section className="card">
                <a href={this.props.track.external_urls.spotify}>
                    <div className="box content">
                        <article className="post">
                            <h3>{this.props.track.name}</h3>
                            <div className="level media">
                                <img className="fimage" src = {this.props.track.album.images[1].url} />
                                <a href="#"><h4>{this.getArtist()}</h4></a>
                            </div>

                            <div className="content">
                                <p>
                                    <span className="tag">BPM: <h3 className="feature">{this.getTempo}</h3></span>
                                </p>
                            </div>
                        </article>
                    </div>
                </a>
            </section>
        );//end render
    }//end render
}//end component

export default Track; 