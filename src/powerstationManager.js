class PowerstationManager
{
    constructor(){
        this.controller = new mPowerBluetoothController();
    }

    async turnOnOrOff(portNo, OnOffValue) {
        this.controller.writeValue([portNo, OnOffValue]);
    }

    async getPortNo(){
        this.controller.readValue(???);
    }

    async startCharging(portNo){
        //this.controller.
    }
}

class DummyPowerstationManager
{
    constructor(){
    }

    async turnOnOrOff(portNo, OnOffValue) {
    }

    async getPortNo(){
        return 3;
        //return null;
    }

    async startCharging(portNo){

    }
}