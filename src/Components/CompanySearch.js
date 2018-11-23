import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import Images  from '../Data/Images';

let companies = null;
let unique = null;
let companyDisplay = null;

const compImg = {
  'height': '200px',
};

class CompanySearch extends Component {

	state = {
		interviews: null,
	}

	loadInterviews = (company) => {
		this.props.history.push({
			pathname: '/interview-corner/company-interviews/',
			search: 'company' + '=' + encodeURIComponent(company),
		})
	}

	componentWillMount() {
		axios.get('https://interview-corner-1de29.firebaseio.com/updated-interviews.json')
		.then(response => {
			this.setState({	interviews: response.data  });
		});
	}

	render() {
		if(this.state.interviews) {
			companies = Object.values(this.state.interviews).map((interview) => {
				return interview.company;
			});
		}
		if(companies) {
			unique = companies.filter((value, index, self) => { 
    			return self.indexOf(value) === index;
			});
			console.log(unique);
		}
		if(unique) {
			companyDisplay = unique.map(
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
		console.log(companies);
		return (
				<div className = "card-columns">
					<Card title = "Companies">
						{companyDisplay}
					</Card>	
				</div>
			);
	}
}

export default CompanySearch;