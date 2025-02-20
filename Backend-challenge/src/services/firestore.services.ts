import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync, readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

// Verificar si la credencial está configurada
const credentialsPath = './src/config/firebase.json';
//console.log("--------------path : ", credentialsPath)
if (!credentialsPath || !existsSync(credentialsPath)) {
  throw new Error('ERROR: La variable GOOGLE_APPLICATION_CREDENTIALS no está configurada correctamente o el archivo no existe.');
}

const serviceAccount = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

// Inicializar Firebase si no está inicializado
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(); // Conexión a Firestore

export default db; // Exportar la conexión a Firestore

