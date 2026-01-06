import { create } from 'zustand'
import { api } from '../api/axios'

// aca lo que hago es que defino la forma del login
interface LoginForm {
  email: string
  password: string
}

// aca lo que hago es que defino lo que tiene mi store
interface LoginState {
  token: string
  handleLogin: (formdata: LoginForm) => Promise<void>
  logout: () => void
}

// aca lo que hago es que creo el store bien tipado
export const useLoginStore = create<LoginState>((set) => ({
  token: '',

  handleLogin: async (formdata) => {
    const response = await api.post('/usuario/login', formdata)
    set({ token: response.data })
  },

  logout: () => {
    set({ token: '' })
  }
}))
