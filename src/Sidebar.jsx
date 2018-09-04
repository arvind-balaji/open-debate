import React, { Component } from "react";
import { Layout, Menu, Tooltip, Icon } from "antd";
import "./Sidebar.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// const { SubMenu, MenuItemGroup } = Menu;
const { Sider } = Layout;
class Sidebar extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.tags.length != nextProps.tags.length)
  //     return true;
  //   for (var i = 0; i < this.props.tags.length; i++) {
  //     if(this.props.tags[i] != nextProps.tags[i]){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  handleClick = (e) => {
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")[e.key].scrollIntoView()
    console.log('click ', e);
  }

  render() {
    return (
      <div className="sidebar" style={{ padding: "0", background: "#fff" }}>
        <Sider style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
          >
          
            {this.props.tags.map((item, index) => (
              // <Tooltip placement="right" title={item.text}>
              <Menu.Item
                className="sidebar-item"
                style={{ paddingLeft: "10px" }}
                title={item.text}
                key={index}
                onClick= {this.handleClick}
              >
                  {item.text}
              </Menu.Item>
              // </Tooltip>

            ))}
            {/* <Menu.Item style={{paddingLeft:"10px"}}key="1">Extremely broad drug laws under the INA makes a substantial number of immigrants inadmissible to the US
                    </Menu.Item>
                  <Menu.Item key="2">Even with state legalization of marijuana, immigrants are subject to strict federal drug laws
                </Menu.Item> */}

            {/* </SubMenu> */}
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default Sidebar;
