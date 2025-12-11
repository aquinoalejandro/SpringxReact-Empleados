import axios from 'axios'
import React from 'react'

export default function AddEmpleado() {
  const [nombre, setNombre] = React.useState("")
  const [departamento, setDepartamento] = React.useState("")
  const [sueldo, setSueldo] = React.useState(0)

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    const empleado = {
      nombre: nombre,
      departamento: departamento,
      sueldo: sueldo
    }

    await axios.post("http://localhost:8081/rh-app/empleado", empleado, {
      headers: {
        "Content-Type": "application/json"
      }
    })

  }


  return (
    <div className='container' style={{flexDirection: "column"}}>
      <form onSubmit={
        handleSubmit
      }>

        <input type="text" className='form-control' placeholder='Nombre' onChange={e => setNombre(e.target.value)} />
        <input type="text" className='form-control' placeholder='Departamento' onChange={e => setDepartamento(e.target.value)} />
        <input type="number" className='form-control' placeholder='Sueldo' onChange={e => setSueldo(parseInt(e.target.value))} />

        <button type='submit' className='btn btn-primary'>Guardar empleado</button>

      </form>

    </div>
  )
}
