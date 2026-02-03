import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'students',
        name: 'AdminStudents',
        component: () => import('../views/admin/Students.vue'),
      },
      {
        path: 'create-qr',
        name: 'AdminCreateQR',
        component: () => import('../views/admin/CreateQR.vue'),
      },
      {
        path: 'attendance',
        name: 'AdminAttendance',
        component: () => import('../views/admin/Attendance.vue'),
      },
      {
        path: 'leave-requests',
        name: 'AdminLeaveRequests',
        component: () => import('../views/admin/LeaveRequests.vue'),
      },
    ],
  },
  {
    path: '/student',
    name: 'StudentDashboard',
    component: () => import('../views/student/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: 'scan',
        name: 'StudentScan',
        component: () => import('../views/student/Scan.vue'),
      },
      {
        path: 'profile',
        name: 'StudentProfile',
        component: () => import('../views/student/Profile.vue'),
      },
      {
        path: 'prayer-times',
        name: 'StudentPrayerTimes',
        component: () => import('../views/student/PrayerTimes.vue'),
      },
      {
        path: 'leave-request',
        name: 'StudentLeaveRequest',
        component: () => import('../views/student/LeaveRequest.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next('/')
  } else {
    next()
  }
})

export default router
