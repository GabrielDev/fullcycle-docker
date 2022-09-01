# Desafio Node


### Iniciando

Utilize esse comando para fazer o build
```
docker-compose build
```

Para executar, utilize esse comando
```
docker-compose up -d
```

### Como utilizar

Acessando via [http://localhost:8080](http://localhost:8080), será apresentado todos os usuários cadastrados. 
Um novo usuário padrão "Full Cycle" será cadastrado, mas é possível adicionar novos usuários através do parametro `name`, [exemplo](http://localhost/?name=Exemplo):

```
http://localhost:8080/?name={NOME}
```
