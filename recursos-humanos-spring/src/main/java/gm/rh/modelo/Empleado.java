package gm.rh.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data // GENERA GETTER Y SETTER AUTOMATICOOO
@NoArgsConstructor // CREA CONTRUCTOR VACIO
@AllArgsConstructor // CREA CONSTRUCTOR CON TODITO
@ToString // CREA UN TOSTRING Q ES PARA QUE SE MUESTRE TODITO EN UN STRING
public class Empleado {
    @Id // INDICA QUE ES LA PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY) // GENERA UN ID AUTOINCREMENTABLE
    private Integer idEmpleado;

    private String nombre;
    private String departamento;
    private Double sueldo;
}
