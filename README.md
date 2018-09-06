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

* [GET]     /     => retorna todos os restaurantes com cliente ATIVO
* [GET]     /:id  => retorna o restaurante de ID informado;
* [POST]    /     => cria um novo restaurante;
* [PUT]     /:id  => atualiza o restaurante de ID informado;
* [DELETE]  /:id  => remove o restaurante de ID informado;

------

### /restaurants/:id/phones

* [GET]     /     => retorna os telefones do restaurante procurado
* [GET]     /:id  => retorna o telefone de ID informado;
* [POST]    /     => cria um novo telefone;
* [PUT]     /:id  => atualiza o telefone de ID informado;
* [DELETE]  /:id  => remove o telefone de ID informado;

------

### /user/favorites

* [GET]     /     => retorna uma lista dos restaurantes favoritos do usuário
* [POST]    /     => retorna uma lista dos restaurantes favoritos do usuário
