<template>
  <div class="component">
      <div v-for="item in charges" class="card blue-gray" style="text-align: left;">
        <div class="card-content">
          <h5>Port: {{ item.portNo }} <a style="float: right; color: green; font-weight: bold;">{{item.batteryLevel}}</a></h5>
          <h5>Device: <a>{{ item.device }}</a></h5>
          <h5>Started charging at <a>{{ item.chargeTime }}</a></h5>
          <h5>Fully charged at <a>{{ item.fullyChargedAt }}</a></h5>
        </div>
      </div>
  </div>
</template>

<script>
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + " - " 
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var datetime2 = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + " - " 
                + (currentdate.getHours()+1) + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
export default {    
  data() {
    return {
        charges: [{            
            portNo: "portNo",
            batteryLevel: "25%",
            device: "This phone",
            chargeTime: datetime,
            fullyChargedAt: datetime2,
        }]
    };
  },

};
</script>
