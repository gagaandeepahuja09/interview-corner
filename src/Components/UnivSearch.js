import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Icon, Input, AutoComplete, Button, Row, Col, Card } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const Search = Input.Search;

let dataSource = ['Thapar Institute Patiala', 'BIT Mesra', 'CGC Landran', 'NIT Jamshedpur', 'NIT Durgapur', 'Baba Farid Group Of Institutions Bhatinda'];
let totalImgs = null;
let x = 0;

const univImg = {
  'height': '300px',
  'width': '500px',
};

class UnivSearch extends Component {
	state = {
		query: '',
		filteredSrc: ['Thapar Institute Patiala', 'BIT Mesra', 'CGC Landran', 'NIT Jamshedpur', 'NIT Durgapur', 'Baba Farid Group Of Institutions Bhatinda'],
		imgs: null,	 
		collegeSelected: '',
		loading: true,
	}

	onQuery = (value) => {
		this.setState({ query: value });
		let newSrc = dataSource.filter(
			(src) => {
				return src.toLowerCase().indexOf(value.toLowerCase()) > -1;
			}
		);
		this.setState({ filteredSrc: newSrc });
		console.log('Search', this.state.filteredSrc);
	}

	componentWillMount() {
		axios.get('https://interview-corner-1de29.firebaseio.com/univ-imgs.json')
		.then(response => {
			this.setState({	imgs: response.data  });
		});
		console.log('imgs', this.state.imgs);
		if(this.state.imgs)
			totalImgs = this.state.imgs;
	}


	findCollege = (val) => {
		const obj = this.state.imgs;
		const college = Object.keys(obj).find(key => obj[key] == val);
		this.setState({ collegeSelected : college });
		console.log(college);
		this.props.history.push({
			pathname: '/interview-corner/univ-interviews/',
			search: 'college' + '=' + encodeURIComponent(college),
		});
	}

	fetchImg = () => {
		let images = null;
		if(this.state.filteredSrc && totalImgs) {
			images = this.state.filteredSrc.map(
				(src) => {
					return totalImgs[src]
				}
			);
		}
		this.setState({	imgs: images  });
		console.log('IM',this.state.imgs);
	}


	render() {
		console.log('re', this.state.imgs);
		let images = null;
		if(this.state.imgs && this.state.filteredSrc) {
			if(x === 0) { 
				totalImgs = this.state.imgs;
				x = 1;
			}
			images = Object.keys(this.state.imgs).map(image => {
			return (
				<div>
					<div className="col-12 col-md-6 order-1">
						<div className="row-md-12">					
							<div className="card thumbnail"> <br/>
					  			<img className="card-img-top img-responsive img-rounded" src={this.state.imgs[image]} style = {univImg} /> <br/>
					  			<div className="card-body">
					  				<h4>{image >=0 && image<=99 ? null : image}</h4> <br/>
					    			<button onClick = { () => this.findCollege(this.state.imgs[image]) } className="btn btn-warning" >View Interviews</button><br/>
					  			</div>
					  			</div>
							</div>
						</div>
				</div>		
				);
			});
	}

	return (
		<div>
				<div className="col-12 col-md-6 order-1">
				<br/>
					<AutoComplete
					size = "large"
					placeholder="Select Institute" 
					onSearch = {this.onQuery}
					onSelect = {this.onQuery} 
					shape="circle" dataSource={this.state.filteredSrc} >
					<Search
						size = "large"
			    	  	onSearch={this.fetchImg}
			    	  	enterButton
			    	/>
					</AutoComplete>
				</div>
				<br/>
				<div className="col-12 col-md-6 order-2">
					<NavLink to="/interview-corner/company-search"><Button type="primary" size="large">Search By Company</Button></NavLink>
				</div>
			<br/> <br/><br/> <br/>
			{images}
		</div>
		);
	}
}

export default UnivSearch;