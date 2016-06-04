import React from 'react';
import SubscribeBtn from './SubscribeBtn';
import decodeHtml from '../utils/decodeHtml';

let TitleBox = React.createClass({

  render: function() {
    let x = this.props.title+"";
    console.log((x));

   return (
     <div style={{height: "150px"}} className={"TitleBox"} >
       <h2>{decodeHtml(this.props.title)}</h2>
       <div style={{display: "flex", margin:"0px 0px 20px 10px"}}>
         <img style={{marginRight:"10px"}} src={this.props.img} height="100" width="100"></img>
         <div style={{flex: "1"}}>
            <div style={{position:"relative"}}>
               <div style={{overflow: "hidden",height: "80px"}} >{this.props.subtitle}</div>
               <SubscribeBtn subscribehandler={this.props.actions.addPodcast.bind(this,this.props.data.feed.title,this.props.data.feedUrl)} actions={this.props.actions} data={this.props.data} podcasturl={this.props.data.feedUrl} podcastname={this.props.title}></SubscribeBtn>

            </div>
         </div>

       </div>
     </div>
    );

  },





});

export default TitleBox;
