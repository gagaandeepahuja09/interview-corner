import React, { Component } from 'react';
import UnivInterviews from './UnivInterviews';
import NewInterview from './NewInterview';
import NewJobs from './NewJobs';
import Interview from './Interview';
import UnivCompanyInterviews from './UnivCompanyInterviews';
import UnivSearch from './UnivSearch';
import Technical from './Technical';
import Aptitude from './Aptitude';
import CompanySearch from './CompanySearch';
import ProfilePage from './ProfilePage';
import CompanyInterviews from './CompanyInterviews';
import { Route, NavLink, Switch } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import LeftMenuPhone from './LeftMenuPhone';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';

class Header extends Component {
      state = {
        current: 'interviews',
        visible: false
      }
      showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    onClose = () => {
        this.setState({
          visible: false,
        });
      };  

    render() {
        return (
            <div>
            <nav className="navbar navbar-inverse">
              <div className="logo">
                <a href="">ALL ABOUT PLACEMENTS</a>
              </div>
              <div className="menuCon">
                <div className="leftMenu">
                  <LeftMenu />
                </div>
                <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                  <span className="barsBtn"></span>
                </Button>
                <Drawer
                  title="ALL ABOUT PLACEMENTS"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                  <LeftMenuPhone />
                </Drawer>
            </div>
            </nav>
            <Switch>
                    <Route path = "/interview-corner/univ-interviews/"  component = { UnivInterviews } />
                    <Route path = "/interview-corner/company-search/"  component = { CompanySearch } />
                    <Route path = "/interview-corner/company-interviews/"  component = { CompanyInterviews } />
                    <Route path = "/interview-corner/univ-company-interviews/"  component = { UnivCompanyInterviews } />
                    <Route path = "/" component = { UnivSearch } />
                    <Route path = "/interview-corner/interview"  exact component = { Interview } />
                    <Route path = "/interviews/new" exact component = { NewInterview } />
                    <Route path = "/new-jobs" exact component = { NewJobs } />
                    <Route path = "/test-skills/aptitude" exact component = {Aptitude} />
                    <Route path = "/test-skills/technical" exact component = {Technical} />
                    {/*<Route path = "/:id" exact  component = { FullPost } />*/}
            </Switch>
            </div>
        );
      }
    }

export default Header;


/* 
                <div className="topnav">
              <a href="#home" className="active">Logo</a>
              <div id="myLinks">
                <NavLink to = "/interviews/">Interviews</NavLink>
                <NavLink to = "/test-skills/">Test Your Skills</NavLink>
                <NavLink to = "/login/" exact >Login</NavLink>
                <NavLink to = "/new-jobs/" exact >New Job Openings</NavLink>
              </div>
              <a href="javascript:void(0);" className="icon" onclick="myFunction()">
                <i className="fa fa-bars"></i>
              </a>
            </div>

*/