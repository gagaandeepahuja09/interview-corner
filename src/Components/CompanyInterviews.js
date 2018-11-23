import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

let selectedCompany = null;
let filteredInterviews = null;
let finalInterviews = null;

class CompanyInterviews extends Component {

	state = {
		interview: null,
	}

	loadInterview = (interview) => {
		console.log(interview);
		let foundKey = null;
		if(this.state.interviews) {
			Object.keys(this.state.interviews).forEach((element) => {
				if(this.state.interviews[element] === interview) {
					foundKey = element;
				}
			});
		}	
		/*if(interviews && filteredInterviews) {
			foundKey = arr.find(key => Object.entries(key[1]) === univarr);
			console.log(foundKey);
		}*/
		this.props.history.push({
			pathname: '/interview-corner/interview/',
			search: 'id' + '=' + encodeURIComponent(foundKey),
		});
	}

	componentWillMount() {
		axios.get('https://interview-corner-1de29.firebaseio.com/updated-interviews.json').
		then(response => 
			this.setState({ interviews : response.data}) );
	}

	render() {
		if(this.state.interviews) {
			const values = queryString.parse(this.props.location.search);
	 		selectedCompany = values.company;
	 		filteredInterviews = Object.values(this.state.interviews).filter(
				(interview) => {
					return (interview.company === selectedCompany);
				}
			);
			console.log(Object.values(filteredInterviews));
			if(filteredInterviews) {
				finalInterviews = filteredInterviews.map(
					(interview) => {
							return ( 
									<tr onClick={() => this.loadInterview(interview)}>
										<th scope = "row">{interview.name}</th>
										<th scope = "row">{interview.branch}</th>
										<th scope = "row">{interview.year}</th>
										<th scope = "row">{interview.college}</th>
									
									</tr>
								);
				});
			}
		}

		return (
				<table className="table table-hover">
				  <thead>
				    <tr>
				      <th scope="col">Name</th>
				      <th scope="col">Branch</th>
				      <th scope="col">Year</th>
				      <th scope="col">Institute</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{finalInterviews}
				  </tbody>
				</table>
			);
	}
}

export default CompanyInterviews;