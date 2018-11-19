/*
 *
 *
 
const controller = new mPowerBluetoothController();
await controller.connect();



 */

class mPowerBluetoothControllerDummy {


    constructor() {
        this.serviceUuid = '0000f00d-1212-efde-1523-785fef13d123';
        this.options = {
            filters: [{ name: "mPower" }, { services: [this.serviceUuid] }],
            optionalService: [this.serviceUuid]
        };
        this.characteristicUuid = "0000beef-1212-efde-1523-785fef13d123";
        this.isConnected = false;
    }
    
    async connect() {
    }

    async turnOnOrOff(portNo, OnOffValue) {
        console.log('dummy ble turnOnOrOff', portNo, OnOffValue);
    }

    async readValue() {
        return 5;
    }
}


 /*jshint esversion: 6 */
class mPowerBluetoothController {


    constructor() {
        this.serviceUuid = '0000f00d-1212-efde-1523-785fef13d123';
        this.options = {
            filters: [{ name: "mPower" }, { services: [this.serviceUuid] }],
            optionalService: [this.serviceUuid]
        };
        this.characteristicUuid = "0000beef-1212-efde-1523-785fef13d123";
        this.isConnected = false;
    }
    
    async connect() {
        const device = await navigator.bluetooth.requestDevice(this.options);
        const server = await device.gatt.connect();
        this.service = await server.getPrimaryService(this.serviceUuid);
        this.isConnected = true;
        return device.name;
    }

    async turnOnOrOff(portNo, OnOffValue) {
        const characteristic = await this.service.getCharacteristic(this.characteristicUuid);
        const onOff = parseInt("0x" + OnOffValue);
        const portNumber = parseInt("0x" + portNo);
        const data = new Uint8Array([onOff, portNumber]);
        await characteristic.writeValue(data);
        console.log("hva nå enn");
    }

    async readValue() {
        const characteristic = await this.service.getCharacteristic(this.characteristicUuid);
        return await characteristic.readValue();
    }
}
//export default mPowerBluetoothController;
export default mPowerBluetoothControllerDummy;