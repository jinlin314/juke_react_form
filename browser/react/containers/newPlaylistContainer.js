import React, { Component } from 'react';
import NewPlaylist from '../components/newPlaylist';
import axios from 'axios';

export default class NewPlaylistContainer extends Component{
    constructor (props) {
        super(props);
        this.state = {
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.createList = this.createList.bind(this);
    }

    handleChange(event){
        this.setState({inputValue: event.target.value});
    }

    createList(event){
        event?event.preventDefault():null;
        this.props.NewPlaylist({name: this.state.inputValue});
        this.setState({inputValue: ''});
    }

    // addSong(event){
    //     event?event.preventDefault():null;
    //     this.props.NewPlaylist({name: this.state.inputValue});
    //     this.setState({inputValue: ''});
    // }


    render(){
        return (
            <div>
                <NewPlaylist
                    handleChange={this.handleChange}
                    createList={this.createList}
                    inputValue={this.state.inputValue}/>
            </div>
        )
    }
}