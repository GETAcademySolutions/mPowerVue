<template>
  <div class="StartChargePage component">
      <keep-alive></keep-alive>
      <div id="feedbackDiv"></div>
      <h3 style="font-weight: bold;">My Credits: {{ credits }}</h3>
    <div class="card">
      <charging-card v-if="charges" v-bind:charges="charges" />
      <div class="hugeButton card-content" style="background-color: rgb(0, 150, 50); text-align: left;">
        <h5 style="margin-top: 5%;">Charge with credits</h5>
        <p style="margin-top: 10%;">Charge any device at your convenience. Unlock a charger at any time with your mobile phone.</p>
        <button id="connectToBluetooth" class="button4" @click="connectToBluetooth" style="border: 2px solid white; width: 100%; margin-top: 10%;">Charge
          with credits</button>
      </div>
      <div class="hugeButton card-content" style="background-color: rgb(255, 255, 255); color: black; border: 1px solid black; text-align: left;">
        <h5 style="margin-top: 5%;">Charge with code</h5>
        <p style="margin-top: 10%;">Pay for charging at one of the mPower stations and get a one time charging code.</p>
        <button id="connectToBluetooth" class="button4 white" @click="connectToBluetooth" style="border: 2px solid black; color: black; width: 100%; margin-top: 10%;">Charge
          with code</button>
      </div>
    </div>
    <button class="button2" @click="home">Back</button>
  </div>
</template>

<script>
  import db from "@/firebase/init";
  import firebase from "firebase";
  import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
  import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";
  import ChargingCard from "@/components/History/ChargingCard";

  export default {
    name: "StartCharge",
    data() {
      return {
        credits: this.credits,
        charges: [],
        chargeObject: {
          portNo: 0,
          device: null,
          chargeTime: null,
          batteryLevel: null,
          fullyChargedAt: null
        }
      };
    },
    props: ["controller"],
    created() {
      let user = firebase.auth().currentUser;
      if (user) {
        let docRef = db.collection("users").doc(user.uid);

        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              this.credits = doc.data().credits;
            } else {
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      }
    },
    computed: {},
    methods: {
      home() {
        this.$router.push({
          name: "Home"
        });
      },
      async connectToBluetooth() {
        console.log("Start charging controller = ", this.controller);
        if (!this.controller.isConnected) {
          var controllerName = await this.controller.connect();
        }
        this.$router.push({
          name: "ChargePage",
          params: {
            controller: this.controller
          }
        });
      }
    },
    components: {
      ChargingCard
    }
  };

</script>

<style scoped>
p {
  font-size: 14px;
}
.card-content {
  padding: 20px 50px;
}
</style>