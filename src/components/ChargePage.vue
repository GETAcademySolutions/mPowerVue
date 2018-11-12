<template>
    <div>
      <h3 style="font-weight: bold; text-align: center;">My Credits: {{ credits }}</h3>
      <div style="width: 100%; border: 1px solid black; padding: 10px 20px; margin: 0 0 5% 0;">Jamba kiosk (11)</div>
      <div>Select device</div>
        <p>          
          <label for="test1">
            <input style="font-size: 16px;" class="with-gap" name="group1" type="radio" id="test1" checked />
            <span style="font-size: 16px;">This phone</span>
          </label>
        </p>
        <p>          
          <label for="test2">
            <input style="font-size: 16px;" class="with-gap" name="group1" type="radio" id="test2" />
            <span style="font-size: 16px;">General access</span>
          </label>
        </p>
          <div>Have you already pluggen in your device?</div>
        <p>          
          <label for="test3">
            <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test3" checked />
            <span style="font-size: 16px;">Yes</span>
          </label>
        </p>
        <p>          
          <label for="test4">
            <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test4" />
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
          <button id="purchaseButton" class="button4" @click="removeCredits(-1)">Remove credits</button>
        </div>  
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

export default {
  name: "chargePage",
  data() {
    return {
      controller: null,
      status: 'not_accepted',
      credits: this.credits
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
            console.log("got credits: ", doc.data().credits);
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
    removeCredits(n) {
      let user = firebase.auth().currentUser;
      console.log("credits: " + this.credits);
      if (this.credits > 0) {
        db.collection("users")
          .doc(user.uid)
          .set({ credits: (this.credits += n) }, { merge: true })
          .then(function() {
            console.log("Credits successfully changed by: " + n);
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      } else {
        document.getElementById("creditOutput").innerHTML =
          "Insufficient credits";
        document.getElementById("purchaseButton").style.visibility = "hidden";
      }
    },
    startCharge() {
      this.$router.push({ name: "StartCharge" });
    },
    portNumberPage() {
      this.$router.push({ name: "PortNumberSelection" });
    },
    async startCharging(p) {
      if (!this.controller.isConnected) {
        output.innerHTML = "You're not connected, please reconnect";
        return;
      }
      let port = p >= 10 ? p : "0" + p;
      await this.controller.turnOnOrOff(port, "01");
      const result = await this.controller.readValue();
      output.innerHTML += "<br />" + result;
    },
    async stopCharging(p) {
      if (!this.controller.isConnected) {
        output.innerHTML = "You're not connected, please reconnect";
        return;
      }
      let port = p >= 10 ? p : "0" + p;
      await this.controller.turnOnOrOff(port, "00");
      const result = await this.controller.readValue();
      output.innerHTML += "<br />" + result;
    }
  },
  updated: {
    async connectToBluetooth() {
      console.log(this.controller);
      if (!this.controller.isConnected) {
        var controllerName = await this.controller.connect();
        output.innerHTML = "You are connected to " + controllerName;
      }
    }
  },
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
