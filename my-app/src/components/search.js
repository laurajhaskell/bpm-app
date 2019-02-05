import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            term: ''
        }

    }//end constructor

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    render() {
        return(
            <div id="spotify-request">
                <section className="container">
                    <div className="column">
                        <p class="font-weight-bold">Search for a song to see it's BPM.</p>
                    </div>
                </section>

                <section className="box">
                    <div className="field is-grouped">
                        <p>
                        <input
                            className="input" 
                            type="text"
                            placeholder="e.g. "
                            value={this.state.term}
                            onChange = {e => this.onInputChange(e.target.value)}
                        />
                        </p>
                        <section className="control">
                        <button type="submit" className="btn btn-primary">Search</button>
                            {/* <a className="button is-dark">
                                Search Key
                            </a> */}
                        </section>
                    </div>
                </section>
            </div>
        );//end return
    }//end render
}//end component

export default Search;