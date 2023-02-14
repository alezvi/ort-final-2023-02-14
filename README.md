# ORT - Examen final 2022-12

### Contexto

Vamos a simular un caso de la vida de real para desarrollar un servicio tipo API REST que servirá a una empresa cobradora de peajes. Las terminales de cobro de peaje ubicadas en algun punto geográfico, tienen un sistema computarizado que aplica el cobro de una tarifa a los vehículos que pasan por allí. Cada vez que un vehículo pasa por el lugar las cámaras detectan la patente del vehículo y con ello se busca en la base de datos. El operador (empleado) que se encuentra en la cabina hace el cobro en efectivo 

La empresa define las tarifas que debe pagar cada tipo de vehículo.



### Requerimientos


---

###### ISSUE 1 - Peajes - Listar

Dificultad: 2/3

Contexto:

- La empresa administradora de los puestos de cobro puede dar de alta la información de los puestos de peaje. Tener en cuenta que cad cada cabina de peaje se ubica en una dirección geográfica y tiene un numero. Por ejemplo, en la Ruta 3 hay 10 cabinas, cada una tiene un numero del 1 al 10.

Requerimiento:

- Hacer un endpoint que permita obtener el listado de todos los puestos de peaje
- Cada peaje debe incluir la dirección donde se encuentra
- La lista debe estar ordenada de forma ascendente por el número de la cabina

Testear:

- Conociendo cuantos peajes cargué en la base de datos, que devuelve la misma cantidad.
- Que en cada petición el listado incluya la dirección como objeto anidado
- Que en la lista retornada se encuentra ordenada de forma ascendente

Opcional

- Hacer un endpoint para devolver la informacion detallada de 1 puesto de peaje, por el ID
- Hacer que <u>mediante query string</u> se pueda ubicar a todos los puestos de peaje de una direccion específica

---

###### ISSUE 2 - Tarifas - Listar

Dificultad: 3/3

Contexto:

- La empresa es responsable de dar de alta los precios de las tarifas. Las tarifas pueden ir cambiando cada cierto tiempo. Y cada tarifa está asociada a un tipo específico de vehículo. Por ejemplo, una moto abona 100 pesos pero un camión con acoplado abona 400 pesos.
- Antes de comenzar recomendamos ver rapidamente este sitio https://www.ausa.com.ar/sections/tarifas.html - Tomar como ejemplo solo la primera parte de las tarifas, la de abajo no. Consultar si surge alguna duda de esto.

Requerimiento:

- Hacer un endpoint que permita obtener el listado de todas las tarifas vigentes
- Las tarifas son dos, para hora normal y para hora pico
- Cada tarifa debe incluir el tipo de vehículo al que corresponde. Incluir el texto descriptivo 
- La lista debe estar ordenada de forma ascendente por el valor de la tarifa
- Si una tarifa no está vigente esa tarifa no debe figurar en el listado, pero debe mantenerse en la base de datos (para mantener las referencias).

Testear

- Que el listado solo devuelve las tarifas vigentes
- Que hay dos tarifas vigentes por cada tipo de vehículo
- Que la lista está ordenada de forma ascendente por el valor de la tarifas

---

###### ISSUE 3 - Vehiculos - Registro

Dificultad: 1/3

Contexto:

- Cada vez que un vehículo pase por un peaje, será identificado por las cámaras. Esos datos obtenidos por el software de la cámara serán enviados a este servicio REST.
- Si el vehículo ya existe en la DB, simplemente se retorna 201 confirmando que se guardó, no se considera error. La respuesta siempre debe retornar un objeto con la propiedad `id`.

Requerimientos:

- Hacer un endpoint que reciba los datos del vehículo, que son la patente, el tipo de vehículo 
- Para el tipo de vehículo se usará el siguiente código:
  - 1: Moto
  - 2: Autos
  - 3: Camionetas
  - 4: Camion
  - 5: Camion con 1 acoplado
  - 6: Camion con 1 acoplado doble
  - 7: Camion con 1 acoplado triple

Testear:

- Que al crear...
  - La patente del vehiculo
    - Es requerida
    - Tenga al menos 6 caracteres y 8 como maximo
  - El tipo de vehiculo
    - Es requerido
    - Es un digito de los especificados anteriomente
- Que el endpoint responda con 201 cuando el vehiculo es nuevo
- Que el endpoint responda con 201 cuando el vehiculo ya estaba registrado
- Que el endpoint responda en ambos casos con la propiedad `id ` 

---

###### ISSUE 4 - Empleados - ABM

Dificultad: 2/3

Contexto: 

- Los empleados que trabajan en las cabinas deben estar registrados para poder operar dentro del sistema de la empresa. Para eso es necesario poder dar de alta a cada uno y hacer otras operaciones.

Requerimientos:

- Hacer un endpoint que permita dar de alta los datos de personas físicas
  - El nombre es obligatorio, y debe ser entre 2 y 50 caracteres, unicamente alfabetico
  - Lo mismo para el apellido
  - El DNI es obligatorio, solo se aceptan números entre 10 millones y 70 millones
  - La fecha de ingreso a la nómina de empleados se completa automáticamente al momento de registrarlo
- Hacer un endpoint que permita consultar únicamente con una búsqueda por query string. Es decir, si el query string está vacío no habrá resultados. Si se busca algún término deberá traer 

Testear

- Al crear...
  - Que el nombre
    - Es requerido
    - Solo acepta alfabético
    - Requiere que sea entre 2 y 50 caracteres
  - Testear lo mismo para el apellido
  - Que el DNI
    - Es requerido
    - Solo acepta numérico
    - Requiere que sea entre 10000000 y 70000000
- Al listar...
  - Que el endpoint no devuelve resultados si el query string está vacío.
  - Insertar en la base de datos a través del modelo un usuario llamado "Cosme Fulanito" para verificar que al buscar por alguna coincidencia parcial, por ejemplo `ani`, devuelve ese usuario.