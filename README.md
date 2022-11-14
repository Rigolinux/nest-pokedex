<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm i 
```
or
```
npm install
```
3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. clonar el archivo __.env.template.__ y renombrar a __.env.__

6. Agregar la variables de entorno

7. Ejecutar la aplicacion en modo desarrollo
```
npm run start:dev
```

8. Realizar una peticion post para llenar datos 
```
http://localhost:3000/api/v2/seed
```
# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack usado
* MongoDB
* Nest