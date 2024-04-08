import {
  BadRequestError,
  ForbbidenError,
  NotFoundError,
  UnauthorizedError
} from '@/models/errors/ClientError'

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use(
  (config) => {
    console.log('Request:', config)
    return config
  },
  (error) => {
    console.log('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestError(error.response.data)
        case 401:
          throw new UnauthorizedError(error.response.data)
        case 403:
          throw new ForbbidenError(error.response.data)
        case 404:
          throw new NotFoundError(error.response.data)
      }
    }

    throw error
  }
)

export default api
