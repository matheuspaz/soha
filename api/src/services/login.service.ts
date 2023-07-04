import User from '../entities/user.entity';
import jwt from 'jsonwebtoken';

type HandleLoginParams = {
    email: string,
    password: string
}

type CheckTokenParams = {
    token: string
}

class LoginService {
    handleLogin(handleLoginParams: HandleLoginParams) : string | null {
        try {
            const user: User = new User();

            const foundUser =  user.getUser(handleLoginParams);

            if (!foundUser) {
                return null;
            }

            const token = jwt.sign({user: foundUser.email}, process.env.JWT_SECRET!, { expiresIn: 60 * 15 });

            return token;
        } catch (error) {
            return null;
        }
    }

    checkToken(checkTokenParams: CheckTokenParams) {
        return jwt.verify(checkTokenParams.token, process.env.JWT_SECRET!);
    }
}

export default LoginService;