import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class TopMenu extends Component {
  render() {
    return (
      <div style={{justifyContent: "center" , marginBottom : " 30px"}}>
        <Menu>
          <Menu.Item
            name="Dashboard"
            className="menu-logo"
            style={{ marginRight: "10px", padding: "20px", backgroundColor: "#9D89B8D1" }} // Corrected backgroundColor
          />
        </Menu>
      </div>
    );
  }
}
export default TopMenu;
