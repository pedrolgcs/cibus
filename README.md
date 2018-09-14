# Cibus API

## Projeto desenvolvido para gerênciar o cardápio diario de restaurantes e marmitarias

## Pré-requisitos

* __NodeJS__ versão 8 ou superior;
* __mySQL__ versão 5 ou superior;

## Rotas

### /sessions

* [POST] / => realiza o login do usuário;

------

### /users => [auth] except [POST /]

* [GET]     /:id  => retorna o usuário de ID informado;
* [POST]    /     => cria um novo usuário;
* [PUT]     /:id  => atualiza o usuário de ID informado;

------

### /restaurants => [auth, client]

* [GET]     /     => retorna todos os restaurantes com cliente ATIVO;
* [GET]     /:id  => retorna o restaurante de ID informado;
* [POST]    /     => cria um novo restaurante;
* [PUT]     /:id  => atualiza o restaurante de ID informado;
* [DELETE]  /:id  => remove o restaurante de ID informado;

------

### /restaurants/:id/phones => [auth, client]

* [GET]     /     => retorna os telefones do restaurante procurado;
* [GET]     /:id  => retorna o telefone de ID informado;
* [POST]    /     => cria um novo telefone;
* [PUT]     /:id  => atualiza o telefone de ID informado;
* [DELETE]  /:id  => remove o telefone de ID informado;

------

### /user/favorites => [auth]

* [GET]     /     => retorna uma lista dos restaurantes favoritos do usuário;
* [POST]    /     => adiciona um restaurante a lista de favoritos do usuário;
* [DELETE]  /:id  => remove o restaurante da lista de favoritos;

------

### /admin/users => [administrator]

* [GET]     /     => retorna uma lista de usuários cadastrados no sistema;
* [GET]     /:id  => retorna o usuário de ID informado;
* [POST]    /     => cria um novo usuário;
* [PUT]     /:id  => atualiza o usuário de ID informado;
* [DELETE]  /:id  => remove o usuário de ID informado;
