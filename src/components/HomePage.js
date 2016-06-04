import React from 'react';
import SearchResult from './SearchResult.js';

let HomePage = React.createClass({
  generatePodcasts: function() {

    let x = null;
    if(this.props.data.topPodcasts){
       x = this.props.data.topPodcasts.map((podcast,i) =>
        <SearchResult data={this.props.data} subscribehandler={this.props.actions.subscribePodcastById.bind(this,podcast.id.attributes["im:id"])} title={podcast.title.label.split(" - ")[0]} img={podcast["im:image"][2].label} clickhandler={this.props.actions.fetchPodcastById.bind(this,podcast.id.attributes["im:id"])} num={i}></SearchResult>
      );
    }
    return x
  },
  render: function() {

   return (
    <div style={{marginTop:"5px"}}>
    <h2>iTunes Top 25 Podcasts</h2>
      {this.generatePodcasts()}
    </div>
    );

  },





});

export default HomePage;
