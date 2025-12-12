import React, { useEffect } from 'react'
import axios from 'axios';
import { useEmpleadoStore } from '../store/EmpleadoStore';

export default function EditEmpleado() {
  const empleados = useEmpleadoStore(state => state.empleados);
  const fetchEmpleados = useEmpleadoStore(state => state.fetchEmpleados);
  const handleDeleteEmpleado = useEmpleadoStore(state => state.handleDeleteEmpleado);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const handleActualizar = async (e: React.FormEvent<HTMLFormElement>, idEmpleado: number) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const empleado = {
      idEmpleado,
      nombre: formData.get('nombre') as string,
      departamento: formData.get('departamento') as string,
      sueldo: parseFloat(formData.get('sueldo') as string) || 0
    };

    try {
      await axios.put(`http://localhost:8081/rh-app/empleado/${idEmpleado}`, empleado);
      fetchEmpleados();
      alert('Empleado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar empleado');
    }
  };

  return (
    <div className='container scrollspy-example bg-body-tertiary p-3 rounded-2 overflow-auto' style={{ height: "400px", width: "100%" }}>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Botones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado: any) => (
            <tr key={empleado.idEmpleado}>
              <th scope="row">
                {empleado.idEmpleado}
              </th>
              <td>
                <form
                  id={`form-${empleado.idEmpleado}`}
                  onSubmit={(e) => handleActualizar(e, empleado.idEmpleado)}
                  className="d-inline"
                >
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={empleado.nombre}
                    className="form-control"
                  />
                </form>
              </td>
              <td>
                <input
                  form={`form-${empleado.idEmpleado}`}
                  type="text"
                  name="departamento"
                  defaultValue={empleado.departamento}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  form={`form-${empleado.idEmpleado}`}
                  type="number"
                  name="sueldo"
                  defaultValue={empleado.sueldo}
                  className="form-control"
                />
              </td>
              <td>
                <button
                  form={`form-${empleado.idEmpleado}`}
                  className="btn btn-primary"
                  style={{ width: '50%' }}
                  type="submit"
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: '50%' }}
                  onClick={() => handleDeleteEmpleado(empleado.idEmpleado)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}