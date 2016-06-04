import React from 'react';
import decodeHtml from '../utils/decodeHtml';

let Episode = React.createClass({
  clickhandler: function(ismp3) {
    if(ismp3){
      this.props.actions.setCurrentEpisode(this.props.episode) ;

    }

  },
  render: function() {
    let playbuttn = this.props.active? "fa fa-pause":"fa fa-play";
    let ismp3 = ((this.props.episode.enclosure)&&(this.props.episode.enclosure.url)&&(
    (this.props.episode.enclosure.type&&this.props.episode.enclosure.type.startsWith("audio"))||this.props.episode.enclosure.url.toLowerCase().endsWith(".mp3")||this.props.episode.enclosure.url.toLowerCase().endsWith(".wav")||this.props.episode.enclosure.url.toLowerCase().endsWith(".ogg")));

   return (

    <div  className="episodeitem" style={{
    }}>
      {decodeHtml(this.props.episode.title)}
      <i style={{cursor:"pointer", float: "right"}} className={ismp3?playbuttn:"fa fa-file-text-o"} onClick={this.clickhandler.bind(this,true)}></i>
    </div>




    );

  },





});

export default Episode;
