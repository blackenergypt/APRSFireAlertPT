require('dotenv').config();
const net = require('node:net');
const http = require('node:http');

// Informações do servidor APRS
const aprsServer = process.env.APRS_SERVER;
const aprsPort = process.env.APRS_PORT;

// Dados do APRS
const callsign = process.env.CALLSIGN;
const ssid = process.env.SSID;
const softwareName = process.env.SOFTWARE_NAME;
const password = process.env.PASSWORD;

// Cria um cliente TCP para se conectar ao servidor APRS
const client = net.createConnection(aprsPort, aprsServer, () => {
    console.log('Conectado ao servidor APRS');

    // Envia o comando de login
    const loginCommand = `USER ${callsign} ${ssid} ${password}\n`;
    client.write(loginCommand);
});

// Lida com a resposta do servidor
client.on('data', (data) => {
    console.log('Resposta do servidor:', data.toString());

    // Se o login foi bem-sucedido ou mesmo se não foi, obtém os dados dos incêndios
    if (data.toString().includes('logresp') || data.toString().includes('unverified')) {
        console.log('Login realizado ou não verificado, buscando dados dos incêndios...');
        fetchFireData();
    }
});

// Lida com erros
client.on('error', (err) => {
    console.error('Erro ao conectar ao servidor APRS:', err);
});

// Fecha a conexão após o envio
client.on('end', () => {
    console.log('Desconectado do servidor APRS');
});

// Função para buscar dados dos incêndios
function fetchFireData() {
    // Configura os cabeçalhos que você deseja enviar
    const options = {
        hostname: new URL(process.env.API_URL).hostname,
        port: new URL(process.env.API_URL).port,
        path: '/fires/v3/new',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': `${softwareName}`
        }
    };

    const req = http.get(options, (res) => {
        let data = '';

        // Recebe os dados da resposta
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Quando todos os dados forem recebidos
        res.on('end', () => {
            const fires = JSON.parse(data).data;

            // Envia os pacotes APRS para cada incêndio usando for...of
            for (const fire of fires) {
                sendAprsPacket(fire);
            }
        });
    });

    // Trata erros na solicitação
    req.on('error', (err) => {
        console.error('Erro ao buscar dados dos incêndios:', err);
    });
}

// Função para enviar um pacote APRS
function sendAprsPacket(fire) {
    const latitude = `${fire.coordinates.latitude}N`; // Adicione 'N' para latitude
    const longitude = `${fire.coordinates.longitude}W`; // Adicione 'W' para longitude
    const statusMessage = `Incêndio ID: ${fire.fireid} em ${fire.location} (${fire.fire.status})`;
    const icon = '!f'; // Ícone para incêndio

    // Formata o pacote APRS corretamente
    const aprsPacket = `${callsign}>APRS:,${latitude}/${longitude}${icon} :${statusMessage}\n`;
    client.write(aprsPacket);
}
