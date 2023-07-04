import User from "../entities/user.entity";

test('Deve gerar um token valido conforme usuario correto', () => {
    const user = new User();

    const foundUser = user.getUser({email: 'test@soha.com.br', password: 'teste12345'});

    expect(foundUser).toEqual({email: 'test@soha.com.br', password: 'teste12345'});
});