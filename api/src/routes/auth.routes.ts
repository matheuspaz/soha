import express, { Router, Request, Response } from 'express';
import LoginService from '../services/login.service';

const router: Router = express.Router();

type LoginBody = {
    email: string,
    password: string,
}

type CheckBody = {
    token: string
}

router.post('/login', (request: Request, response: Response) => {
    try {
        const { email, password }: LoginBody = request.body;

        if (!email || !password) {
            return response.status(401).json({
                message: 'E-mail e senha são obrigatórios!',
            });
        }

        const loginService: LoginService = new LoginService();

        const token = loginService.handleLogin({email, password});

        if (token == undefined || token == null) {
            return response.status(401).json({ message: 'E-mail ou senha inválidos!'});
        }

        let date = new Date();

        date.setMinutes(date.getMinutes() + 15);

        return response.json({ token });
    } catch (error) {
        if (error instanceof Error) {
            return response.status(500).json({
                message: error.message,
            });
        }
        return response.status(500).json({ message: 'Erro interno' });
    }
});

router.post('/check', (request: Request, response: Response) => {
    try {
        const { token }: CheckBody = request.body;

        const loginService: LoginService = new LoginService();

        const isValidToken = loginService.checkToken({ token });

        if (isValidToken) {
            return response.status(200).json();
        }

        return response.status(401).json();
    } catch (error) {
        return response.status(401).json();
    }
})

export default router;