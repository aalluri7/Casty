import React from 'react';
import SearchResult from './SearchResult.js';

let SearchPage = React.createClass({
  generatePodcasts: function() {

    let x = null;
    if(this.props.data.searchResults){
       x = this.props.data.searchResults.map((podcast,i) =>
        <SearchResult data={this.props.data} actions={this.props.actions} title={podcast.trackName}
        img={podcast.artworkUrl600} subscribehandler={this.props.actions.addPodcast.bind(this,podcast.trackName,podcast.feedUrl)}
        clickhandler={this.props.actions.setPageView.bind(this,"player/"+podcast.feedUrl)} num={i}></SearchResult>
      );
    }


    return x
  },
  render: function() {

   return (
    <div style={{marginTop:"5px"}}>
      {this.generatePodcasts()}
    </div>
    );

  },





});

export default SearchPage;
