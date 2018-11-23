import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal" className = "navColor">
        <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>SignUp/Signin</span></span>}>
        <Menu.Item key="mail">
          <a href="" style = {{ color: "grey" }}>Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="" style = {{ color: "grey" }}>Signup</a>
        </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default RightMenu;