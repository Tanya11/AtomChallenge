import { Request, Response } from "express";
import db from '../services/firestore.services';

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ error: "El email es obligatorio." });
      return;
    }

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    const user = snapshot.docs[0].data();
    res.json({ id: snapshot.docs[0].id, ...user });

  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email ) {
      res.status(400).json({ error: "El email es obligatorios." });
      return;
    }

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      res.status(400).json({ error: "El usuario ya existe." });
      return;
    }

    const newUser = { email, createdAt: new Date().toISOString() };
    const userRef = await usersRef.add(newUser);

    res.status(201).json({ id: userRef.id, ...newUser });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
