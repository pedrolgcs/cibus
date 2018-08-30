# Cibus API

## Projeto desenvolvido para gerênciar o cardápio diario de restaurantes e marmitarias

## Pré-requisitos

* __NodeJS__ versão 8 ou superior;
* __mySQL__ versão 5 ou superior;

## Rotas

### /sessions

#### Campos => [email, password]

* [POST] / => realiza o login do usuário;

------

### /users

* [GET]     /     => retorna todos os usuário cadastrados;
* [GET]     /:id  => retorna o usuário de ID informado;
* [POST]    /     => cria um novo usuário;
* [PUT]     /:id  => atualiza o usuário de ID informado;
* [DELETE]  /:id  => remove o usuário de ID informado;

------

### /restaurants

* [GET]     /     => retorna todos os restaurantes de clientes ativos
* [GET]     /:id  => retorna o restaurante de ID informado;
* [POST]    /     => cria um novo restaurante;
* [PUT]     /:id  => atualiza o restaurante de ID informado;
* [DELETE]  /:id  => remove o restaurante de ID informado;

------
