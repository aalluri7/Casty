import React from "react";

let SubscribeBtn = React.createClass({
  render: function() {
    return (
      <div
        style={{
          cursor: this.props.data.subscribedPodcasts[this.props.podcastname]
            ? "default"
            : "pointer",
          position: "absolute",
          top: "84px",
          left: "0"
        }}
        onClick={this.props.subscribehandler}
      >
        {this.props.data.subscribedPodcasts[this.props.podcastname]
          ? "Subscribed"
          : "Subscribe"}
      </div>
    );
  }
});

export default SubscribeBtn;
