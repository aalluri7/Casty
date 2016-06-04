import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingPage from '../components/LoadingPage';
import TopBar from '../components/TopBar';
import * as AppActions from '../actions/AppActions';
import Player from '../components/Player.js';
import SearchPage from '../components/SearchPage.js';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.



 switch(app.currentView) {
 case "home":
   return <LoadingPage data={app} actions={actions}></LoadingPage>;
 case "search":
   return <SearchPage podcasts={app.searchResults} actions={actions}> </SearchPage>;
 default:
   return <LoadingPage data={app} actions={actions}></LoadingPage>;

 }








 */
export default class App extends Component {

  componentDidMount() {
      window.addEventListener('hashchange', this.hashchange.bind(this));
      console.log(window.location.hash.slice(1));
      this.props.actions.setPageView(window.location.hash.slice(1));

  }
  hashchange() {
    console.log(window.location.hash.slice(1));
    this.props.actions.setPageView(window.location.hash.slice(1));
  }

  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { app, actions } = this.props;

    return (
      <div>
        <TopBar data={app} actions={actions} > </TopBar>
        <LoadingPage data={app} actions={actions}></LoadingPage>
        <Player currentEpisode={app.currentEpisode} ></Player>
     </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    app: state.app
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch),

  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
