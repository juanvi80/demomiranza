# DEMO WSO2 MIRANZA
Hemos desarrollado una demo que muestra un ejemplo de integracion, implementando un api comun entre dos fuentes de datos diferentes.
Las fuentes de datos son dos bases de datos que contienen informacion sobre pacientes , citas y centros medicos.
El api implementada contiene las funciones de obtener centros medicos, pacientes y las citas asociadas de un paciente concreto.


# Descripcion de las carpetas #
carpeta dockers --> en esta carpeta se encuentra todo lo necesario para arrancar la demo
carpeta srcwso2 --> en esta carpeta se encuentra el codigo fuente de wso2 que implementa el api necesario para la integracion
carpeta webdemocitas --> en esta carpeta se encuentra el codigo fuente de la aplicacion angular para realizar la demo de integracion

## Prerequisitos para arrancar 

* [Docker](https://www.docker.com/get-docker) 
* Docker compose

## Realizar los Docker build
* docker build mysql
* docker build postgresql
* docker build nginx
* docker build wso2ei-integrator:6.5.0

## Una vez tengamos las imagenes
* situarse en la carpeta dockers
* docker-compose up
