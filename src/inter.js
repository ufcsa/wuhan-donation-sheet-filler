import axios from 'axios';
import { Toast } from 'antd-mobile';

//intercept requetsts
axios.interceptors.request.use(function(config) {
	Toast.loading('loading', 0);
	return config;
});

//intercept response
axios.interceptors.response.use(function(config) {
	Toast.hide();

	return config;
});
