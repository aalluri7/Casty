import React from "react";
import AudioPlayer from "./AudioPlayer.js";
import PlayButton from "./PlayButton.js";

import moment from "moment";

let Player = React.createClass({
  getInitialState: function() {
    return {
      isPlaying: true,
      currentTime: 0,
      seekingTime: 0,
      mouseOnBar: false,
      trackDuration: 0,
      defaultTime: 0,
      dragDown: false,
      handlepos: 15
    };
  },
  componentDidMount: function() {
    window.addEventListener("mousemove", this.mousePos);
    window.addEventListener("mouseup", this.dragUp);
    window.addEventListener("keydown", this.keyDown);
  },
  keyDown: function(e) {
    if ((e.keycode || e.which) == 32) {
      e.preventDefault();
      this.togglePlay();
    }
  },
  onProgress: function(data) {
    let string = [];
    for (let i = 0; i < data.buffered.length; i++) {
      string.push({ start: data.buffered.start(i), end: data.buffered.end(i) });
    }
  },
  onTimeUpdate: function(data) {
    this.setState({
      currentTime: isNaN(data.currentTime) ? 0 : data.currentTime,
      trackDuration: isNaN(data.trackDuration) ? 0 : data.trackDuration
    });
  },
  onEnd: function() {},
  togglePlay: function() {
    this.setState({ isPlaying: !this.state.isPlaying });
  },
  skipHandler: function(e) {
    let seekBar = this.refs.seekBar;
    this.setState({ defaultTime: this.state.seekingTime });
  },
  skipMouseOver: function(e) {
    this.setState({ mouseOnBar: true });
    this.setState({
      handlepos: this.state.currentTime / this.state.trackDuration * 100 + "%"
    });
    clearTimeout(this.hideTimer);
  },
  skipMouseOut: function(e) {
    this.setState({ mouseOnBar: false });
  },
  dragDown: function(e) {
    e.preventDefault();
    this.setState({ dragDown: true });
    this.setState({
      handlepos: this.state.currentTime / this.state.trackDuration * 100 + "%"
    });
  },
  dragUp: function(e) {
    if (this.state.dragDown) {
      this.setState({ dragDelay: true });
      this.skipHandler();
      this.setState({ dragDown: false });
      setTimeout(
        function() {
          this.setState({ dragDelay: false });
        }.bind(this),
        5000
      );
    }
  },
  mousePos: function(e) {
    if (this.state.dragDown || this.state.mouseOnBar) {
      let seekBar = this.refs.seekBar;
      let x = Math.floor(e.clientX - seekBar.getBoundingClientRect().left);
      let seekpos = 0;
      seekpos = x > seekBar.offsetWidth ? seekBar.offsetWidth : x < 0 ? 0 : x;
      if (this.state.dragDown) {
        this.setState({ handlepos: seekpos + "px" });
      }

      this.setState({
        seekingTime: seekpos / seekBar.offsetWidth * this.state.trackDuration
      });
    } else {
      this.setState({ seekingTime: undefined });
    }
  },
  loadEpisode: function() {
    let seekWidth =
      this.state.currentTime / this.state.trackDuration * 100 + "%";

    let showskiptime = this.state.dragDown || this.state.mouseOnBar;
    let showhandle = this.state.mouseOnHandle;
    let displayTime = moment
      .utc(
        showskiptime
          ? this.state.seekingTime * 1000
          : this.state.currentTime * 1000
      )
      .format("HH:mm:ss");
    let endTime = moment
      .utc(this.state.trackDuration * 1000)
      .format("HH:mm:ss");

    return (
      <div className={"playerThing"}>
        <div style={{ margin: "8px" }}>{this.props.currentEpisode.title}</div>
        <div style={{ margin: "0px 5px", display: "flex" }}>
          <div style={{ marginLeft: "5px" }}>
            <PlayButton
              isPlaying={this.state.isPlaying}
              togglePlay={this.togglePlay}
            />
          </div>
          <div
            style={{
              marginLeft: "5px",
              color: showskiptime ? "black" : "white"
            }}
          >
            {displayTime}
          </div>
          <div
            className="seekbar"
            onMouseOver={this.skipMouseOver}
            onMouseOut={this.skipMouseOut}
            style={{
              marginLeft: "10px",
              position: "relative",
              flexGrow: "1",
              display: "flex",
              alignItems: "center"
            }}
          >
            <div
              style={{
                marginLeft: "5px",
                background: "#d6dbdf",
                height: "5px",
                width: "100%",
                cursor: "pointer"
              }}
              onClick={this.skipHandler}
              ref="seekBar"
            >
              <div
                style={{
                  minHeight: "1px",
                  height: "100%",
                  background: "black",
                  width: seekWidth,
                  transition: "width .15s linear"
                }}
              >
                &nbsp;
              </div>
            </div>

            <div
              className={"playerHandle"}
              style={{
                opacity: showskiptime ? "1" : "0",
                top: "2.5px",
                transform: "translateX(-25%)",
                border: "solid 2px black",
                borderRadius: "50%",
                width: "10px",
                background: "black",
                height: "10px",
                position: "absolute",
                left:
                  this.state.dragDown || this.state.dragDelay
                    ? this.state.handlepos
                    : seekWidth,
                cursor: "pointer"
              }}
              onMouseDown={this.dragDown}
              onMouseUp={this.dragUp}
            >
              &nbsp;
            </div>
          </div>
          <div style={{ margin: "0 3px" }}>{endTime}</div>
        </div>
        <AudioPlayer
          source={this.props.currentEpisode.enclosure.url}
          isPlaying={this.state.isPlaying}
          onProgress={this.onProgress}
          onTimeUpdate={this.onTimeUpdate}
          onEnd={this.onEnd}
          defaultTime={this.state.defaultTime}
        />
      </div>
    );
  },

  render: function() {
    return (
      <div
        style={{ visibility: this.props.currentEpisode ? "visible" : "hidden" }}
        className={"noselect"}
        refs="node"
      >
        <div className={"playerMain"}>
          {this.props.currentEpisode ? (
            this.loadEpisode()
          ) : (
            <div>please select episode</div>
          )}
        </div>
      </div>
    );
  }
});

export default Player;
