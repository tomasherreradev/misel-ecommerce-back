import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; 

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(express.json());
app.use(cors());

// Middleware para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Asegúrate de que la ruta sea correcta

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
