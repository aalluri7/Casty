import React from 'react';
import TitleBox from './TitleBox.js';
import Episodelist from './Episodelist.js';


let PodcastViewer = React.createClass({
  getInitialState: function() {
    return {};
  },
  generateLoading: function() {
    return <div>loading</div> ;
  },


  generatePodcastPlayer: function() {
    return [
      <TitleBox data={this.props.data} title={this.props.data.feed.title} subtitle={this.props.data.feed.summary} actions={this.props.actions} img={this.props.data.feed.image} ></TitleBox>,
      <Episodelist data={this.props.data} episodes={this.props.data.feed.item} actions={this.props.actions}   ></Episodelist>


    ];
  },
  render: function() {
   return (
     <div>
      {this.props.data.feed ? this.generatePodcastPlayer() : this.generateLoading()}


     </div>
    );

  },





});

export default PodcastViewer;
