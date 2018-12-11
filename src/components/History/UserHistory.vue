<template>
  <div class="History">
    <div style="text-align: left;">
      <h4>Receipts</h4>
      <div class="row">
        <p class="toggleMode" v-on:click="isHidden = false" style="margin-right: 15px;">Charging</p>
        <p class="toggleMode" v-on:click="isHidden = true">History</p>
      </div>
      <div class="divider green" style="height: 3px; margin: 5% 0;"></div>
      <charging-card v-if="charges && !isHidden" v-bind:charges="charges" />
      <div v-if="isHidden">
        <div v-for="item in charges">
          <h5><b>{{ item.startDate }} {{ months2[item.monthCount] }}</b></h5>
          <h6>
            {{ item.portNo }}, Kiosk name
          </h6>
          <h6>
            {{ item.chargeTime }} - {{ item.fullyChargedAt }}
          </h6>
          <h6>
            {{ item.creditsUsed }} Credit
          </h6>

          <div class="divider green" style="height: 3px; margin: 5% 0;"></div>
        </div>
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
    ("0" + currentdate.getMinutes()).slice(-2)
  //  +    
  // ":" +
  // ("0" + currentdate.getSeconds()).slice(-2);

  var date2 =
    ("0" + currentdate.getDate()).slice(-2);

  var time2 =
    ("0" + (currentdate.getHours() + 1)).slice(-2) +
    ":" +
    ("0" + currentdate.getMinutes()).slice(-2)
  //  +
  // ":" +
  // ("0" + currentdate.getSeconds()).slice(-2);
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
          'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        months2: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
          'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
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
    font-size: 18px;
  }

  .card-content {
    padding: 20px 50px;
  }

  .toggleMode {
    color: #999999;
  }
  .toggleMode:active {
    color: black;
  }

</style>
