import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router'
import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import FilterableArtistsContainer from '../components/FilterableArtistsContainer';

import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

    constructor (props) {
        super(props);
        this.state = initialState;

        this.toggle = this.toggle.bind(this);
        this.toggleOne = this.toggleOne.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectArtist = this.selectArtist.bind(this);
        this.NewPlaylist = this.NewPlaylist.bind(this);
        this.selectPlaylist = this.selectPlaylist.bind(this);
    }

    componentDidMount () {

        Promise
            .all([
                axios.get('/api/albums/'),
                axios.get('/api/artists/'),
                axios.get('api/playlists/'),
                axios.get('api/songs/')
            ])
            .then(res => res.map(r => r.data))
            .then(data => this.onLoad(...data))
            .catch(console.error);

        AUDIO.addEventListener('ended', () =>
            this.next());
        AUDIO.addEventListener('timeupdate', () =>
            this.setProgress(AUDIO.currentTime / AUDIO.duration));
    }

    onLoad (albums, artists, playlists, songs) {
        this.setState({
            albums: convertAlbums(albums),
            artists: artists,
            playlists: playlists,
            allSongs: songs
        });
    }

    play () {
        AUDIO.play();
        this.setState({ isPlaying: true });
    }

    pause () {
        AUDIO.pause();
        this.setState({ isPlaying: false });
    }

    load (currentSong, currentSongList) {
        AUDIO.src = currentSong.audioUrl;
        AUDIO.load();
        this.setState({
            currentSong: currentSong,
            currentSongList: currentSongList
        });
    }

    startSong (song, list) {
        this.pause();
        this.load(song, list);
        this.play();
    }

    toggleOne (selectedSong, selectedSongList) {
        if (selectedSong.id !== this.state.currentSong.id)
            this.startSong(selectedSong, selectedSongList);
        else this.toggle();
    }

    toggle () {
        if (this.state.isPlaying) this.pause();
        else this.play();
    }

    next () {
        this.startSong(...skip(1, this.state));
    }

    prev () {
        this.startSong(...skip(-1, this.state));
    }

    setProgress (progress) {
        this.setState({ progress: progress });
    }

    selectAlbum (albumId) {
        axios.get(`/api/albums/${albumId}`)
            .then(res => res.data)
            .then(album => this.setState({
                selectedAlbum: convertAlbum(album)
            }))
            .catch(console.error);
    }

    selectPlaylist (playlistId) {
        axios.get(`/api/playlists/${playlistId}`)
            .then(res => res.data)
            .then(playlist => this.setState({
                selectedPlaylist: playlist
            }))
            .catch(console.error);
    }

    selectArtist (artistId) {
        Promise
            .all([
                axios.get(`/api/artists/${artistId}`),
                axios.get(`/api/artists/${artistId}/albums`),
                axios.get(`/api/artists/${artistId}/songs`)
            ])
            .then(res => res.map(r => r.data))
            .then(data => this.onLoadArtist(...data))
            .catch(console.error);
    }

    onLoadArtist (artist, albums, songs) {
        songs = songs.map(convertSong);
        albums = convertAlbums(albums);
        artist.albums = albums;
        artist.songs = songs;

        this.setState({ selectedArtist: artist });
    }

    NewPlaylist(playlistObj){
        axios.post('/api/playlists', playlistObj)
            .then(res => res.data)
            .then(result => {
                let lists = this.state.playlists;
                lists.push(result);
                this.setState({playlists: lists});
                const path = '/playlists/' + result.id;
                hashHistory.push(path);
            })
            .catch(console.error);
    }

    addSong(playlist, song){
        axios.post(`/api/playlists/${playlist.id}/songs`, song)
            .then(res => res.data)
            .then(song => {
                let list = this.state.playlistSong;
                list.push(song);
                this.setState({playlistSong: list});
            })
            .catch(console.error);
    }

    render () {
        // Pass all the state data to children's props
        const props = Object.assign({}, this.state, {
            toggleOne: this.toggleOne,
            toggle: this.toggle,
            selectAlbum: this.selectAlbum,
            selectArtist: this.selectArtist,
            NewPlaylist: this.NewPlaylist,
            selectPlaylist: this.selectPlaylist
        });

        return (
            <div id="main" className="container-fluid">
              <div className="col-xs-2">
                <Sidebar playlists={this.state.playlists}/>
              </div>
              <div className="col-xs-10">
                  {
                      this.props.children && React.cloneElement(this.props.children, props)
                  }
              </div>
              <Player
                  currentSong={this.state.currentSong}
                  currentSongList={this.state.currentSongList}
                  isPlaying={this.state.isPlaying}
                  progress={this.state.progress}
                  next={this.next}
                  prev={this.prev}
                  toggle={this.toggle}
              />
            </div>
        );
    }
}
