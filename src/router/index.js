import firebase from 'firebase';
//import Bluetooth from '@/bluetooth/BluetoothTest1';
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Startpages/Index';
import Login from '@/components/Startpages/Login';
import Signup from '@/components/Startpages/Signup';
import Home from '@/components/Startpages/Home';
import BuyCharge from '@/components/Store/ChargeStore';
import BuyChargeTime from '@/components/Store/BuyChargeTime';
import StartCharge from '@/components/Chargepages/StartChargePage';
import ConfirmedPurchase from '@/components/Store/ConfirmedPurchase';
import UserHistory from '@/components/History/UserHistory';
import MPowerMap from '@/components/MPowerMap';
import ChargePage from '@/components/Chargepages/ChargePage';
import PortNumberSelection from '@/components/Chargepages/PortNumberSelection';
import ChargingCard from '@/components/History/ChargingCard';
import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";

Vue.use(Router);

//const controller = new mPowerBluetoothController();
const controller = new mPowerBluetoothControllerDummy();
//const controller = new PowerstationManager();
//const controller = new DummyPowerstationManager();

const router = new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/chargeStore',
      name: 'BuyCharge',
      component: BuyCharge
    },
    {
      path: '/startChargePage',
      props: {
        default: true,
        controller: controller
      },
      name: 'StartCharge',
      component: StartCharge
    },
    {
      path: '/confirmedPurchase',
      name: 'ConfirmedPurchase',
      component: ConfirmedPurchase
    },
    {
      path: '/buyChargeTime',
      name: 'BuyChargeTime',
      component: BuyChargeTime
    },
    {
      path: '/userHistory',
      name: 'UserHistory',
      component: UserHistory
    },
    {
      path: '/mPowerMap',
      name: 'MPowerMap',
      component: MPowerMap
    },
    {
      path: '/chargePage',
      name: 'ChargePage',
      component: ChargePage
    },
    {
      path: '/portNumberSelection',
      name: 'PortNumberSelection',
      component: PortNumberSelection
    },
    {
      path: '/chargingCard',
      name: 'ChargingCard',
      component: ChargingCard
    }
  ]
});

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User is signed in. Proceed to route
      next();
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Index'
      });
    }
  } else {
    // if route is not guarded by auth, proceed
    next();
  }
});

export default router;
