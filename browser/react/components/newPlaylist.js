import React from 'react';

const NewPlaylist = function (props) {
    return (

        <div className="well">
            <form className="form-horizontal" onSubmit={props.createList}>
                <fieldset>
                    <legend>New Playlist</legend>
                    <div className="form-group">
                        <label className="col-xs-2 control-label">Name</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   onChange={props.handleChange}
                                   value={props.inputValue}
                                   maxLength="16"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-10 col-xs-offset-2">
                            {
                                (props.inputValue.length > 0)?
                                    (<button type="submit" className="btn btn-success">Create Playlist</button>)
                                    : ( <div><div className="alert alert-warning">Please enter a name</div>
                                    <button type="submit" className="btn btn-success" disabled>Create Playlist</button></div>)
                            }
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )}

    module.exports = NewPlaylist;