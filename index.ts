import { IProyecto } from '@interfaces/IProyecto';
import { IMisCriptoacciones } from '@interfaces/IMis_criptoacciones';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserRegistro, IDatosPrivados, IDatosPublico } from '@interfaces/IUser';
import {  IVisitas, IMisReferidos } from '@interfaces/IMi_referido';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPedidoVenta, ICriptoaccionesEnVenta } from '@interfaces/IMercado';
import { IPedidoComprar, IPedidoCompraDirecta } from '@interfaces/IMercado';
import { IMisRetiros } from '@interfaces/mis_retiros.model';
import { AlertService } from '../_alert.service';
import { IMisTransacciones } from '@interfaces/IMis_transacciones';
import { IMisCompras } from '@interfaces/mis_compras';
import { IListaGanadores } from '@interfaces/ILista_ganadores'; 
import { fire,Uids } from '@interfaces/IColecciones';



@Injectable({
  providedIn: 'root'
})

export class AfsUserService {
  uid:string = '';
  subDocumento$:Observable<IDatosPrivados>
  documento$:Observable<IDatosPublico>;
  coleccion$:Observable<ICriptoaccionesEnVenta[]>;
  subColeccion$:Observable<IMisReferidos[]|IMisTransacciones[]|IMisCriptoacciones[]>;
  coleccionDoc$:Observable<any>;
  constructor(
    private afs:AngularFirestore,
    private sv_alert:AlertService,
    ) {  

     }
//                              CONSULTAR DATOS

async obtenerColeccion(num:number,cantidad:number = 10000000000000):Promise<Observable<IProyecto[]|IDatosPrivados[]|IListaGanadores[]|ICriptoaccionesEnVenta[]>> { 
    return this.coleccion$ = this.afs.collection(`${fire.coleccion[num]}`, ref => ref.limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProyecto & IDatosPrivados &  IListaGanadores & ICriptoaccionesEnVenta;
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }

async obtenerColeccionAsc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<IProyecto[]|IDatosPrivados[]|IListaGanadores[]|ICriptoaccionesEnVenta[]>> { 
    return this.coleccion$ = this.afs.collection(`${fire.coleccion[num]}`, ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProyecto & IDatosPrivados &  IListaGanadores & ICriptoaccionesEnVenta;
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }

async obtenerColeccionDesc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<IProyecto[]|IDatosPrivados[]|IListaGanadores[]|ICriptoaccionesEnVenta[]>> { 
    return this.coleccion$ = this.afs.collection(`${fire.coleccion[num]}`, ref => ref.orderBy(`${orden}`,'desc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProyecto & IDatosPrivados &  IListaGanadores & ICriptoaccionesEnVenta;
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }




  async obtenerSubColeccion(num:number,documento:string,subNum:number,cantidad:number = 100000000000):Promise<Observable<IMisReferidos[]|IMisTransacciones[]|IMisCriptoacciones[]>> { 
    return this.subColeccion$ = this.afs.collection(`${fire.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${fire.subcoleccion[subNum]}`,ref => ref.limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as  IMisReferidos|IMisTransacciones|IMisCriptoacciones;
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }

  async obtenerSubColeccionAsc(num:number,documento:string,subNum:number,cantidad:number = 100000000000,orden?:string):Promise<Observable<IMisReferidos[]|IMisTransacciones[]|IMisCriptoacciones[]>> { 
    return this.subColeccion$ = this.afs.collection(`${fire.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${fire.subcoleccion[subNum]}`,ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as  IMisReferidos|IMisTransacciones|IMisCriptoacciones;
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }
   
  async obtenerSubDocumento(num:number,documento:string,subcoleccion:string,subdocumento:string) {

    return this.subDocumento$ = this.afs.doc<IDatosPrivados>(`${fire.coleccion[num]}/${documento}/${subcoleccion}/${subdocumento}`)
    .snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null
      } else {
        const uid = action.payload.id;
        const data = action.payload.data() as IDatosPrivados;
        return { uid, ...data };
      }
    })) 
  }
  
  async obtenerDocumento(num:number,documento:string):Promise<Observable<IProyecto|IDatosPublico>> {
    return this.documento$ = this.afs.doc(`${fire.coleccion[num]}/${documento}`)
    .snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null
      } else {
        const uid = action.payload.id;
        const data = action.payload.data() as IProyecto & IDatosPublico;
        return { uid, ...data };
      }
    }))
  }

  
  async agregarDocumento(num:number,documento:IUserRegistro){
    this.afs.collection<IUserRegistro>(`${fire.coleccion[num]}`).add(documento);
  }

  async agregarSubDocumento(num:number,documento:string,subcoleccion:string,subdocumento:IMisRetiros|IPedidoVenta|IVisitas|IPedidoComprar|IPedidoCompraDirecta|IMisCompras,alerta?:boolean,alertaValor?:string){
  await  this.afs.collection(`${fire.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${subcoleccion}`)
    .add(subdocumento);
    if(alerta) {
      this.sv_alert.AlertMensaje(`${alertaValor}`)
    }
  }


//                            ACTUALIZACIONES


async actualizarDocumento(num:number,documento:string,datos:IDatosPublico|IMisRetiros,alerta?:boolean,alertaValor?:string){
  await this.afs.doc<any>(`${fire.coleccion[num]}/${documento}`)
  .update(datos);
  if(alerta) {
    this.sv_alert.AlertMensaje(`${alertaValor}`)
  }
}



async actualizarSubDocumento(num:number,documento:string,subcoleccion:string,subdocumento:string,datos:IMisRetiros,alerta?:boolean,alertaValor?:string){
  await this.afs.doc<IMisRetiros>(`${fire.coleccion[num]}/${documento}/${subcoleccion}/${subdocumento}`)
  .update(datos);
  if(alerta) {
    this.sv_alert.AlertMensaje(`${alertaValor}`)
  }
}


}