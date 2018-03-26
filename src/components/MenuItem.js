import React from "react";
let MenuItem = React.createClass({
  generateItems: function() {
    return this.props.items.map((item, i) => (
      <div
        style={{ padding: "5px", boxSizing: "border-box", cursor: "pointer" }}
        onClick={item.action}
      >
        {item.name}
      </div>
    ));
  },

  render: function() {
    return (
      <div style={{ cursor: "pointer" }} className={this.props.className}>
        {this.props.title}
        <div
          className="MenuList"
          style={{
            top: "100%",
            left: "0",
            minWidth: "200px",
            margin: "0",
            position: "absolute",
            padding: "5px ",
            backgroundColor: "#16a085",
            zIndex: "999"
          }}
        >
          {this.generateItems()}
        </div>
      </div>
    );
  }
});

export default MenuItem;
