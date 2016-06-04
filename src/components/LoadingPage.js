
import PodcastViewer from './PodcastViewer';
import SubscribedPodcastsList from './SubscribedPodcastsList';
import React, { Component, PropTypes } from 'react';
import SearchPage from './SearchPage.js';
import HomePage from './HomePage.js';


export default class LoadingPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateLoading() {
    return <div>loading</div> ;
  }


  generatePodcastPlayer() {
    return [
      <SubscribedPodcastsList list={this.props.data.subscribedPodcasts} actions={this.props.actions}> </SubscribedPodcastsList>,


    ];
  }

  stuff() {
    switch (this.props.data.currentView) {
      case "home":
        return <HomePage data={this.props.data}  actions={this.props.actions}></HomePage>;
      case "player":
        return <PodcastViewer data={this.props.data}  actions={this.props.actions}></PodcastViewer>;
      case "search":
        return <SearchPage data={this.props.data} podcasts={this.props.data.searchResults} actions={this.props.actions}> </SearchPage>;
      default:
        return <HomePage data={this.props.data}  actions={this.props.actions}></HomePage>;
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className={"LoadingPage"}>
       {this.stuff()}
       </div>

    );
  }
}
