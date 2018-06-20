import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import studentDashboard from '../components/student/studentDashboard.vue'
import {staffRoutes} from './staffRoute';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
        },
        {
            path: '/studentDashboard',
            name: 'studentDashboard',
            component: studentDashboard
        },
        ...staffRoutes
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
