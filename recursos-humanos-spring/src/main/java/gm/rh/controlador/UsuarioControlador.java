package gm.rh.controlador;

import gm.rh.excepcion.RecursoNoEncontradoExcepcion;
import gm.rh.modelo.Usuario;

import gm.rh.servicio.usuario.IUsuarioServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rh-app")
@CrossOrigin("*")
public class UsuarioControlador {
    private static final Logger logger =
            LoggerFactory.getLogger(UsuarioControlador.class);

    @Autowired
    private IUsuarioServicio usuarioServicio;


    @PostMapping("/usuario/login")
    public Usuario autenticarUsuario(@RequestBody Usuario usuario){
        return usuarioServicio.autenticarUsuario(usuario.getEmail(), usuario.getPassword());
    }

    @PostMapping("/usuario/registrar")
    public Usuario agregarUsuario(@RequestBody Usuario usuario){
        return usuarioServicio.registrarUsuario(usuario);
    }

}
