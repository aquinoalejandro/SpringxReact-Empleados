import ListadoEmpleados from "./components/ListadoEmpleados"

function App() {
  return (
    <>
    <div className="container">
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <h1>Recursos Humanos</h1>
      </div>
      <div style={{width: '100%', display: 'flex',  padding: 20}}>
        <h1 style={{fontSize: 40}} className="lead" >Lista de empleados</h1>
        <ListadoEmpleados />
      </div>
        </div>
    </>
  )
}

export default App
