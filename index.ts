import * as admin from 'firebase-admin';
const firestore =  admin.firestore()
const FieldValue = admin.firestore.FieldValue;
const increment = FieldValue.increment(1);
const decrement = FieldValue.increment(-1);

let cole = ['']
let subcole = ['']
const coleccion = (colections:string[]):string[] => cole = colections;
const subcoleccion = (subcolections:string[]):string[] => subcole = subcolections;


 const obtenerDatosDocumento = async(num:number,documento:string):Promise<any>=> {
    try{
        let doc = await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`).get();
        let data = doc.data() as any;
        return data
    } 
    catch(err) { 
        console.error(err) 
    }
};

/*      OBTENER UNA cole   */
const obtenerDatosSubcole = async(num:number,documento:string,num2:number):Promise<any> => {
    try{
        let datos_cole:[][] = []
        let collection = await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`)
        .collection(`${subcole[num2]}`).get();
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


const agregarDocumento = async(num:number,documento:any):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${cole[num]}`)
        .add(documento)
        return agregado;
    } catch(err) {
        console.error(err)
    }
}


const agregarSubDocumento = async(num:number,documento:string,num2:number,subdocumento:any):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`)
        .collection(`${subcole[num2]}`)
        .add(subdocumento);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}

const CrearDocumento = async(num:number,documento:string,campos:any):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`)
        .set(campos);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}

const CrearSubDocumento = async(num:number,documento:string,num2:number,subdocumento:string,documentocreado:any):Promise<any> => {
    try{
        let agregado = await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`)
        .collection(`${subcole[num2]}`)
        .doc(`${subdocumento}`)
        .set(documentocreado);
        return agregado;
    } catch(err) {
        console.error(err)
    }
}


const actualizarDocumento = async(num:number,documento:string,actualizar:any):Promise<any> => { 
    try{
        await firestore
        .collection(`${cole[num]}`)
        .doc(`${documento}`)
        .update(actualizar);
        console.log('actualizado!')
    } catch(err) {
        console.error(err)
    }
}

const actualizarSubDocumento = async(num:number,documento:string,num2:number,subdocumento:string,actualizar:any):Promise<void> => { 
    try{
        await firestore.collection(`${cole[num]}`)
        .doc(`${documento}`)
        .collection(`${ subcole[num2] }`)
        .doc(`${subdocumento}`)
        .update(actualizar);
        console.log('actualizado!')
    } catch(err) {
        console.error(err)
    }
}

const eliminarDocumento = async (num:number,uid:string) => {
    try {
        await firestore.doc(`${cole[num]}/${uid}`).delete();
    }   

    catch(err) { 
        console.error(err)
    }
}


    // AUMENTA ME GUSTA DE UN PROYECTO
 const meGustaIncrementar = async  (num:number,uid_proyecto:string,user_uid:string) => {
        try{
        
            firestore
            .collection(`${cole[num]}`)
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
        .collection(`${cole[num]}`)
        .doc(`${uid_proyecto}`).update({ 
            me_gusta_total: decrement,
            users_likes:FieldValue.arrayRemove(user_uid)
        });
    }
    catch(err)  {
        console.error(err)
    }
}


module.exports = cole;
module.exports = subcole;
module.exports = meGustaIncrementar;
module.exports = noMeGustaDecrementar;
module.exports = actualizarDocumento;
module.exports = actualizarSubDocumento;
module.exports = agregarDocumento;
module.exports = agregarSubDocumento; 
module.exports = CrearSubDocumento;
module.exports = CrearDocumento;
module.exports = eliminarDocumento;
module.exports = obtenerDatosDocumento;
module.exports = obtenerDatosSubcole;
module.exports = cole;
module.exports = subcole;