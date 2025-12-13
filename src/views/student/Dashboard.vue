<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile Overlay -->
    <div 
      v-if="mobileMenuOpen" 
      @click="mobileMenuOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed left-0 top-0 h-screen w-64 glass border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 class="font-bold text-lg gradient-text">Mahasiswa</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
            </div>
          </div>
          <!-- Close button for mobile -->
          <button 
            @click="mobileMenuOpen = false"
            class="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <router-link
            to="/student/scan"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/student/scan' ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span class="font-semibold">Scan Absensi</span>
          </router-link>

          <router-link
            to="/student/profile"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/student/profile' ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="font-semibold">Profile</span>
          </router-link>

          <router-link
            to="/student/prayer-times"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/student/prayer-times' ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-semibold">Jadwal Sholat</span>
          </router-link>

          <router-link
            to="/student/leave-request"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/student/leave-request' ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="font-semibold">Pengajuan Izin</span>
          </router-link>
        </nav>
      </div>

      <!-- User Info & Logout -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold">{{ authStore.user?.name?.charAt(0) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.user?.nim }}</p>
          </div>
        </div>
        
        <button @click="toggleTheme" class="w-full mb-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
          <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="text-sm font-semibold">{{ isDark ? 'Light' : 'Dark' }} Mode</span>
        </button>

        <button @click="handleLogout" class="w-full btn-danger flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-gray-200 dark:border-gray-700 z-30 flex items-center justify-between px-4">
      <button 
        @click="mobileMenuOpen = true"
        class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="font-bold text-lg gradient-text">Mahasiswa</h1>
      <div class="w-6"></div>
    </header>

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useThemeStore } from '../../stores/theme'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const mobileMenuOpen = ref(false)
const isDark = computed(() => themeStore.isDark)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
