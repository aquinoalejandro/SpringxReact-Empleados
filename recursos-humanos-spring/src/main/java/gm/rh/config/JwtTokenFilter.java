package gm.rh.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.List;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final Key secretKey;

    public JwtTokenFilter(@Qualifier("jwtSecretKey") Key secretKey) {
        // aca guardo la clave con la que voy a validar la firma del token

        this.secretKey = secretKey;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // aca intento sacar el header Authorization
        String authHeader = request.getHeader("Authorization");

        // aca valido que exista y que sea Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // si no hay token sigo, spring despues decide si pasa o no
            filterChain.doFilter(request, response);
            return;
        }

        // aca saco solo el token sin el "Bearer "
        String token = authHeader.substring(7);

        try {
            // aca valido firma y expiracion del token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // aca saco el email (lo usamos como username para spring)
            String email = claims.getSubject();

            // aca saco el rol del token (ej: "USER", "ADMIN")
            String role = claims.get("role", String.class);

            // aca creo la autoridad que espera spring security
            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority("ROLE_" + role);

            // aca creo la autenticacion para spring
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(authority)
                    );

            // aca seteo detalles del request
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // aca le digo a spring "este usuario esta autenticado"
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtException e) {
            // aca si el token es invalido, expirado o trucho
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // aca sigo con la cadena normal de filtros
        filterChain.doFilter(request, response);
    }
}
