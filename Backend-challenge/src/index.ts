import express from 'express';
import * as dotenv from 'dotenv';
import tasksRoutes from './routes/task.routes';
import userRoutes from './routes/user.router';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:4200", 'https://backend-challenge-6189f.web.app'],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use('/api', tasksRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
