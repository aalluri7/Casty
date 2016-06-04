import React from 'react';

let SubscribedPodcastsList = React.createClass({
  generateSubscribedPodcasts: function() {
    let list = [];
    for(var key in this.props.list)
    {
      list.push(<span onClick={this.props.actions.PodcastSelect.bind(this,key)}> {this.props.list[key].name} </span>);
    }
    return list

  },
  render: function() {
    console.log(["sfdsf",this.props.list]);
   return (
    <div>
      {this.generateSubscribedPodcasts()}
    </div>
    );

  },





});

export default SubscribedPodcastsList;
