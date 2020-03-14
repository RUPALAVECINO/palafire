import * as admin from 'firebase-admin';

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
  
  export { iniciarApp, admin };