import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import personalAttendance from '@/components/personal/personal_attendance'
import personalVocation from '@/components/personal/personal_vocation'
import teamAttendance from '@/components/team/team_attendance'
import teamVocation from '@/components/team/team_vocation'
import teamStatistics from "@/components/team/team_statistics"


export default new Router({
  routes: [
      {
          path: '/team_attendance',
          component: teamAttendance
      }, {
          path: '/team_vocation',
          component: teamVocation
      }, {
          path: '/team_statistics',
          component: teamStatistics
      }, {
        path: '/personal_attendance',
        component: personalAttendance
      }, {
        path: '/personal_vocation',
        component: personalVocation
      }
  ]
})
