<template>
  <div class="component">
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
</template>

<script>
 
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
      history() {
        this.$router.push({
          name: "UserHistory"
        });
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
p {
  font-size: 14px;
}
.card-content {
  padding: 20px 50px;
}
</style>