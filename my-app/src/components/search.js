import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            term: ''
        }

        this.onInputChange = term => {
            this.setState({term});
            this.props.onSearchTermChange(term);
        }
    }

    render() {
        return(
            <div>
                <section className="container">
                    <div className="column">
                        <p>Find songs that match your BPM.</p>
                    </div>
                </section>

                <section className="box">
                    <div className="field is-grouped">
                        <input
                            className="input" 
                            type="text"
                            placeholder="Song name"
                            value={this.state.term}
                            onChange = {e => this.onInputChange(e.target.value)}
                        />
                        <section className="control">
                        <button type="submit" className="btn btn-primary">Search</button>
                            {/* <a className="button is-dark">
                                Search Key
                            </a> */}
                        </section>
                    </div>
                </section>
            </div>
        );
    }
}

export default Search;