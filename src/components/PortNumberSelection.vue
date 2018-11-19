<template>
    <div class="component">
        <h4>{{credits}}</h4>
        <h3>Enter port number</h3>
        <p>If your device is already plugged into the port, write the port number below</p>
        <p id="output"></p>
        <input id="portNumber" type="text" placeholder="Port number" />
        <div id="buttonDiv">
        <button class="button4" @click="removeCredits(-1)">Connect</button> 
        <button class="button1" @click="startCharging(3)">Credit test</button> <!-- (portNumber elns) -->
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
//import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";
export default {
  props: ['controller'],
  data() {
    return {
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
      this.$router.go(-2);
      alert(
        "You succsessfully purchased one loading session, lasting 24 hours for 1 credits!"
      );
    },
    async startCharging(p) {
      if (!this.controller.isConnected) {
        output.innerHTML = "You're not connected, please reconnect";
        return;
      }
      let port = p >= 10 ? p : "0" + p;
      if (port == null) {
        port = "ff";
      }
      console.log('PORT NUMBER IS: ', p);
      await this.controller.turnOnOrOff(port, "01");
      const result = await this.controller.readValue();
    }
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