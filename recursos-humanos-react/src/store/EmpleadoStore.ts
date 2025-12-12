import { create } from 'zustand'
import axios from 'axios'

// aca lo que hago es que defino la forma de un empleado
export interface Empleado {
  idEmpleado: number
  nombre: string
  departamento: string
  sueldo: number
}

// aca lo que hago es que defino lo que tiene mi store
interface EmpleadoState {
  handleDeleteEmpleado: any
  empleados: Empleado[]
  fetchEmpleados: () => Promise<void>
  addEmpleado: (empleado: Omit<Empleado, "idEmpleado">) => Promise<void>
}

// aca lo que hago es que creo el store bien tipado
export const useEmpleadoStore = create<EmpleadoState>((set) => ({
  empleados: [],

  fetchEmpleados: async () => {
    const response = await axios.get("http://localhost:8081/rh-app/empleados")
    set({ empleados: response.data })
  },

  addEmpleado: async (empleado) => {
    await axios.post("http://localhost:8081/rh-app/empleado", empleado)
    const response = await axios.get("http://localhost:8081/rh-app/empleados")
    set({ empleados: response.data })
  },


  handleDeleteEmpleado: async (idEmpleado: number) => {
    await axios.delete(`http://localhost:8081/rh-app/empleado/${idEmpleado}`)
    const response = await axios.get("http://localhost:8081/rh-app/empleados")
    set({ empleados: response.data })
  }
}))
