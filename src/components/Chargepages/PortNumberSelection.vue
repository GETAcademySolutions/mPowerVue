<template>
  <div class="component">
    <h4>{{credits}}</h4>
    <h3>Enter port number</h3>
    <p>If your device is already plugged into the port, write the port number below.</p>
    <p>Alternatively, don't type anything to get a random port.</p>
    <p id="output"></p>
    <input id="portNumber" type="text" placeholder="Port number">
    <div id="buttonDiv">
      <button class="button4" @click="removeCredits(-1)">Purchase charge</button>
      <button class="button4" @click="makenew">Edgar's button</button>
    </div>
  </div>
</template>

<script>
  import db from "@/firebase/init";
  import firebase from "firebase";
  import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
  import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";
  export default {
    props: ["controller"],
    data() {
      return {
        credits: this.credits,
        // charges: [{            
        //     portNo: null,
        //     progress: null,
        //     id: null,
        //     timestamp: null,
        //     ticks: null,
        //     user_id: null
        // }]
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
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      }
    },
    methods: {
      async removeCredits(n) {
        let user = firebase.auth().currentUser;
        console.log("credits: " + this.credits);
        if (!this.controller.isConnected) {
          output.innerHTML = "You're not connected, please reconnect";
          return;
        }
        if (this.credits > 0) {
          db.collection("users")
            .doc(user.uid)
            .set({
              credits: (this.credits += n)
            }, {
              merge: true
            })
            .then(function () {
              console.log("Credits successfully changed by: " + n);
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        } else {
          document.getElementById("creditOutput").innerHTML =
            "Insufficient credits";
          document.getElementById("purchaseButton").style.visibility = "hidden";
        }
        let p = document.getElementById("portNumber").value;
        let port = p >= 10 ? p : "0" + p;
        if (port == "0" || port == null) {
          port = "ff";
        }
        console.log("PORT NUMBER IS: ", p);
        await this.controller.turnOnOrOff(port, "01");
        const result = await this.controller.readValue();
        // const result = port + " 01";
        output.innerHTML = "Connected to port " + port + " 01";
        output.innerHTML += "<br />" + result;
        const ack = await this.controller.characteristic.readValue();
        //const ack2 = ack.buffer;
        var myData = ack;
        console.log("VIKTIG MELDING: ", ack);

        //console.log("VIKTIG MELDING2: ", ack2);
        if (p <= 4) {
          this.$router.go(-2);
          output.innerHTML +=
            "<br /> You succsessfully purchased one loading session, lasting 24 hours for 1 credits!";
          const success = myData.getUint8(0) === 1;
          const portNo = myData.getUint8(1);
          const logTxt = "port " + portNo + ": success=" + success;
          console.log(logTxt);
          let oneCharge = new chargeObject();
          onecharge.portNo = portNo;
          onecharge.chargeTime = Date.now();
          onecharge.fullyChargedAt = onecharge.chargetime;
          // onecharge.fullyChargedAt + én time
        }
      },
      makenew() {
        let charge = null;
        charge.user_id = this.user_id;
        charge.timestamp = Date.now();
        charge.ticks = 60 * 60;
        charge.portNo = xxx;
        charge.progress = 0;
        charge.id = this.charges.length;
        charges.push(charge);
        setInterval(() => {
          charge.ticks--;
          if (charge.ticks <= 0) {
            clearInterval();
            let ix = this.charges.findIndex(e => e.ticks <= 0);
            if (~ix) {
              this.charges.splice(ix, 1);
            }
          }
        }, 1000);
      }
    }
  };

</script>

<style scoped>
* {
  text-align: left;
}

p {
  font-size: 20px;
}

#buttonDiv,
button,
h4 {
  text-align: center;
}

::placeholder {
  color: rgba(20, 20, 20, 1);
}
</style>
