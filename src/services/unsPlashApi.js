import axios from 'axios'

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com/'
})

unsplashApi.interceptors.request.use(async config => {
    config.headers.Authorization = `Client-ID Qzv_BnHxAZPCFWcwxrdXhQYuYIe_-j7nACBGKZ6UxhY`;
    return config;
  });

export default unsplashApi;