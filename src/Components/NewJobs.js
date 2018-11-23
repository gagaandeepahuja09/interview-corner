import React, { Component } from 'react';
import axios from 'axios';
import { Card, Select } from 'antd';

const Option = Select.Option;
let obj = null;
let arr = null;

function callback(key) {
  	console.log(key);
}

class NewJobs extends Component {
	state = {
		posts: null,
		disp: null,
	}

	handleChange = () => {
		if(this.state.disp) {
			const newArr = this.state.disp.reverse();
			this.setState({ disp: newArr });
		}
	}

	componentWillMount() {
		axios.get('https://interview-corner-1de29.firebaseio.com/new-jobs.json')
		.then(response => {
			this.setState({ posts: response.data });
			if(response.data) {
				this.setState({ disp: Object.values(response.data) });
			}
		});
	}

	componentDidMount() {
		if(this.state.posts) {
			arr = Object.values(this.state.posts);
			this.setState({ disp: arr });
		}
	}
	
	render() {
	let posts = 
		(
			<div className="card text-white bg-info mb-3" style = {{ 'max-width': '710px', 'margin': '0 auto', 'padding': '10px', 'border-radius': '10px' }}>
			  <div className="card-body">
			    <h2 className="card-title">We Will Be Putting Job Openings Everyday</h2>
			    <br/>
			    <h3 className="card-text">For openings in various companies do follow our website continously.</h3>
			  </div>
			</div>
			)
	if(this.state.posts) {
		let k = 0;
		arr = Object.values(this.state.posts);
		if(this.state.disp) {
			posts = this.state.disp.map(post => {
				return (
					<div>
					<div className="card text-white bg-info mb-3" key = { k++ } style = {{ 'max-width': '1010px', 'margin': '0 auto', 'backgroundColor': '#00595c', 'padding': '10px', 'border-radius': '10px' }}>
					<br/>
					  <div className="card-body">
					    <h3> { post.newPost } </h3>
					  </div>
					<br/>
					</div>
					<br/><br/>
					</div>
				);
			});
		}
	}
	if(this.state.post) {
		return (
			<div>
		    	Sort By : <Select defaultValue="oldest" onChange={this.handleChange}>
		      				<Option value="oldest">Oldest First</Option>
		      				<Option value="newest">Newest First</Option>
		      			</Select>
				<br/> <br/>
				{posts}
			</div>
		);
	}
	else {
		return (
			<div>{posts}</div>
		);
	}
	}
}

export default NewJobs;