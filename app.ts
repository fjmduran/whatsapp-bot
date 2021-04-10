import WAWebJS, { Client } from 'whatsapp-web.js';
const qrcode = require('qrcode-terminal');

import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';

const SESSION_PATH_FILE = './session.json';
let client: Client;
let sessionData;

const alreadyScanned = () => {
    const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`);
    sessionData = require(SESSION_PATH_FILE);
    spinner.start();
    client = new Client({
        session: sessionData
    });

    client.on('ready', () => {
        console.log();
        console.log('Client is ready!');
        spinner.stop();

        // sendMessage();
        // sendMedia();

        connectionReady();

    });

    client.on('auth_failure', () => {
        spinner.stop();
        console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
    })

    client.initialize();
}

const withOutScan = () => {
    console.log('No tenemos session guardada');
    client = new Client(WAWebJS.DefaultOptions);
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        connectionReady();
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion vuelve a generar el QRCODE **');
    })

    client.on('authenticated', (session) => {
        // Guardamos credenciales de de session para usar luego
        sessionData = session;
        fs.writeFile(SESSION_PATH_FILE, JSON.stringify(session), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
}

const sendMessage = (number:string, text:string) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const message: string = text || `Hola soy un BOT recuerda https://fjmduran.com`;
    client.sendMessage(number, message);
    //readChat(number, message)
    //console.log(`${chalk.red('⚡⚡⚡ Enviando mensajes....')}`);
}

const listenMessage = () => {
    client.on('message', async msg => {
        const { from, to, body } = msg;
        console.log(msg.hasMedia);
        if (msg.hasMedia) {
            //const media = await msg.downloadMedia();
            //saveMedia(media);
            // do something with the media data here
        }

        //await greetCustomer(from);

        const messageReceived = body.toLowerCase();

        switch(messageReceived){
            case  'hola':
                sendMessage(from,'Hola, soy un bot y Francisco ahora mismo no está operativo. Todavía no puedo hacer mucho, pero dale tiempo');
                sendMessage(from,'😉');
            break;
            case 'adios':
                sendMessage(from,'Hasta luego');
            break;
            case 'adriana':
                sendMessage(from,'❤');
            break;
        }
        

        //await replyAsk(from, body);

        // await readChat(from, body)
        // console.log(`${chalk.red('⚡⚡⚡ Enviando mensajes....')}`);
        // console.log('Guardar este número en tu Base de Datos:', from);

    });
}

const connectionReady = () => {
    listenMessage();
}

(fs.existsSync(SESSION_PATH_FILE)) ? alreadyScanned() : withOutScan();


