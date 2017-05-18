import Artists from './Artists';
import FilterInput from './FilterInput';
import React, { Component } from 'react';

export default class FilterableArtistsContainer extends Component{
    constructor (props){
        super(props);
        this.state = {
            inputValue: '',
            artists: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({inputValue: event.target.value});
    }

    render() {
        const inputValue = this.state.inputValue;
        const filteredArtists = this.props.artists.filter(artist =>
            artist.name.match(inputValue));

        return (
            <div>

                <FilterInput handleChange={this.handleChange}/>
                <Artists  artists={filteredArtists} />
            </div>
        )
    }


}
