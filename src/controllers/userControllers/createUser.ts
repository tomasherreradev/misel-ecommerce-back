import { Request, Response } from 'express';
import db from './../../config/db';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../config/sendConfirmationEmail';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, confirmPassword, role = 'user' } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Todos los campos deben rellenarse.' });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Las contraseñas no coinciden.' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, password, role, activada) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, role, 0]; // Cambiar a 0 para no activada inicialmente

        const [result] = await db.execute<ResultSetHeader>(sql, values);

        // Generar un token de confirmación
        const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

        // Enviar el correo de confirmación
        const confirmationUrl = `${process.env.FRONTEND_URL}/confirm/${token}`;
        sendEmail(email, 'Confirma tu cuenta', `Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: ${confirmationUrl}`);

        res.status(201).json({ message: 'Usuario creado exitosamente, revisa tu correo para confirmar tu cuenta.', userId: result.insertId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario.' });
    }
};
