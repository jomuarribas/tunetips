# TuneTips

Versión de estudio de una pequeña red social sobre recomendaciones musicales. 

Mediante un webscraper en la sección de "explorar" buscas el disco o album que quieras recomendar y lo añades a "mi estanteria". La idea es que cada usuario registre sus propios discos para que el resto de la comunidad pueda verlos.

La lógica es que se asignen los discos a los usuarios y los usuarios a los discos de tal manera que hay una trazabilidad entre ambos.
Se podría listar un disco con todos los usuarios que lo han añadido al igual que un usuario todos los discos que tiene añadidos.

Al igual pasaría con los posts y los usuarios.

- Backend creado con mongoose y Express añadiendo datos a una base de datos de MongoDB Atlas.
- WebScraper creado con la librería de puppeteer.
- FrontEnd creado sobre Vite-Vanilla.