/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import express from "express";
import * as dotenv from "dotenv";
import tasksRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.router";
import cors from "cors";

dotenv.config();

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: ["http://localhost:4200", "https://backend-challenge-6189f.web.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Rutas
app.use("/api", tasksRoutes);
app.use("/api", userRoutes);

// Exportar la función para Firebase
export const api = functions.https.onRequest(app);
