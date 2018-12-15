import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Process from '@/view/dashboard/ProcessPage'
import ProcessDetail from '@/view/dashboard/processServerDetail'
import Delay from '@/view/dashboard/DelayPage'
import DelayDetail from '@/view/dashboard/DelayDetail'
import serverGroup from '@/view/dashboard/serverGroup'
import serverDefault from '@/view/dashboard/serverDefault'
import clientConfigureGroup from '@/view/dashboard/clientConfigureGroup'
import instanceConfigureGroup from '@/view/dashboard/instanceConfigureGroup'
import clientConfigureDefault from '@/view/dashboard/clientConfigureDefault'
import instanceConfigureDefault from '@/view/dashboard/instanceConfigureDefault'
import serverConfigure from '@/view/dashboard/serverConfigure'
import Login from '@/view//Login'
import userList from '@/view/dashboard/userList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
      children:[
        {
          path: '/process',
          name: '进程配置',
          component: Process,
        },{
          path: '/process/server',
          name: 'server监控',
          component: ProcessDetail,
        },{
          path: '/delay',
          name: '延迟监控',
          component: Delay,
        },{
          path: '/delay/detail',
          name: '延迟监控配置',
          component: DelayDetail,
        },{
          path: '/group',
          name: 'server配置管理group',
          component: serverGroup,
        },{
          path: '/default',
          name: 'server配置管理default',
          component: serverDefault,
        },{
          path: '/group1/client',
          name: 'client配置管理',
          component: clientConfigureGroup,
        },{
          path: '/group1/instance',
          name: 'instance配置管理',
          component: instanceConfigureGroup,
        },{
          path: '/group2/client',
          name: 'client配置管理',
          component: clientConfigureDefault,
        },{
          path: '/group2/instance',
          name: 'instance配置管理',
          component: instanceConfigureDefault,
        },{
          path: '/serverconfigure',
          name: 'server配置',
          component: serverConfigure,
        },{
          path: '/system/user',
          name: '用户管理',
          component: userList,
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component:Login
    }
  ]
 // mode:'history'
})
