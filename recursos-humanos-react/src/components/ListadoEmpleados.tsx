import React, { useEffect, useState } from 'react'
import axios from 'axios'


  export default function ListadoEmpleados() {
  const [Empleados, setEmpleados] = useState([]);



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
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Empleado</th>
          <th scope="col">Departmento</th>
          <th scope="col">Sueldo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>John</td>
          <td>Doe</td>
          <td>@social</td>
        </tr>
      </tbody>
  </table>


    </div>
  )
}
