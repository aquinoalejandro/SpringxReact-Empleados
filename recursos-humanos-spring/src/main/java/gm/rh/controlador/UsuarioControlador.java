package gm.rh.controlador;

import gm.rh.modelo.Usuario;
import gm.rh.servicio.usuario.IUsuarioServicio;
import gm.rh.servicio.jwt.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private JwtService jwtService;


    @PostMapping("/usuario/login")
    public String autenticarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioAutenticado = usuarioServicio.autenticarUsuario(usuario.getEmail(), usuario.getPassword());
        return jwtService.generarToken(usuarioAutenticado.getEmail(), usuarioAutenticado.getRoles());
    }

    @PostMapping("/usuario/registrar")
    public String agregarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioRegistrado = usuarioServicio.registrarUsuario(usuario);
        return jwtService.generarToken(usuarioRegistrado.getEmail(), usuarioRegistrado.getRoles());
    }

    @PostMapping("/usuario/")
    public Object traerUsuario(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "").trim();
        return jwtService.getUsuario(token);
    }


}
