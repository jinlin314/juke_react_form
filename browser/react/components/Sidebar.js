import React from 'react';
import { Link } from 'react-router';
// import {newPlaylist } from './newPlaylist';

const Sidebar = (props) => {
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to='/albums'>ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/artists'>ARTISTS</Link>
        </h4>
      </section>
        <hr />
        <section>
            <h4 className="text-muted">PLAYLISTS</h4>
            <hr />
            <h4>
                <ul className="list-unstyled">
                    {
                        props.playlists && props.playlists.map((playlist, i) => {
                            return (
                                <li key={i} className="playlist-item menu-item">
                                    <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                                </li>
                                    )
                        })
                    }
                </ul>
                <Link className="btn btn-primary btn-block" to='/playlist/new'>
                    <span className="glyphicon glyphicon-plus"></span> PLAYLIST
                </Link>
            </h4>
        </section>
    </sidebar>
  );
}

export default Sidebar;
