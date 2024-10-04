import { Request, Response } from 'express';
import db from '../../config/db';
import { ResultSetHeader } from 'mysql2';



export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    if(!id) {
        res.status(404).json({message: 'No se encontró el producto'});
        return;
    }

    try {
        const result = await db.query('SELECT * FROM products WHERE id = ?', [id]);

        if(result.length <= 0) {
            res.status(404).json({message: `No se encontró un producto con el id ${id}`})
            return;
        }

        const product = result[0];
        res.status(200).json(product);

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Falló la obtención de los datos'})
    }

}