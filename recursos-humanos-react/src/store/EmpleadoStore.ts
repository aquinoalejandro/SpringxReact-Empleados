import { create } from 'zustand'
import { api } from '../api/axios.ts'

// aca lo que hago es que defino la forma de un empleado
export interface Empleado {
  idEmpleado: number
  nombre: string
  departamento: string
  sueldo: number
}

// aca lo que hago es que defino lo que tiene mi store
interface EmpleadoState {

  empleados: Empleado[]
  addEmpleado: (empleado: Omit<Empleado, 'idEmpleado'>) => Promise<void>
  handleDeleteEmpleado: (idEmpleado: number) => Promise<void>
}

// aca lo que hago es que creo el store bien tipado
export const useEmpleadoStore = create<EmpleadoState>((set) => ({


  empleados: [],

  addEmpleado: async (empleado) => {
    await api.post('/empleado', empleado)
    const response = await api.get('/empleados')
    set({ empleados: response.data })
  },

  handleDeleteEmpleado: async (idEmpleado) => {
    await api.delete(`/empleado/${idEmpleado}`)
    const response = await api.get('/empleados')
    set({ empleados: response.data })
  }
}))
