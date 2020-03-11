import * as admin from 'firebase-admin';
import { firestore } from '../utils/firebase_opcionales';
import { IMisTransacciones } from '@interfaces/IMis_transacciones';
import { IWallets } from '@interfaces/IWallets';
import { IProyecto } from '@interfaces/IProyecto';
import { IUser, IDatosPublico, IUserRegistro,IMisLikeProyectos } from '@interfaces/IUser';
import { IMisCriptoacciones } from '@interfaces/IMis_criptoacciones';
import { IRetiroSolicitud } from '@interfaces/retiro_solicitud';
import { ICriptoaccionesEnVenta } from '@interfaces/IMercado';
import { db } from '@interfaces/IColecciones';
import { IMisReferidos } from '@interfaces/IMi_referido';

const FieldValue = admin.firestore.FieldValue;
const increment = FieldValue.increment(1);
const decrement = FieldValue.increment(-1);


const obtenerDatosDocumento = async(num:number,documento:string):Promise<IUser|IProyecto|IWallets|void>=> {
    try{
        let doc = await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`).get();
        let data = doc.data() as IUser;
        return data
    } 
    catch(err) { 
        console.error(err) 
    }
};

/*      OBTENER UNA COLECCION   */
const obtenerDatosSubColeccion = async(num:number,documento:string,num2:number):Promise<IMisCriptoacciones[]|IMisTransacciones[]|any> => {
    try{
        let datos_coleccion:IMisCriptoacciones[]|IMisTransacciones[] = []
        let collection = await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .collection(`${db.subcoleccion[num2]}`).get();
        collection.forEach(doc => {
            let data =  doc.data() as IMisCriptoacciones & IMisTransacciones;
            datos_coleccion.push(data);
        });  
        return datos_coleccion 
    } 
    catch(err) { 
        console.error(err) 
    }
};


const agregarDocumento = async(num:number,documento:IUser|IUserRegistro|IRetiroSolicitud|ICriptoaccionesEnVenta):Promise<any|void> => {
    try{
        let agregado = await firestore
        .collection(`${db.coleccion[num]}`)
        .add(documento)
        return agregado;
    } catch(err) {
        console.error(err)
    }
}


const agregarSubDocumento = async(num:number,documento:string|undefined,num2:number,subdocumento:IMisReferidos|IMisCriptoacciones|IMisTransacciones):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .collection(`${db.subcoleccion[num2]}`)
        .add(subdocumento);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}

const CrearDocumento = async(num:number,documento:string,campos:IUser):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .set(campos);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}

const CrearSubDocumento = async(num:number,documento:string,num2:number,subdocumento:string,documentocreado:IDatosPublico|IUserRegistro|IMisCriptoacciones|IMisTransacciones|IMisLikeProyectos):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .collection(`${db.subcoleccion[num2]}`)
        .doc(`${subdocumento}`)
        .set(documentocreado);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}


const actualizarDocumento = async(num:number,documento:string|undefined,actualizar:IUser|IProyecto|IWallets|IMisLikeProyectos|IDatosPublico):Promise<IUser|IProyecto|IWallets|void> => { 
    try{
        await firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .update(actualizar);
        console.log('actualizado!')
    } catch(err) {
        console.error(err)
    }
}

const actualizarSubDocumento = async(num:number,documento:string,num2:number,subdocumento:string,actualizar:IUser|IProyecto):Promise<IUser|IProyecto|void> => { 
    try{
        await firestore.collection(`${db.coleccion[num]}`)
        .doc(`${documento}`)
        .collection(`${ db.subcoleccion[num2] }`)
        .doc(`${subdocumento}`)
        .update(actualizar);
        console.log('actualizado!')
    } catch(err) {
        console.error(err)
    }
}

const eliminarDocumento = async (num:number,uid:string) => {
    try {
        await firestore.doc(`${db.coleccion[num]}/${uid}`).delete();
    }   

    catch(err) { 
        console.error(err)
    }
}


    // AUMENTA ME GUSTA DE UN PROYECTO
 const meGustaIncrementar = async  (num:number,uid_proyecto:string,user_uid:string) => {
        try{
        
            firestore
            .collection(`${db.coleccion[num]}`)
            .doc(`${uid_proyecto}`)
            .update({ 
                me_gusta_total: increment,
                users_likes:FieldValue.arrayUnion(user_uid)
            });
        }
    
        catch(err)  {
            console.error(err)
        }
    }
    
// DIMINUYE ME GUSTA DE UN PROYECTO
const noMeGustaDecrementar = async (num:number,uid_proyecto:string,user_uid:string) => {
    try{
    
        firestore
        .collection(`${db.coleccion[num]}`)
        .doc(`${uid_proyecto}`).update({ 
            me_gusta_total: decrement,
            users_likes:FieldValue.arrayRemove(user_uid)
        });
    }
    catch(err)  {
        console.error(err)
    }
}


export { 
    meGustaIncrementar,
    noMeGustaDecrementar,
    actualizarDocumento,
    actualizarSubDocumento,
    agregarDocumento,
    agregarSubDocumento, 
    CrearSubDocumento,
    CrearDocumento,
    eliminarDocumento,
    obtenerDatosDocumento,
    obtenerDatosSubColeccion,
};