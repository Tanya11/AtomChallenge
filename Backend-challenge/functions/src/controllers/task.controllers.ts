import { Request, Response } from 'express';
import db from '../services/firestore.services';
import { Timestamp } from 'firebase-admin/firestore';
import { format } from "date-fns"; 
/**
 * GET  all tasks

 */

export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
   
    const snapshot = await db.collection('tasks').orderBy('date', 'asc').get();  //order from date
    if (snapshot.empty) {
      res.status(404).json({ message: 'No hay tareas disponibles.' });
      return;
    }

    const tasks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date instanceof Timestamp ? format(data.date.toDate(), "yyyy-MM-dd") : null
      };
    });

    res.json(tasks); 
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


/** 
 POST /tasks - Crear una nueva tarea
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    if (!title) {
      res.status(400).json({ error: "El título es obligatorio." });
      return;
    }

    const newTask = {
      title,
      description,
      completed: completed || false,
      date: new Date(),
    };

    const taskRef = await db.collection("tasks").add(newTask);

    res.status(201).json({ id: taskRef.id, ...newTask });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * UPDATE task
 */

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log( "entro a update",req.params)
      const { taskId } = req.params; 
      const taskRef = db.collection('tasks').doc(taskId);
      console.log( "entro a update",taskRef)
      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) {
          res.status(404).json({ message: 'Tarea no encontrada' });
          return;
      }

      const updatedData = req.body;
      if (updatedData.date) {
          updatedData.date = Timestamp.fromDate(new Date(updatedData.date));
      }

      await taskRef.update(updatedData);

      res.json({ message: 'Tarea actualizada correctamente', id: taskId });
  } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/**
 * DELETE tasks
 */

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params; 

    if (!taskId) {
      res.status(400).json({ error: "El ID de la tarea es obligatorio." });
      return;
    }

    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

     if (!taskDoc.exists) {
      res.status(404).json({ error: "La tarea no existe." });
      return;
    }

    await taskRef.delete(); 

    res.json({ message: "Tarea eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
