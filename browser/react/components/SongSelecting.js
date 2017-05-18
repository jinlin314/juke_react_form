import React from 'react';

export default class SongSelecting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''

        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({inputValue: event.target.value});
    }

    render(){
        return(
            <div className="well">
                <form className="form-horizontal" noValidate name="songSelect">
                    <fieldset>
                        <legend>Add to Playlist</legend>
                        <div className="form-group">
                            <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                            <div className="col-xs-10">
                                <select className="form-control" name="song" onChange={this.handleChange}>



                                    <option value='hi'>song name</option>
                                    <option value='hello'>another song name</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button type="submit" className="btn btn-success">Add Song</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }

}
