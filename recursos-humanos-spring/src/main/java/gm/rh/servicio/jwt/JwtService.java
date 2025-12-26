package gm.rh.servicio.jwt;

import gm.rh.modelo.Usuario;
import gm.rh.servicio.usuario.UsuarioDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import static io.jsonwebtoken.Jwts.*;

@Service
public class JwtService {

    private final Key secretKey;

    // aca recibo la clave del properties
    public JwtService(@Value("${jwt.secret}") String jwtSecret) {
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // aca genero el token
    public String generarToken(String email, String role) {
        return builder()
                .setSubject(email)          // quien es el usuario
                .claim("role", role)        // su rol
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(secretKey)
                .compact();
    }


    public UsuarioDTO getUsuario(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setEmail(claims.getSubject());
        usuario.setRoles(claims.get("role", String.class));
        return usuario;
    }


}