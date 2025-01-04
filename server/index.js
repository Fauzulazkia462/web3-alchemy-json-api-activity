require('dotenv').config();
const { API_KEY } = process.env;

class Server {   
    constructor(){
        this.api_key = API_KEY;
        this.url = `https://eth-mainnet.g.alchemy.com/v2/${this.api_key}`;
    }
}

module.exports = Server;