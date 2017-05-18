import React from 'react';
import Songs from './Songs'
import SongSelecting from './SongSelecting';

export default class Playlist extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount () {
        let selectPlaylist = this.props.selectPlaylist;
        let playlistId = this.props.params.playlistId;

        selectPlaylist(playlistId);
    }

    componentWillReceiveProps(nextProps) {
        let selectPlaylist = this.props.selectPlaylist;
        let currentPlaylistId = this.props.params.playlistId;
        let nextPlaylistId = nextProps.params.playlistId;

        if (currentPlaylistId !==nextPlaylistId ){
            selectPlaylist(nextPlaylistId);
        }

    }

    render(){
        const children = this.props.children;
        return (
            <div>
                <h3>{ this.props.selectedPlaylist.name }</h3>

                <Songs songs={this.props.selectedPlaylist.songs} /> {/** Hooray for reusability! */}
                { this.props.selectedPlaylist.songs && !this.props.selectedPlaylist.songs.length && <small>No songs.</small> }
                <hr />
                <SongSelecting  allSongs={this.props.allSongs} />
            </div>

        )
    }

}
