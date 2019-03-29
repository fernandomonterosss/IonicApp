import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  
  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosServices: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) { }

  
  ngOnInit() {}

  listaSeleccionada( lista: Lista ){

    if ( this.terminada ){
      
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);

    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    
  }
 async editarLista( lista: Lista ){
      const alert = await this.alertCtrl.create({
        header: 'Editar Lista',
        inputs:[
          {
            name: 'titulo',
            type: 'text',
            value: lista.titulo,
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.lista.closeSlidingItems();
            }
          },
          {
            text: 'Actualizar',
            handler: (data) =>{
              if ( data.titulo.lenght === 0 ){
                return;
              }
              lista.titulo = data.titulo;
              this.deseosServices.guardarStorage();
              this.lista.closeSlidingItems();
            }
          }
        ]
      });
      
      alert.present();        

  }

  borrarLista( lista: Lista ){
    this.deseosServices.borrarLista( lista );
  }
}
