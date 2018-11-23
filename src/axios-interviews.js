import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://interview-corner-1de29.firebaseio.com/',
});

export default instance;