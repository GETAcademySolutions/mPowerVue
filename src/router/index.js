import firebase from 'firebase';
//import Bluetooth from '@/bluetooth/BluetoothTest1';
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Home from '@/components/Home';
import BuyCharge from '@/components/ChargeStore';
import BuyChargeTime from '@/components/BuyChargeTime';
import StartCharge from '@/components/StartChargePage';
import ConfirmedPurchase from '@/components/ConfirmedPurchase';
import UserHistory from '@/components/UserHistory';
import MPowerMap from '@/components/MPowerMap';
import ChargePage from '@/components/ChargePage';
import PortNumberSelection from '@/components/PortNumberSelection';
//import mPowerBluetoothController from "@/bluetooth/mPowerBluetoothController";
import mPowerBluetoothControllerDummy from "@/bluetooth/mPowerBluetoothController";

Vue.use(Router);

//const controller = new mPowerBluetoothController();
const controller = new mPowerBluetoothControllerDummy();

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
