package gm.rh.controlador;

import gm.rh.excepcion.RecursoNoEncontradoExcepcion;
import gm.rh.modelo.Empleado;
import gm.rh.servicio.empleado.IEmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rh-app")
@CrossOrigin("*")
public class EmpleadoControlador {
    private static final Logger logger =
            LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private IEmpleadoServicio empleadoServicio;

    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados(){
        var empleados = empleadoServicio.listarEmpleados();
        empleados.forEach((empleado) -> logger.info(empleado.toString()));
        return empleados;
    }

    @PostMapping("/empleado")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
        logger.info("Guardando empleado: " + empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/empleado/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);

        return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleado/{id}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
        empleadoServicio.eliminarEmpleado(empleado);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/empleado/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado empleado){
        Empleado empleadoActual = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleadoActual == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
        empleadoActual.setNombre(empleado.getNombre());
        empleadoActual.setDepartamento(empleado.getDepartamento());
        empleadoActual.setSueldo(empleado.getSueldo());

        Empleado actualizado = empleadoServicio.guardarEmpleado(empleadoActual);
        return ResponseEntity.ok(actualizado);
    }



}
