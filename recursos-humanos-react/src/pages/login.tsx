import React, { useState } from 'react';
import { BsEnvelopeAt, BsShieldLock, BsGoogle, BsMicrosoft } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { useLoginStore } from '../store/LoginStore';
import { useNavigate } from "react-router";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  try {
    await useLoginStore.getState().handleLogin(formData);
    navigate('/dashboard');
  } catch (err) {
    console.error('error de login', err);
  }
};


  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"

    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <div className="card-body p-4 p-md-5">

          {/* Cabecera */}
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <BiLogIn size={30} />
            </div>
            <h2 className="fw-bold text-dark mb-1">Bienvenido al Sistema de RH</h2>
            <p className="text-secondary small">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold small text-uppercase text-secondary">
                Correo Electrónico
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 text-secondary">
                  <BsEnvelopeAt />
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 fs-6"
                  id="email"
                  name="email"
                  placeholder="nombre@empresa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="password" className="form-label fw-semibold small text-uppercase text-secondary">
                  Contraseña
                </label>
                <a href="#!" className="text-decoration-none text-primary small fw-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 text-secondary">
                  <BsShieldLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-light border-start-0 border-end-0 fs-6"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={{ boxShadow: 'none' }}
                />
                <button
                  className="input-group-text bg-light border-start-0 text-secondary cursor-pointer"
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* Checkbox Recordarme */}
            <div className="mb-4 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label text-secondary small" htmlFor="rememberMe">
                  Mantener sesión iniciada
                </label>
              </div>
            </div>

            {/* Botón Principal */}
            <div className="d-grid mb-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg  py-2 rounded-3 shadow-sm"
                style={{ letterSpacing: '1px' }}
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Separador */}
            <div className="text-center mb-4">
              <div className="position-relative">
                <hr className="text-secondary opacity-25" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-secondary small">
                  o accede con
                </span>
              </div>
            </div>

            {/* Botones Sociales */}
            <div className="row g-2">
              <div className="col-6">
                <button type="button" className="btn btn-outline-light text-dark w-100 border hover-shadow">
                  <BsGoogle className="text-danger me-2" /> <span className="small fw-medium">Google</span>
                </button>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-outline-light text-dark w-100 border hover-shadow">
                  <BsMicrosoft className="text-primary me-2" /> <span className="small fw-medium">Microsoft</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer de la tarjeta */}
        <div className="card-footer py-3 border-0 bg-white text-center rounded-bottom-4">
          <p className="text-muted small mb-0">
            ¿Aún no tienes cuenta?
            <a href="#!" className="text-primary fw-bold ms-1 text-decoration-none">
              Registrar usuario
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}