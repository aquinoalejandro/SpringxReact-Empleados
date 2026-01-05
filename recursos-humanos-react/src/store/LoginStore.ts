import { create } from 'zustand'
import axios from 'axios'

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
    const response = await axios.post(
      'http://localhost:8081/rh-app/usuario/login',
      formdata,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status !== 200) {
      throw new Error('Error al iniciar sesión')
    }
    set({ token: response.data })
    console.log('Inicion Sesiada')
  },

  logout: () => {
    set({ token: '' })
  }
}))
