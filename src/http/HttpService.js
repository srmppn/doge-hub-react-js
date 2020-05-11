import Axios from 'axios';

const fetchClient = () => {
    console.log(process.env.REACT_APP_API_PATH)
    const defaultOptions = {
      baseURL: process.env.REACT_APP_API_PATH,
      method: '*',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Create instance
    let instance = Axios.create(defaultOptions);
  
    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
      return config;
    });
  
    return instance;
};
  
export default fetchClient();