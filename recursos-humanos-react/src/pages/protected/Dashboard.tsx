import { useState } from "react"
import AddEmpleado from "../../components/AddEmpleado"
import EditEmpleado from "../../components/EditEmpleado"
import ListadoEmpleados from "../../components/ListadoEmpleados"

function Dashboard() {
  const [editarEmpleado, setEditarEmpleado] = useState(false);

  return (
    <>

    <div className="container">
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, paddingBottom: 0}}>
        <h1>Recursos Humanos</h1>
      </div>

      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0}}>
              <AddEmpleado />
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <input type="checkbox" id="editarEmpleado" onChange={e => setEditarEmpleado(e.target.checked)} style={{width: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20}} />
          <label htmlFor="editarEmpleado">Editar empleado</label>
      </div>
      <div style={{width: '100%', display: 'flex',  padding: 20}}>
        <h1 style={{fontSize: 40}} className="lead" >Lista de empleados</h1>
          {editarEmpleado ? <EditEmpleado /> : <ListadoEmpleados /> }


      </div>
        </div>
    </>
  )
}

export default Dashboard
