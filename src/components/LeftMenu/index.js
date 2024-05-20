import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class LeftMenu extends Component {
  render() {
    return (
      <div style={{justifyContent: "center" }}>
        <Menu>
          <Menu.Item
            onClick={() => {
              window.location.href = "/";
            }}
            style={{ marginRight: "10px", padding: "20px", backgroundColor: "#9D89B8D1" }} // Corrected backgroundColor
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              window.location.href = "/control";
            }}
            style={{ marginRight: "10px", padding: "20px", backgroundColor: "#9D89B8D1" }} // Corrected backgroundColor
          >
            Control your devices
          </Menu.Item>
          <Menu.Item
             onClick={() => {
              window.location.href = "/visualize";
            }}
            style={{ marginRight: "10px", padding: "20px", backgroundColor: "#9D89B8D1" }} // Corrected backgroundColor
          >
            Visualize Your Data
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default LeftMenu;
