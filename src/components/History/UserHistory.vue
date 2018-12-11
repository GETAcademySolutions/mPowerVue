<template>
  <div class="History">
    <div class="col s12 m6">
      <div class="card green">
        <div class="card-action">
          <a v-on:click="isHidden = false">Charging</a>
          <a v-on:click="isHidden = true">History</a>
        </div>
      </div>
    </div>
    <charging-card v-if="charges && !isHidden" v-bind:charges="charges" />
    <div v-if="isHidden">
      <h5>History:</h5>
      <div v-for="item in charges" style="text-align: left;">
            <a style="font-size: 20px;"><b>{{ item.startDate }} {{ months2[item.monthCount] }}</b></a>
          <p>
            {{ item.portNo }}, Kiosk name
          </p>
          <p>
            {{ item.chargeTime }} - {{ item.fullyChargedAt }}
          </p>
          <p>
            {{ item.creditsUsed }} Credit
          </p>
            
    <div class="divider green" style="height: 3px; margin: 5% 0;"></div>
      </div>
    </div>
    <div>
      <button class="button4" @click="chargingCard">ChargingCard</button>
    </div>
    <div>
      <button class="button2" @click="home">Back</button>
    </div>
  </div>
</template>

<script>
  import ChargingCard from "@/components/History/ChargingCard";

  var currentdate = new Date();
  var date =
    ("0" + currentdate.getDate()).slice(-2);

  var time =
    ("0" + currentdate.getHours()).slice(-2) +
    ":" +
    ("0" + currentdate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentdate.getSeconds()).slice(-2);
    
  var date2 =
    ("0" + currentdate.getDate()).slice(-2);

  var time2 =
    ("0" + (currentdate.getHours() + 1)).slice(-2) +
    ":" +
    ("0" + currentdate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentdate.getSeconds()).slice(-2);

    // if (currentdate.getMonth() === 1) {currentdate.getMonth() = "January"};
    // if (currentdate.getMonth() === 2) {currentdate.getMonth() = "February"};
    // if (currentdate.getMonth() === 3) {currentdate.getMonth() = "Mars"};
    // if (currentdate.getMonth() === 4) {currentdate.getMonth() = "April"};
    // if (currentdate.getMonth() === 5) {currentdate.getMonth() = "May"};
    // if (currentdate.getMonth() === 6) {currentdate.getMonth() = "June"};
    // if (currentdate.getMonth() === 7) {currentdate.getMonth() = "July"};
    // if (currentdate.getMonth() === 8) {currentdate.getMonth() = "August"};
    // if (currentdate.getMonth() === 9) {currentdate.getMonth() = "September"};
    // if (currentdate.getMonth() === 10) {currentdate.getMonth() = "October"};
    // if (currentdate.getMonth() === 11) {currentdate.getMonth() = "November"};
    // if (currentdate.getMonth() === 12) {currentdate.getMonth() = "December"};
    var getmonth = currentdate.getMonth();

  export default {
    name: "History",
    data() {
      return {
        isHidden: false,
        credits: this.credits,
        charges: [],
        chargeObject: {
          portNo: 0,
          device: null,
          chargeTime: null,
          batteryLevel: null,
          fullyChargedAt: null,
          creditsUsed: null,
          monthCount: null
        },
        months: ['January', 'February', 'March', 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        months2: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
        'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        charges: [{
            portNo: "portNo",
            batteryLevel: "100%",
            device: "This phone",
            chargeTime: time,
            startDate: date,
            creditsUsed: 1,
            fullyChargedAt: time2,
            monthCount: getmonth
          },
          {
            portNo: "portNo",
            batteryLevel: "100%",
            device: "This phone",
            chargeTime: time,
            startDate: date,
            creditsUsed: 1,
            fullyChargedAt: time2,
            monthCount: getmonth
          }
        ]
      };
    },
    methods: {
      home() {
        this.$router.push({
          name: "Home"
        });
      },
      chargingCard() {
        this.$router.push({
          name: "ChargingCard"
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
