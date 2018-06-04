import React from "react";

let SearchBox = React.createClass({
  handleChange: function(e) {
    this.props.setFunction(e.target.value);
  },
  render: function() {
    return (
      <div className="searchBox" style={{}}>
        <form
          action="#"
          onSubmit={e => {
            e.preventDefault();
            this.props.submitFunction();
          }}
        >
          <input
            style={this.props.styles}
            ref="textInput"
            type="text"
            name="url"
            value={this.props.textfield}
            placeholder="Feed Url or Search Term"
            onChange={this.handleChange}
            onKeyDown={(e)=>{e.stopPropagation()}}
          />
          <input style={this.props.btnstyles} type="submit" value="Go" />
        </form>
      </div>
    );
  }
});

export default SearchBox;
