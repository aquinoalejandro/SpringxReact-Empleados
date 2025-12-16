package gm.rh.servicio.usuario;

import gm.rh.modelo.Usuario;
import gm.rh.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UsuarioServicio implements IUsuarioServicio {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio, PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }


    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepositorio.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("el email ya esta registrado");
        }
        // hasheo antes de guardar
        usuario.setPassword(
                passwordEncoder.encode(usuario.getPassword())
        );
        usuario.setRoles("USER");

        return usuarioRepositorio.save(usuario);
    }


    public Usuario autenticarUsuario(String email, String password) {
        Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElse(null);

        if (usuario == null) {
            return null;
        }

        // Comparar la contraseña en texto plano con el hash almacenado
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            return null;
        }

        return usuario;
    }

}
