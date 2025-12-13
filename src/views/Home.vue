<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Navbar -->
    <nav class="glass fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">A</span>
            </div>
            <span class="text-xl font-bold gradient-text"
              >Absensi Mahasiswa</span
            >
          </div>

          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                v-if="!isDark"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>

            <router-link to="/login" class="btn-secondary"> Masuk </router-link>
            <router-link to="/register" class="btn-primary">
              Daftar
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="pt-32 pb-20 px-6">
      <div class="container mx-auto">
        <div class="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 class="text-6xl font-bold mb-6">
            <span class="gradient-text">Sistem Absensi</span>
            <br />
            <span class="text-gray-800 dark:text-gray-100"
              >Mahasiswa</span
            >
          </h1>

          <p
            class="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
          >
            Kelola absensi dengan mudah menggunakan teknologi QR Code. Cepat,
            akurat, dan real-time untuk mahasiswa dan admin.
          </p>

          <div class="flex items-center justify-center space-x-4">
            <router-link to="/register" class="btn-primary text-lg px-8 py-4">
              Mulai Sekarang
              <svg
                class="w-5 h-5 inline-block ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </router-link>

            <router-link to="/login" class="btn-secondary text-lg px-8 py-4">
              Login
            </router-link>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mt-24 animate-slide-up">
          <div class="glass rounded-2xl p-8 card-hover">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
            >
              QR Code Scanner
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Scan QR code untuk absensi cepat dan akurat tanpa perlu antri
            </p>
          </div>

          <div class="glass rounded-2xl p-8 card-hover">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
            >
              Rekap Real-time
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Lihat dan export data absensi ke Excel dengan mudah
            </p>
          </div>

          <div class="glass rounded-2xl p-8 card-hover">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
            >
              Jadwal Sholat
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Akses jadwal sholat real-time untuk wilayah Cirebon
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="glass mt-20 py-8">
      <div
        class="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400"
      >
        <p>&copy; 2025 Absensi Mahasiswa. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>
