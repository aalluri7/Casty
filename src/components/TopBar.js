import React from 'react';
import SearchBox from './SearchBox';
import MenuItem from './MenuItem';

let TopBar = React.createClass({

  render: function() {
    const styles = {
      backgroundColor:"#293a4a",
      color:"#9DA99B",
      border: "0px solid #999",
      height: "35px",
      padding: "5px 10px",
      WebkitAppearance: "none"
      };

  const btnstyles ={border: "0px solid #999",backgroundColor:"#293a4a",color:"#526a82",height: "45px",padding: "5px 10px", cursor: "pointer"};

  const items = Object.keys(this.props.data.subscribedPodcasts).map(function(podcast){
    return {name:podcast,action:this.props.actions.PodcastSelect.bind(this,podcast)}
  }.bind(this));

   return (

    <div className={"TopBar"}>
      <div style={{cursor: "pointer"}}className={"TitleBtn MenuItem"} onClick={this.props.actions.setPageView.bind(this,"home")}>Casty</div>
      <MenuItem className={"MenuItem"}title={"MyPodcasts"} items={items} ></MenuItem>
      <div className={"SearchBox"}><SearchBox btnstyles={btnstyles} styles={styles} textfield={this.props.data.rssUrl} submitFunction={this.props.actions.searchSubmit.bind(this,this.props.data.rssUrl)} setFunction={this.props.actions.setUrl} ></SearchBox></div>



    </div>
    );
  },

});

export default TopBar;
