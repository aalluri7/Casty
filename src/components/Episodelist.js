import React from 'react';
import Episode from './Episode.js';
import Player from './Player.js';


let Episodelist = React.createClass({
  generateEpisodes: function() {
    return this.props.episodes.map((episode,i) => {
      if (!episode.enclosure) {
        
      }
      const active = this.props.data.currentEpisode &&
        this.props.data.currentEpisode.enclosure &&
        episode.enclosure &&
        this.props.data.currentEpisode.enclosure.url==episode.enclosure.url
      return <Episode active={active} episode={episode} num={i} actions={this.props.actions}></Episode>
    })
  },

  render: function() {
   return (
    <div style={{marginTop:"5px"}}>
      {this.generateEpisodes()}

    </div>
    );

  },





});

export default Episodelist;
