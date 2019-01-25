import React, { Component } from 'react';
import Track from './track';

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let const = -1;
        const trackItems = this.props.tracks.map((track, index) => {
            cont++;

            return(
                <Track
                    key = {track.id}
                    track = {track}
                    features = {this.props.features[index]}
                />
            )
        });

        return (
            <div className="container">
                <div className="column">
                    {trackItems}
                </div>
            </div>
        );
    }
}

export default List;