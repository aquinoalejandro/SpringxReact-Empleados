package gm.rh.servicio.usuario;

import gm.rh.modelo.Usuario;

import java.util.List;

public interface IUsuarioServicio {
    //Lo tipico
    public Usuario registrarUsuario(Usuario usuario);
    public Usuario autenticarUsuario(String email, String password);

}
