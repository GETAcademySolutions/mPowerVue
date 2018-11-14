<template>
  <div class="StartChargePage component">      
    <keep-alive></keep-alive>
      <div id="feedbackDiv"></div>
      <h3 style="font-weight: bold;">My Credits: {{ credits }}</h3>
      <p id="creditOutput"></p>
      <p id="output"></p>     
        <div class="hugeButton" style="margin-top: 5%; background-color: rgb(0, 150, 50); text-align: left;">
          <h4>Charge</h4>
          <p>Charge any device at your convenience. Unlock a charger at any time with your mobile phone.</p>
          <button id="connectToBluetooth" class="button4" @click="connectToBluetooth" style="border: 2px solid white; width: 100%;">Charge with credits</button>
        </div>
        <button class="button2" @click="home">Back</button>
    </div>
  <!--</div>-->
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";

export default {
  name: "StartCharge",
  data() {
    return {
      credits: this.credits
    };
  },
  props: ['controller'],
  created() {
    let user = firebase.auth().currentUser;
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
    home() {
      this.$router.push({ name: "Home" });
    },
    async connectToBluetooth() {
      console.log("Start charging controller = ", this.controller);
      if (!this.controller.isConnected) {
        var controllerName = await this.controller.connect();
        output.innerHTML = "You are connected to " + controllerName;
      }
      this.$router.push({
        name: "ChargePage",
        params: { controller: this.controller }
      });
    }
  }
};
</script>