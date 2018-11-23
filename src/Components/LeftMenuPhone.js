import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Route, NavLink, Switch } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
   <Menu mode="vertical" className = "navColor navbar">
       <Menu.Item key="interviews">
          <NavLink to = "/interview-corner">
            <a href=""  style = {{ color: "grey" }}>Interviews</a>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="new-jobs">
          <NavLink to = "/new-jobs/" exact >
            <a href=""  style = {{ color: "grey" }}>New Job Openings</a>
          </NavLink>
        </Menu.Item>
        <SubMenu title={<span>Test Skills</span>} style = {{ color: "grey" }}>
          <Menu.Item key="Aptitude"><NavLink to = "/test-skills" exact>
          Aptitude</NavLink></Menu.Item>
          <Menu.Item key="setting:2">Technical</Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <NavLink to = "/interviews/new" exact>
            <a href=""  style = {{ color: "grey" }}>Add Interview</a>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;