import { NumericFormat } from 'react-number-format'
import { useEmpleadoStore } from '../store/EmpleadoStore'


export default function ListadoEmpleados() {
  const empleados = useEmpleadoStore(state => state.empleados)



  return (
    <div className='container bg-body-tertiary p-3 rounded-2 overflow-auto' style={{ height: 400 }}>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Empleado</th>
            <th>Departamento</th>
            <th>Sueldo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado: any) => (
            <tr key={empleado.idEmpleado}>
              <td>{empleado.idEmpleado}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td>
                <NumericFormat
                  value={empleado.sueldo}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
