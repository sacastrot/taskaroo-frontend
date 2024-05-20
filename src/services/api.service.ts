/**
 * This service is used to make HTTP requests to the API with a personalized
 * Axios instance. It has the base URL for the API and the request and response
 * interceptors. The request interceptor is used to add the token to the
 * Authorization header of the request. The response interceptor is used to
 * handle the response of the request. If the response status is 404, 401, 403
 * or 400, it throws the corresponding error. If the response status is different,
 * it throws an UnknownError.
 *
 * @requires axios
 * Axios is used to make HTTP requests to the API.
 *
 * @requires BadRequestError
 * BadRequestError is thrown when the client sends a request with invalid data.
 *
 * @requires ForbbidenError
 * ForbbidenError is thrown when the client sends a request that requires payment.
 *
 * @requires NotFoundError
 * NotFoundError is thrown when the client sends a request to a resource that does not exist.
 *
 * @requires UnauthorizedError
 * UnauthorizedError is thrown when the client sends a request with invalid credentials.
 *
 **/

// Models import of the errors
import {
  BadRequestError,
  ForbbidenError,
  NotFoundError,
  UnauthorizedError
} from '@/models/errors/ClientError'

// Axios import
import axios from 'axios'

// Base URL import from the environment variables
const BASE_URL = import.meta.env.VITE_API_URL

// Axios instance creation
const api = axios.create({
  baseURL: BASE_URL
})

/**
 * Request interceptor, used to log the request before it is sent.
 */
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

/**
 * Response interceptor, used to log the response before it is returned.
 * If the response status is 404, 401, 403 or 400, it throws the
 * corresponding error.
 *
 * If the response status is different, it throws an UnknownError.
 */
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
