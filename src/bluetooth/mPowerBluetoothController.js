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
      filters: [{
        name: "mPower"
      }, {
        services: [this.serviceUuid]
      }],
      optionalService: [this.serviceUuid]
    };
    // this.characteristicUuid = "0000beef-1212-efde-1523-785fef13d123";
    this.characteristicUuid = "0000beee-1212-efde-1523-785fef13d123";
    this.isConnected = false;
  }

  async connect() {
    return "mPower"
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
      filters: [{
        name: "mPower"
      }, {
        services: [this.serviceUuid]
      }],
      optionalService: [this.serviceUuid]
    };
    // this.characteristicUuid = "0000beef-1212-efde-1523-785fef13d123";
    this.characteristicUuid = "0000beee-1212-efde-1523-785fef13d123";
    this.isConnected = false;
  }

  async connect() {
    const device = await navigator.bluetooth.requestDevice(this.options);
    const server = await device.gatt.connect();
    this.service = await server.getPrimaryService(this.serviceUuid);
    this.characteristic = await this.service.getCharacteristic(this.characteristicUuid);
    this.characteristic.addEventListener("characteristic value changed", this.handleNotifications);
    this.isConnected = true;
    console.log("RETURNER ", device.name);
    return device.name;
  }

  async writeValue(dataArray){
      const characteristic = await this.service.getCharacteristic(this.characteristicUuid);
      for(let i = 0; dataArray.length; i++){
          dataArray[i] = parseInt("0x" + dataArray[i]);
      }
      const data = new Uint8Array(dataArray);
      await characteristic.writeValue(data);
    }


  async turnOnOrOff(portNo, OnOffValue) {
    const characteristic = await this.service.getCharacteristic(this.characteristicUuid);
    const onOff = parseInt("0x" + OnOffValue);
    const portNumber = parseInt("0x" + portNo);
    const data = new Uint8Array([onOff, portNumber]);
    await characteristic.writeValue(data);
    console.log("Turn on/off, activated");
  }

  async handleNotifications(event) {
    let value = event.target.value;
    let a = [];
    for (let i = 0; i < value.byteLength; i++) {
      a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
    }
    log('> ' + a.join(' '));
  }

  async readValue() {
    const characteristic = await this.service.getCharacteristic(this.characteristicUuid);
    var x = await characteristic.readValue();
    console.log("readValue = ", x);
    return x;
  }
}
//export default mPowerBluetoothController;
export default mPowerBluetoothControllerDummy;
