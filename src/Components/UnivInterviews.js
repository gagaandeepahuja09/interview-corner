import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { List, Spin, Icon, Card, Avatar } from 'antd';
import Images  from '../Data/Images';

let interviews = null;
let  filteredInterviews = null;
let collegeInterviews = null;
let selectedCollege = null;
let uniqueCompanies = null;

const compImg = {
  'height': '200px',
};

class Interviews extends Component {

	state = {
		interviews: null,
		filteredInterviews: null,
	}

	loadInterviews = (company) => {
		this.props.history.push({
			pathname: '/interview-corner/univ-company-interviews/',
			search: 'college' + '=' + encodeURIComponent(selectedCollege) + '&' + 'company' + '=' + encodeURIComponent(company),
		})
	}

	componentDidMount() {
		axios.get('https://interview-corner-1de29.firebaseio.com/updated-interviews.json').
		then(response => 
			this.setState({ interviews : response.data}) );
	}

	render() {

		let collegeFilter = null;
		if(this.state.interviews) {
			const values = queryString.parse(this.props.location.search);
	 		selectedCollege = values.college;
	 		collegeFilter = Object.values(this.state.interviews).filter(
				(interview) => {
					return interview.college === selectedCollege;
				}
			);
			let companies = null;
			if(collegeFilter) {
				companies = Object.values(collegeFilter).map(
					(interview) => {
						return interview.company;
				});
			}
			uniqueCompanies = companies.filter((value, index, self) => { 
    			return self.indexOf(value) === index;
			});
		}

		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

		let companyDisplay = <Spin indicator = {antIcon} />
		if(uniqueCompanies) {
			companyDisplay = uniqueCompanies.map(
				(comp) => {
					return (
						<div>
							<div className="col-12 col-md-6 order-1">
								<div className="row-md-12">					
									<div className="card thumbnail"><br/>
							  			<img className="card-img-top img-responsive img-rounded" src={Images[comp]} style = {compImg}/>
							  			<div className="card-body"><br/>
							    			<button onClick = { () => this.loadInterviews(comp) } className="btn btn-primary" >{comp}</button><br/>
							  			</div>
							  			</div>
									</div>
								</div>
						</div>		
				);
				});
		}
		collegeInterviews = <div>Loading...</div>
		if(this.state.interviews) {
			const values = queryString.parse(this.props.location.search);
	 		selectedCollege = values.college;
	 		filteredInterviews = Object.values(this.state.interviews).filter(
				(interview) => {
					return interview.college === selectedCollege;
				}
			);
			if(filteredInterviews) {
				collegeInterviews = Object.values(filteredInterviews).map(
					(interview) => {
							return ( <div key={interview} onClick={() => this.loadInterview(interview)}><NavLink to = "/interview-corner/univ-interview">
								<a href="#" className="list-group-item list-group-item-success notFull">
								<h4>{interview.name} Interview for {interview.company}</h4></a></NavLink></div>)
							console.log('name', interview.name); 
					}
				);
			}
		}
	    return (
	    	<div className = "card-columns">
				<Card title = {selectedCollege}>
					{companyDisplay}
				</Card>
			</div>
    	);
	}
}

export default Interviews;