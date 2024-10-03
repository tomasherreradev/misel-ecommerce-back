import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from './../../config/db';

export const confirmAccount = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;

  
    if (!token) {
      res.status(400).json({ error: 'Token de confirmación no proporcionado' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: number};

      const sql = 'UPDATE users SET activada = 1 WHERE id = ?';
      await db.execute(sql, [decoded.userId]);

      res.status(200).json({message: 'Cuenta confirmada exitosamente'})
      
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Token no válido o expirado'});
    }
  
    
  };
  