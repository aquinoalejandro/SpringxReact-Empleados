import axios from 'axios'
import { useLoginStore } from '../store/LoginStore'

// aca lo que hago es que creo una instancia base de axios
export const api = axios.create({
  baseURL: 'http://localhost:8081/rh-app',
  timeout: 5000
})

// aca lo que hago es que agrego el token a todas las requests
api.interceptors.request.use((config) => {
  const token = useLoginStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
