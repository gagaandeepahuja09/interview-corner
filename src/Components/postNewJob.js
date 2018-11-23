import React, { Component } from 'react';

class PostNewJob extends Component {
	state = {
		post: '',
	}
	onPostChange = (event) => {
		this.setState({ name: event.target.value });
	}

	render() {
		return (
			<textarea rows="4" cols="50" onChange = {(event) => 
				this.onPostChange(event)} value = {this.state.post}
			>
			Write New Jobs Openings 
			</textarea>
		);
	}
}

export default PostNewJob;