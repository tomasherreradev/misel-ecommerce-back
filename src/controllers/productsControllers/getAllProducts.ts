import { Request, Response } from 'express';
import db from '../../config/db';

// Obtener todos los usuarios
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
};




