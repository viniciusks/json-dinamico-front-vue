import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Form from '@/components/FormDinamic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    }
  ]
})
