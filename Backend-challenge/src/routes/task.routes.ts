import { Router } from 'express';
import { getTasks } from '../controllers/task.controllers';

import { createTask, updateTask, deleteTask } from '../controllers/task.controllers';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

export default router;

