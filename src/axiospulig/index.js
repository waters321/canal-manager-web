import axios from "axios";
import qs from "qs";

const Axios = axios.create({
  baseURL:'/api',
  timeout:10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});
Axios.interceptors.request.use(config => {
    if(config.method == "post"){
      console.log(11111)
       config.data = qs.stringify(config.data);
    }
    return config;
});
