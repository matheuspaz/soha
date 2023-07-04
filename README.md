# Teste SOHA

## Sobre as tecnologias

Foram utilizadas as tecnologias VueJS 3 com composition API, node com express e docker para orquestração do ambiente.
A escolha foi dessas tecnologias devido a facilidade de prototipação no prazo vigente.

## Rodando os ambientes

Para rodar o ambiente basta fazer o clone do projeto e rodar o comando **docker compose up -d** (considerando docker previamente instalado).
Após executado o comando, em alguns instantes irá rodar o front-end na porta 3000 e API na prota 7000.

Para execução do teste no jest, deve se executar o comando **docker compose exec api npm run test** na pasta raiz do clone.
O mesmo executara 1 teste unitário da camada de usuário.

Os usuários para acesso ao dashboard são os seguintes:

##### Usuário 1
- email: **test@soha.com.br**
- password: **teste12345**

##### Usuário 2
- email: **felipe@soha.com.br**
- password: **123felipe123F**

##### Usuário 3
- email: **hardware@soha.com.br**
- password: **HSOHA9999**