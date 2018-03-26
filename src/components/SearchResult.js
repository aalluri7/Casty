import React from "react";
import SubscribeBtn from "./SubscribeBtn";

let SearchResult = React.createClass({
  render: function() {
    return (
      <div className="episodeitem" onClick={this.props.clickhandler}>
        <div style={{ display: "flex" }}>
          <img
            style={{ marginRight: "10px" }}
            src={this.props.img}
            height="100"
            width="100"
          />
          <div style={{ flex: "1" }}>
            <div style={{ position: "relative" }}>
              <div style={{}}>{this.props.title}</div>
              <SubscribeBtn
                data={this.props.data}
                actions={this.props.actions}
                subscribehandler={this.props.subscribehandler}
                data={this.props.data}
                podcastname={this.props.title}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SearchResult;
