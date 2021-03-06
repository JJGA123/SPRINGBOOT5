import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../src/entity/cliente';
import { ClienteService } from '../../../../src/service/cliente-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo: String = "Crear cliente";
  boton: String = "Crear";
  errores:any;

  constructor(private clienteService: ClienteService, private router: Router,private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
      this.activateRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.titulo="Actualizar cliente"
          this.boton="Actualizar"
          this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
        }
      })
  }

  create(): void{
    if(this.boton=='Crear'){
      this.clienteService.create(this.cliente)
        .subscribe(json => {
          this.router.navigate(['/clientes'])
            swal.fire('Nuevo cliente',`Cliente ${json.cliente.nombre} creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors;
          console.log(err);
        }
      )
    }else{
      this.update();
    }
  }

  update(): void{
    this.clienteService.update(this.cliente)
      .subscribe( json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado',`Cliente ${json.cliente.nombre} actualizado con éxito`, 'success');
      })
  }
}
