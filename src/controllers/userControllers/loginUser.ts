import { Request, Response } from 'express';
import db from '../../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User } from '../../models/userModel';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      return;
    }
  
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user: User = rows[0];

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return;
        }

        if(user.activada !== 1) {
          res.status(401).json({ error: 'Tu cuenta no está confirmada' });
          return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
