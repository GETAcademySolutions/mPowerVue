  export default class FireBaseService {
  constructor() {

  }
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
  };
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
  }

}