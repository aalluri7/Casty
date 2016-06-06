var React = require('react'),
    { PropTypes } = React;

var AudioPlayer = React.createClass({
  propTypes: {
    source: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    defaultTime: PropTypes.number,
    onProgress: React.PropTypes.func.isRequired,
    onTimeUpdate: React.PropTypes.func.isRequired,
    onEnd: React.PropTypes.func.isRequired
  },
  getInitialState() {
   return {

     currentTime: 0,
     isPlaying: true

   }
  },

  componentDidMount() {
    var node = this.getDOMNode();
    node.addEventListener('progress', this.handleProgress);
    node.addEventListener('timeupdate', this.handleTimeUpdate);
    node.addEventListener('ended', this.handleMediaEnd);
    node.addEventListener('error', this.handleError);
    node.addEventListener('pause', this.handlePause);
    node.addEventListener('play', this.handlePlay);
    node.addEventListener('playing', this.handlePlaying);

    this.updateIsPlaying();
  },
  handlePlaying(){
    this.setState({
      isPlaying: true
    });
    this.props.isPlaying({
      isPlaying: true
    });
  },
  handlePlay(){
    this.setState({
      isPlaying: true
    });
    this.props.isPlaying({
      isPlaying: true
    });
  },
  handlePause(){
    this.setState({
      isPlaying: false
    });

    this.props.isPlaying({
      isPlaying: false
    });
  },

  handleError() {
    this.refs.audioNode.load();
    if(this.props.isPlaying){
      this.refs.audioNode.play();
    }

    console.log('erroring');
    console.log(this.props.defaultTime);
    this.refs.audioNode.currentTime = this.state.currentTime || 0;
  },

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource();
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying();
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime();
    }
  },

  componentWillUnmount() {
    var node = this.getDOMNode();

    node.removeEventListener('progress', this.handleProgress);
    node.removeEventListener('timeupdate', this.handleTimeUpdate);
    node.removeEventListener('ended', this.handleMediaEnd);
  },

  render() {
    return (
      <audio ref="audioNode" preload='auto'>
        <source src={this.props.source}
                type='audio/mpeg' />
      </audio>
    );
  },

  handleTimeUpdate() {
    var node = this.getDOMNode(),
        currentTime = node.currentTime,
        trackDuration = node.duration;

    this.props.onTimeUpdate({
      currentTime: currentTime,
      trackDuration: trackDuration
    });
  },

  handleMediaEnd() {
    this.getDOMNode().currentTime = 0;
    this.props.onEnd();
  },

  handleProgress() {
    var node = this.getDOMNode(),
        trackDuration = node.duration,
        buffered = node.buffered;

    this.setState({
      currentTime: trackDuration
    });

    this.props.onProgress({
      trackDuration: trackDuration,
      buffered: buffered

    });
  },

  updateCurrentTime() {
    var node = this.getDOMNode();
    if (node.readyState) {
      node.currentTime = this.props.defaultTime;
    }
  },

  updateIsPlaying() {
    var node = this.getDOMNode(),
        isPlaying = this.props.isPlaying;

    if (isPlaying) {
      node.play();
    } else {
      node.pause();
    }
  },

  updateSource() {
    var node = this.getDOMNode(),
        isPlaying = this.props.isPlaying;

    node.pause();
    this.props.onTimeUpdate({
      currentTime: 0,
      trackDuration: node.duration
    });

    node.load();
    if (isPlaying) {
      node.play();
    }
  }
});

export default AudioPlayer;
