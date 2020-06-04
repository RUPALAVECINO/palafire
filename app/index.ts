import * as admin from 'firebase-admin';
import { IColecciones } from './interfaces/db';

const iniciarApp = (serviceAccount: string, databaseURL: string) => {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseURL
      });
      admin.firestore().settings({ timestampsInSnapshots: true });
    }
    return true;
  };
  
const firestore =  admin.firestore;
const FieldValue = admin.firestore.FieldValue;
let fire:IColecciones;
const removeArray= (data:string) => FieldValue.arrayRemove(data);
const unionArray= (data:string) => FieldValue.arrayUnion(data);
const decrementPala = (cantidad:number) => FieldValue.increment(-cantidad);
const incrementPala = (cantidad:number) => FieldValue.increment(cantidad);


const getDb = (db:IColecciones):IColecciones => fire = db;
    

const getDoc = async(num:number,documento:string):Promise<any>=> {
    try {
        let doc = await firestore()
        .collection(`${fire.coleccion[num]}`)
        .doc(`${documento}`).get();
        let data = doc.data() as any;
        return data
    } 
   catch(err) { 
        console.error(err) 
    }
};

 /*      OBTENER UNA fire.coleccion   */
 const obtenerDatosSubcole = async(num:number,documento:string,num2:number):Promise<any> => {
     try{
         let datos_cole:[][] = []
         let collection = await firestore()
         .collection(`${fire.coleccion[num]}`)
         .doc(`${documento}`)
         .collection(`${fire.subcoleccion[num2]}`).get();
         collection.forEach(doc => {
             let data =  doc.data() as any;
             datos_cole.push(data);
         });  
         return datos_cole 
     } 
     catch(err) { 
         console.error(err) 
     }
 };

/* agrega un un documento a primera coleccion */
 const addDoc = async(num:number,documento:any):Promise<any> => {
     try{
         let agregado = await firestore()
         .collection(`${fire.coleccion[num]}`)
         .add(documento);
         console.log(`se agrego ${agregado.id}`);
         return agregado;
     } catch(err) {
         console.error(err)
     }
 }


 const addSubDoc = async(num:number,documento:string,num2:number,subdocumento:any):Promise<any> => {
     try{
         let agregado = await firestore()
         .collection(`${fire.coleccion[num]}`)
         .doc(`${documento}`)
         .collection(`${fire.subcoleccion[num2]}`)
         .add(subdocumento);
         console.log(`subdocumento agregado: ${agregado.id}`);
         return agregado;
     } catch(err) {
         console.error(err)
     }
 }

 const addDocSet = async(num:number,documento:string,campos:any):Promise<any> => {
     try{
         let agregado = await firestore()
         .collection(`${fire.coleccion[num]}`)
         .doc(`${documento}`)
         .set(campos);
         return agregado;
     } catch(err) {
         console.error(err)
     }
 }

 const addSubDocSet = async(num:number,documento:string,num2:number,subdocumento:string,documentocreado:any):Promise<any> => {
     try{
         let agregado = await firestore()
         .collection(`${fire.coleccion[num]}`)
         .doc(`${documento}`)
         .collection(`${fire.subcoleccion[num2]}`)
         .doc(`${subdocumento}`)
         .set(documentocreado);
         return agregado;
     } catch(err) {
         console.error(err)
     }
 }


 const actualizarDocumento = async(num:number,documento:string,actualizar:any):Promise<any> => { 
     try{
         await firestore()
         .collection(`${fire.coleccion[num]}`)
         .doc(`${documento}`)
         .update(actualizar);
         console.log('documento - actualizado!')
     } catch(err) {
         console.error(err)
     }
 }

 const updateSubDoc = async(num:number,documento:string,num2:number,subdocumento:string,actualizar:any):Promise<any> => { 
     try{
         let doc = firestore().collection(`${fire.coleccion[num]}`).doc(`${documento}`);
         if((await doc.get()).exists) {
             const msg = await firestore()
             .collection(`${fire.coleccion[num]}`)
             .doc(`${documento}`)
             .collection(`${ fire.subcoleccion[num2] }`)
             .doc(`${subdocumento}`)
             .update(actualizar)
             return msg;
        } else {
            console.log(`user not exist: ${documento}`);
            return;
        }
     } catch(err) {
        console.error(err)
     }
 }

 const eliminarDocumento = async (num:number,uid:string) => {
    try {
        let eliminado = await firestore().doc(`${fire.coleccion[num]}/${uid}`).delete();
        return eliminado
    }   
    catch(err) { 
        console.error(err)
    }
 }

    /* AUMENTA ME GUSTA DE UN PROYECTO */
  const meGustaIncrementar = async  (num:number,uid_proyecto:string,user_uid:string) => {
         try{
        
             firestore()
             .collection(`${fire.coleccion[num]}`)
             .doc(`${uid_proyecto}`)
             .update({ 
                 me_gusta_total: incrementPala(1),
                 users_likes:FieldValue.arrayUnion(user_uid)
             });
         }
    
         catch(err)  {
             console.error(err)
         }
     }
    
/*    DIMINUYE ME GUSTA DE UN PROYECTO      */
const noMeGustaDecrementar = async (num:number,uid_proyecto:string,user_uid:string) => {
    try{
    
        firestore()
        .collection(`${fire.coleccion[num]}`)
        .doc(`${uid_proyecto}`).update({ 
            me_gusta_total: decrementPala(1),
            users_likes:FieldValue.arrayRemove(user_uid)
        });
    }
    catch(err)  {
        console.error(err)
    }
}

const tokenClient = async (token:string):Promise<string> => {
    let received = await admin.auth().verifyIdToken(token);
    return received.uid;
}


export { 
    iniciarApp, 
    admin, 
    getDb, 
    meGustaIncrementar, 
    noMeGustaDecrementar, 
    actualizarDocumento,
    updateSubDoc, 
    addDoc, 
    addSubDoc, 
    addSubDocSet,
    addDocSet, 
    eliminarDocumento, 
    getDoc, 
    obtenerDatosSubcole, 
    tokenClient,
    removeArray,
    unionArray,
    incrementPala,
    decrementPala
};