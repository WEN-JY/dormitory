import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexPage from '@/components/indexPage'
import upload from '@/components/upload'
import infochanges from "@/components/infochanges"
import check_in_out from "@/components/check_in_out"
import cameraG from "@/components/camerag"
import navigate from "@/components/navigate"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/upload',
      name:'upload',
      component:upload
    },
    {
      path:'/infochanges',
      name:'infochanges',
      component:infochanges
    },
    {
      path:'/check_in_out',
      name:'check_in_out',
      component:check_in_out
    },
    {
      path:'/camerag',
      name:'camerag',
      component:cameraG
    },
    {
      path:'/navigate',
      name:'navigate',
      component:navigate
    }
  ]
})
