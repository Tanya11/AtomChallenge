import * as dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync, readFileSync } from 'fs';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const credentialsPath = 'C:/Users/tanya/Documents/Atom/Backend/functions/src/config/firebase.json';
console.log("--------------path : ", credentialsPath)
if (!credentialsPath || !existsSync(credentialsPath)) {
  throw new Error('ERROR: La variable GOOGLE_APPLICATION_CREDENTIALS no está configurada correctamente o el archivo no existe.');
}

const serviceAccount = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

initializeApp({
  credential: cert(serviceAccount),
 
});

const db = getFirestore();

console.log('Conexión exitosa a Firestore');

// Exportar la instancia de Firestore para usarla en otros archivos
export { db };
