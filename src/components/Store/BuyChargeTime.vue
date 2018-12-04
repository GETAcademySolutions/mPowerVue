<template>
  <div class="Purchase">
    <h4>Your current balance:</h4>
    <h4>{{ credits }}</h4>
    <div id="feedbackDiv"></div>
    <div style="text-align: left;">Select amount</div>
    <p>
      <label for="test1">
        <input style="font-size: 16px;" class="with-gap" @click="confirmedPurchase(1)" name="group1" type="radio" id="test1" checked />
        <span style="font-size: 16px;">1 Credits</span>
      </label>
    </p>
    <p>
      <label for="test2">
        <input style="font-size: 16px;" class="with-gap" @click="confirmedPurchase(5)" name="group1" type="radio" id="test2" />
        <span style="font-size: 16px;">5 Credits</span>
      </label>
    </p>
    <p>
      <label for="test3">
        <input style="font-size: 16px;" class="with-gap" @click="confirmedPurchase(10)" name="group1" type="radio" id="test3" />
        <span style="font-size: 16px;">10 Credits</span>
      </label>
    </p>
    <p>
      <label for="test4">
        <input style="font-size: 16px;" class="with-gap" @click="confirmedPurchase(25)" name="group1" type="radio" id="test4" />
        <span style="font-size: 16px;">25 Credits</span>
      </label>
    </p>
    <div style="text-align: left;">Select payment method</div>
    <p>
      <label for="test5">
        <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test5" checked />
        <span style="font-size: 16px;">mPesa</span>
      </label>
    </p>
    <p>
      <label for="test6">
        <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test6" />
        <span style="font-size: 16px;">Paypal</span>
      </label>
    </p>
    <h5 style="text-align: left;">Payment: $</h5> <!--{{ value }}-->
    <div>
      <button class="button4" @click="buyCharge">Next</button>
    </div>
    <div>
      <button class="button2" @click="buyCharge">Back</button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "BuyChargeTime",
  firebase: {},
  data() {
    return {
      user: null,
      credits: this.credits
    };
  },
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
    confirmedPurchase(n) {
      let user = firebase.auth().currentUser;
      db.collection("users")
        .doc(user.uid)
        .set(
          {
            credits: (this.credits += n)
          },
          {
            merge: true
          }
        )
        .then(function() {
          console.log("Credits successfully changed by: " + n);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    buyCharge() {
      this.$router.push({
        name: "BuyCharge"
      });
    }
  }
};
</script>
<style scoped>
p {
  text-align: left;
}
</style>
