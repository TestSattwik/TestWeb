import axios from 'axios';

const api = axios.create({
    baseURL: 'https://testsattwik.in/', // Replace with your backend API URL
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers you need
    },
  });

  export {api}
  