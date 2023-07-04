type UserData = {
    email: string,
    password: string,
}

type UserResponse = {
    email: string
}

class User {
    getUser(userData: UserData): UserResponse | null {
        const users = [
            {
                email: 'test@soha.com.br',
                password: 'teste12345',
            },
            {
                email: 'felipe@soha.com.br',
                password: '123felipe123F',
            },
            {
                email: 'hardware@soha.com.br',
                password: 'HSOHA9999',
            }
        ];

        let user = users.find(user => user.email == userData.email && user.password == userData.password);

        if (typeof user != 'object') {
            return null;
        }

        return user;
    }
}

export default User;