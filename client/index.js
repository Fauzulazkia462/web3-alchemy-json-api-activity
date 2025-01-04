const Server = require('../server/index');
const axios = require('axios');

class Client {
    constructor(){
        this.server = new Server();
    }

    async getNonce(address) {
        const response = await axios.post(this.server.url, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getTransactionCount",
            params: [address, "latest"],
        });

        const nonce = parseInt(response.data.result);
        return nonce;
    }

    async nonceBatchRequest(addresses) {
        const batch = addresses.map((addr, i) => ({
            jsonrpc: "2.0",
            id: i,
            method: "eth_getBalance",
            params: [addr],
        }));

        const response = await axios.post(this.server.url, batch);

        const values = response.data.map((item) => parseInt(item.result));

        const resultString = values.join(", ");

        return resultString;
    }
}

// ====================================================================================================================================


// Running the client
const client = new Client();


client.getNonce("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    .then(nonce => {
        console.log("Nonce:", nonce);
    })
    .catch(error => {
        console.error("Error:", error);
    });


const addresses = [
    '0x830389b854770e9102eb957379c6b70da4283d60',
    '0xef0613ab211cfb5eeb5a160b65303d6e927f3f85',
    '0x5311fce951684e46cefd804704a06c5133030dff',
    '0xe01c0bdc8f2a8a6220a4bed665ceeb1d2c716bcb',
    '0xf6c68965cdc903164284b482ef5dfdb640d9e0de',
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
];

client.nonceBatchRequest(addresses)
    .then(result => {
        console.log("Nonces: ", result);
    })
    .catch(error => {
        console.log("Error: ", error);
    }) 