import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import inMed from '@/components/inMed'
import outMed from '@/components/outMed'
import haveMed from '@/components/haveMed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inMed',
      name: 'inMed',
      component: inMed
    },
    {
      path: '/outMed',
      name: 'outMed',
      component: outMed
    },
    {
      path: '/haveMed',
      name: 'haveMed',
      component: haveMed
    }
  ]
})
