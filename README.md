# APRSFireAlertPT

**APRSFireAlertPT** é um projeto de monitoramento de incêndios em tempo real que utiliza o sistema APRS (Automatic Packet Reporting System) para enviar informações sobre incêndios florestais em Portugal. O projeto busca integrar dados de incêndios com uma comunicação eficiente por meio da rede APRS.

## Funcionalidades

- Conecta-se a um servidor APRS para enviar pacotes de dados.
- Obtém informações sobre incêndios em tempo real de uma API local.
- Envia coordenadas de incêndios e status através do sistema APRS.
- Personalizável com diferentes `callsigns` e `ssids`.

## Tecnologias Utilizadas

- Node.js
- APRS (Automatic Packet Reporting System)
- HTTP para comunicação com a API de incêndios
- `dotenv` para gerenciamento de variáveis de ambiente

## Pré-requisitos

Antes de executar o projeto, você precisa ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (v20.x ou superior)
- npm (geralmente vem com o Node.js)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/APRSFireAlertPT.git

2. **Navegue até o diretório do projeto:**

   ```bash
   cd APRSFireAlertPT

3. **Instale as dependências:**

   ```bash
   npm install

4. **Crie um arquivo .env na raiz do projeto e adicione suas configurações:**

   ```plaintext
   APRS_SERVER=euro.aprs2.net
   APRS_PORT=14580
   CALLSIGN=
   SSID=2
   SOFTWARE_NAME=
   API_URL=

5. **Inicie o projeto:**

   ```bash
   npm start

## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir, por favor, siga estas etapas:

1. Faça um fork do projeto.

2. **Crie uma nova branch:**

   ```bash
   git checkout -b feature/nome-da-feature

3. **Faça suas alterações e commit:**

   ```bash
   git commit -m 'Adiciona nova funcionalidade'

4. **Faça push para a branch:**

   ```bash
   git push origin feature/nome-da-feature
