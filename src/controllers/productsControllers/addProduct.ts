import { Request, Response } from 'express';
import db from '../../config/db';
import { ResultSetHeader } from 'mysql2';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, stock, category } = req.body;
    const imageUrl = req.file?.filename; // Obtener el nombre del archivo de la imagen subida

    if (!imageUrl) {
        res.status(400).json({ message: 'Image is required' });
        return; // Salir de la función para evitar continuar
    }

    try {
        const result = await db.query<ResultSetHeader>(
            'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, stock, category, imageUrl]
        );

        const queryResult = result[0]; // Aquí obtienes el resultado de la consulta

        res.status(201).json({ message: 'Product added successfully', productId: queryResult.insertId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error adding product' });
    }
};
