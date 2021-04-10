# Bot para WhatsApp sin servicios de terceros

## Librerías

- [whatsapp-web.js](https://waguide.pedroslopez.me/); será la que haga toda la magia
- qrcode-terminal; no permitirá dibujar códigos QR en la terminal
- ora; dibujará en consola spinners
- chalk; coloreará líneas de código que mostremos por la terminal
- mime-db; identifirá tipos de archivos, que lo necesitaremos para enviar y recibir archivos multimedia.

## Instalar dependencias

### 1. Instalar TypeScript

Vamos a usar Node con Typescript, así que:

1. Creamos una carpeta
2. Dentro de esa carpeta, en la consola escribimos `npm init --y`. Con esto crearemos un archivo _package.json_ donde se encontrará nuestra configuración del proyecto de Node.
3. Instalamos TypeScript como dependencia, ya que no lo necesitaremos para producción, para ello `npm i typescript -D`
4. Inicializamos el proyecto de TypeScript con `npx tsc-init`. Se generara el fichero de configuración de TypeScript llamado _tsconfig.json_
5. Crea una carpeta llamada _dis_ que será donde se compile el código de TypeScript a JavaScript.
6. Modifica el _tsconfig.json_ para que quede así:

```
{
    "compilerOptions":
    {
        "target": "es6",
        "module": "commonjs",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true
    }
  }
```

7. Crea un fichero llamado _app.ts_
8. En el fichero crea algo como `console.log("Ready");`
9. Ejecutamos el espia de TypeScript para que esté vigilando los cambios en los ficheros ts y los compile automáticamente al guardar cualquier fichero ts. Para ello `tsc --watch`
10. Si nos vamos a la carpeta _dis_ que creamos en el punto 5 veremos que se ha generado un nuevo fichero _app.js_
11. Ejecutamos `node dist/app.js` y veremos por consola el mensaje de _Ready_

### 2. Instalar la librería que hará la magia

```
npm i whatsapp-web.js
```

Esta librería usa [Puppeteer](https://developers.google.com/web/tools/puppeteer), y a su vez Puppeteer usa una versión de Chromium concreta para simular que es un navegador web, porque lo que hace la librería es simular que es un navegador web para iniciar una sesión WhatsApp Web.
Así que no te asustes si vez que se está descargando algo que ocupa algo más de 150 Mb, ya sabes qué es.
Es necesario instalar los tipos para TypeScript de Puppeteer, para ello `npm i --save-dev @types/puppeteer`

Instalamos otra librería que será la que dibuje en la consola el código QR necesario para escanear con nuestro móvil donde tenemos el número de WhatsApp sobre el que queremos crear nuestro bot. Para ello `npm i qrcode-terminal --save`

### 3. Instalar librerías no necesarias

Las siguiente librerías no son necesarias, pero nos ayudará a que la aplicación tenga un mejor aspecto en la terminal.
`npm i ora chalk mime-db --save`
