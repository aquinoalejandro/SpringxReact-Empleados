import { useEffect, useState } from "react"
import AddEmpleado from "../../components/AddEmpleado"
import EditEmpleado from "../../components/EditEmpleado"
import ListadoEmpleados from "../../components/ListadoEmpleados"
import { useEmpleadoStore } from "../../store/EmpleadoStore";
import { api } from "../../api/axios";

function Dashboard() {
  const [editarEmpleado, setEditarEmpleado] = useState(false);

  useEffect(() => {
  const fetchEmpleados = async () => {
    try {
      const response = await api.get('/empleados');
      useEmpleadoStore.setState({ empleados: response.data });
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  fetchEmpleados();
}, []);



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
          <input
            type="checkbox"
            id="editarEmpleado"
            onChange={e => setEditarEmpleado(e.target.checked)}
            style={{width: '2%', marginRight: '10px'}}
          />
          <label htmlFor="editarEmpleado">Editar empleado</label>
        </div>

        <div style={{width: '100%', display: 'flex', padding: 20}}>
          <h1 style={{fontSize: 40}} className="lead">Lista de empleados</h1>
        </div>

        <div style={{width: '100%', padding: 20}}>
          {editarEmpleado ? <EditEmpleado /> : <ListadoEmpleados />}
        </div>
      </div>
    </>
  )
}

export default Dashboard