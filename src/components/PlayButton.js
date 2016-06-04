import React from 'react';
let PlayButton = React.createClass({
  render: function(){
    let classNames = ["fa"];
    classNames.push(this.props.isPlaying ? "fa-pause" : "fa-play");
    return <i style={{cursor:"pointer"}} className={classNames.join(" ")} onClick={this.props.togglePlay}></i>;
  }
});

export default PlayButton;
