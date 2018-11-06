<template>
    <div>
        <h5 style="font-weight: bold;">Start Charging</h5>
      <p>_____________________________________________________</p>
      <div id="feedbackDiv"></div>
    <div>      
      <h3 style="font-weight: bold;">My Credits: {{ credits }}</h3>
      <div>
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
      <p id="output"></p>      
    <div>
        <button class="button2" @click="startCharge">Cancel</button>
        </div>
        <div>
          <button id="purchaseButton" class="button4" @click="removeCredits(-1)">Remove credits</button>
        </div>
    </div>
</div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";

export default {
  name: "StartCharge",
  data() {
    return {
      controller: null,
      credits: this.credits
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    this.controller = this.$route.controller;
    console.log("controller = ", this.controller)
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
  }
};
</script>