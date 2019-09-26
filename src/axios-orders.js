import axios from 'axios';
import { baseURL } from './API_KEY/apiKeys';

const instance = axios.create({
	baseURL: baseURL,
});

export default instance;
