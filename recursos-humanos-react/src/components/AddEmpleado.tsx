import { useEmpleadoStore } from '../store/EmpleadoStore';
import React from "react";

export default function AddEmpleado() {
  const addEmpleado = useEmpleadoStore(state => state.addEmpleado);

  const [nombre, setNombre] = React.useState("");
  const [departamento, setDepartamento] = React.useState("");
  const [sueldo, setSueldo] = React.useState(0);
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const empleado = { nombre, departamento, sueldo };

    await addEmpleado(empleado);

    // Reset form
    setNombre("");
    setDepartamento("");
    setSueldo(0);
    setValidated(false);
  };

  return (
    <form
      className={`needs-validation ${validated ? 'was-validated' : ''}`}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="d-flex flex-column flex-md-row gap-2 w-100">
        <div className="flex-fill">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            minLength={2}
          />
          <div className="invalid-feedback">
            Por favor ingresa un nombre válido (mínimo 2 caracteres).
          </div>
        </div>

        <div className="flex-fill">
          <input
            className="form-control"
            placeholder="Departamento"
            value={departamento}
            onChange={e => setDepartamento(e.target.value)}
            required
            minLength={2}
          />
          <div className="invalid-feedback">
            Por favor ingresa un departamento válido (mínimo 2 caracteres).
          </div>
        </div>

        <div className="flex-fill">
          <input
            className="form-control"
            type="number"
            placeholder="Sueldo"
            value={sueldo || ""}
            onChange={e => {
              const value = parseInt(e.target.value);
              setSueldo(isNaN(value) ? 0 : value);
            }}
            required
            min="1"
            step="1"
          />
          <div className="invalid-feedback">
            Por favor ingresa un sueldo válido (mayor a 0).
          </div>
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary"
            style={{width: '100%', minWidth: '150px'}}
            type="submit"
          >
            Crear empleado
          </button>
        </div>
      </div>
    </form>
  );
}