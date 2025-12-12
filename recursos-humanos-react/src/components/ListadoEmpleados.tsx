import React, { useEffect } from 'react'
import { NumericFormat } from 'react-number-format';
import { useEmpleadoStore } from '../store/EmpleadoStore';


  export default function ListadoEmpleados() {

  const empleados = useEmpleadoStore(state => state.empleados);
  const fetchEmpleados = useEmpleadoStore(state => state.fetchEmpleados);

  // aca lo que hago es que cargo los empleados al iniciar
  useEffect(() => {
    fetchEmpleados()
  }, []);

  return (
    <div className='container scrollspy-example bg-body-tertiary p-3 rounded-2 overflow-auto' style={{ height: "400px" }}>

      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado : any) => (
            <tr key={empleado.idEmpleado}>
              <th scope="row">{empleado.idEmpleado}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td><NumericFormat
                value={empleado.sueldo}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'$'}
                decimalScale={2} fixedDecimalScale
              /></td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}
