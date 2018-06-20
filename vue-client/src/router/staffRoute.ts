import Home from '../components/staff/Staff.vue';
import Login from '../components/staff/Login.vue';
import Dashboard from '../components/staff/Dashboard.vue';
import CreateAssignment from '../components/staff/CreateAssignment.vue';
import AssignmentDetail from '../components/staff/AssignmentDetail.vue';
import AssignmentRules from '../components/staff/Rules/AssignmentRules.vue';
import ProjectDetail from '../components/staff/ProjectDetail.vue';
import CodeViewer from '../components/staff/CodeViewer.vue';

export const staffRoutes = [
    {
        path: '/staff',
        component: Home,
        children: [
            {
                path: '/',
                component: Login,
                alias: 'login'
            },
            {
                path: 'dashboard',
                component: Dashboard,
                name: 'staffDashboard'
            },
            {
                path: 'create',
                component: CreateAssignment,
                name: 'createAssignment'
            },
            {
                path: 'assignment/:id',
                component: AssignmentDetail,
                name: 'assignmentDetail'
            },
            {
                path: 'assignment/:id/rules',
                component: AssignmentRules,
                name: 'assignmentRules'
            },
            {
                path: 'project/:id',
                component: ProjectDetail,
                name: 'projectDetail'
            },
            {
                path: 'code',
                component: CodeViewer,
                name: 'codeViewer'
            },
        ]
    }
];