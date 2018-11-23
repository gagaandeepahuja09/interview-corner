import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { Card } from 'antd';
import { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } from './Questions';

class UnivInterview extends Component {
	state = {
		interview: null,
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
	 	const id = values.id;
	 	axios.get('https://interview-corner-1de29.firebaseio.com/updated-interviews/' + id + '.json')
	 	.then(response => {
	 		this.setState({interview: response.data })
	 		console.log(response.data);
	 	});
	}

	render() {
		let interview = <div>Loading...</div>;
		if(this.state.interview) {
			const int = this.state.interview;
			console.log('int', int);
			interview = (
				<Card title= {int.name}>
					<div style={{
				        fontSize: 16,
				        color: 'rgba(0, 0, 0, 0.85)',
				        marginBottom: 16,
				        fontWeight: 500,
				      }}>
					    <h2>{int.company} {int.college}</h2>
					    <h3>{int.branch} {int.year}</h3>
					    <br/><hr/>
					    <div className = "alignLeft">
						<p style={{fontWeight: 900}}>Question: {q1}</p><p> Answer: {int.questions.q1}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q2}</p><p> Answer: {int.questions.q2}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q3}</p><p> Answer: {int.questions.q3}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q4}</p><p> Answer: {int.questions.q4}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q5}</p><p> Answer: {int.questions.q5}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q6}</p><p> Answer: {int.questions.q6}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q7}</p><p> Answer: {int.questions.q7}</p><hr/>
						<p style={{fontWeight: 900}}>Question: {q8}</p><p> Answer: {int.questions.q8}</p><hr/>
					   	<p style={{fontWeight: 900}}>Question: {q9}</p><p> Answer: {int.questions.q9}</p><hr/>
					   	<p style={{fontWeight: 900}}>Question: {q10}</p><p> Answer: {int.questions.q10}</p><hr/>
					   	</div>
				   	</div>
				</Card>
			)
		}

		return (
			<div>
			{interview}
			</div>
		);
	}
}

export default UnivInterview;