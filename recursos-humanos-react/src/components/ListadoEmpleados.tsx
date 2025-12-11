import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NumericFormat } from 'react-number-format';

  export default function ListadoEmpleados() {
  const [Empleados, setEmpleados] = useState([{
    idEmpleado: 0,
    nombre: "",
    departamento: "",
    sueldo: 0
  }]);

  useEffect(() => {
    axios.get("http://localhost:8081/rh-app/empleados")
      .then((response) => {
        setEmpleados(response.data);
        console.log(Empleados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(Empleados);
  }, [Empleados]);

  return (
    <div className='continer' style={{width: '100%', display: 'flex'}}>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departmento</th>
            <th scope="col">Sueldo</th>
          </tr>
        </thead>
        <tbody>
          {Empleados.map((empleado) => (
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
