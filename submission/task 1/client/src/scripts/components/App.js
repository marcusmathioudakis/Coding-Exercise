import React, { Component } from "react";
import "App.css";
import TileGrid from "./TileGrid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredEpisodes: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("/episodes")
      .then(res => res.json())
      .then(episodes => {
        if (episodes.success) {
          this.episodes = episodes.data;
          this.setState({ filteredEpisodes: this.episodes });
        }
      });
  }

  handleChange(event) {
    let filteredEpisodes = this.episodes.filter(episode =>
      episode.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ filteredEpisodes: filteredEpisodes });
  }

  render() {
    return (
      <div className="flex-container-column App">
        <div className="flex-container-row text">
          <div className="item">
            <h1>Silicon Valley</h1>
          </div>
        </div>
        <div className="flex-container-row TextInput">
          <span>Episode: </span>
          <input type="search" onChange={this.handleChange} />
        </div>
        <TileGrid episodes={this.state.filteredEpisodes} />
      </div>
    );
  }
}
