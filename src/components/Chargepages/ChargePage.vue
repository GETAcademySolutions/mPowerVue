<template>
    <div class="component">
      <h3 style="font-weight: bold; text-align: center;">My Credits: {{ credits }}</h3>
      <div style="width: 100%; border: 1px solid black; padding: 10px 20px; margin: 0 0 5% 0;">Jamba kiosk (11)</div>
      <div>Select device</div>
        <p>          
          <label for="test1">
            <input class="with-gap" name="group1" type="radio" id="test1" checked />
            <span style="font-size: 16px;">This phone</span>
          </label>
        </p>
        <p>          
          <label for="test2">
            <input class="with-gap" name="group1" type="radio" id="test2" />
            <span style="font-size: 16px;">General access</span>
          </label>
        </p>
          <div>Have you already pluggen in your device?</div>
        <p>          
          <label for="test3">
            <input class="with-gap" name="group2" type="radio" id="test3" checked />
            <span style="font-size: 16px;">Yes</span>
          </label>
        </p>
        <p>          
          <label for="test4">
            <input class="with-gap" name="group2" type="radio" id="test4" />
            <span style="font-size: 16px;">No</span>
          </label>
        </p>
      <!-- <div>
        <button class="smallButton" @click="startCharging(1)">Open Port 1</button>
        <button class="smallButton" @click="startCharging(2)">Open Port 2</button>
        <button class="smallButton" @click="startCharging(3)">Open Port 3</button>
        <button class="smallButton" @click="startCharging(4)">Open Port 4</button>
      </div>
      <div>
        <button class="smallButton" @click="stopCharging(1)">Close Port 1</button>
        <button class="smallButton" @click="stopCharging(2)">Close Port 2</button>
        <button class="smallButton" @click="stopCharging(3)">Close Port 3</button>
        <button class="smallButton" @click="stopCharging(4)">Close Port 4</button>
      </div>
      <p id="output"></p> -->   
      <div id="creditOutput"></div>
        <div class="buttonDiv">
          <button id="portSite" class="button4" @click="portNumberPage">Charge</button>
        </div>   
        <div class="buttonDiv">
          <button class="button2" @click="startCharge">Cancel</button>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";

export default {
  name: "chargePage",
  props: ['controller'],
  data() {
    return {
      status: 'not_accepted',
      credits: null
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    this.controller = this.$route.params.controller;
    console.log("controller = ", this.controller);
    if (user) {
      let docRef = db.collection("users").doc(user.uid);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.credits = doc.data().credits;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  computed: {},
  methods: {
    startCharge() {
      this.$router.push({ name: "StartCharge"});
    },
    portNumberPage() {
      this.$router.push({ name: "PortNumberSelection", params: {controller: this.controller} });
    },
    // async startCharging(p) {
    //   if (!this.controller.isConnected) {
    //     output.innerHTML = "You're not connected, please reconnect";
    //     return;
    //   }
    //   let port = p >= 10 ? p : "0" + p;
    //   if (port == null) {
    //     port = "ff";
    //   }
    //   console.log('PORT NUMBER IS: ', p);
    //   await this.controller.turnOnOrOff(port, "01");
    //   const result = await this.controller.readValue();
    // },
    // async stopCharging(p) {
    //   if (!this.controller.isConnected) {
    //     output.innerHTML = "You're not connected, please reconnect";
    //     return;
    //   }
    //   let port = p >= 10 ? p : "0" + p;
    //   if (port == null) {port = "ff";}
    //   await this.controller.turnOnOrOff(port, "00");
    //   const result = await this.controller.readValue();
    //   output.innerHTML += "<br />" + result;
    // }
  }
};
</script>
<style scoped>
* {
  font-size: 20px;
  text-align: left;
}
.buttonDiv {
  text-align: center;
}
button {
  text-align: center;
}
</style>
