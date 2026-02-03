<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Mobile Menu Overlay -->
    <div
      v-if="mobileMenuOpen"
      @click="mobileMenuOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <!-- Navbar -->
    <nav class="glass fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg sm:text-xl">A</span>
            </div>
            <span
              class="text-base sm:text-xl font-bold gradient-text hidden sm:inline"
              >Absensi Mahasiswa</span
            >
            <span class="text-base font-bold gradient-text sm:hidden"
              >Absensi</span
            >
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                v-if="!isDark"
                class="w-5 h-5 lg:w-6 lg:h-6"
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
                class="w-5 h-5 lg:w-6 lg:h-6"
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

            <router-link
              to="/login"
              class="btn-secondary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Masuk
            </router-link>
            <router-link
              to="/register"
              class="btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Daftar
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4"
        >
          <button
            @click="toggleTheme"
            class="w-full flex items-center justify-center space-x-2 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              v-if="!isDark"
              class="w-5 h-5"
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
              class="w-5 h-5"
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
            <span class="font-semibold">{{
              isDark ? "Light Mode" : "Dark Mode"
            }}</span>
          </button>
          <router-link
            to="/login"
            class="block w-full btn-secondary text-center"
            @click="mobileMenuOpen = false"
          >
            Masuk
          </router-link>
          <router-link
            to="/register"
            class="block w-full btn-primary text-center"
            @click="mobileMenuOpen = false"
          >
            Daftar
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div class="container mx-auto">
        <div class="text-center max-w-4xl mx-auto animate-fade-in">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            <span class="gradient-text">Sistem Absensi</span>
            <br />
            <span class="text-gray-800 dark:text-gray-100">Mahasiswa</span>
          </h1>

          <p
            class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
          >
            Kelola absensi dengan mudah menggunakan teknologi QR Code. Cepat,
            akurat, dan real-time untuk mahasiswa dan admin.
          </p>

          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <router-link
              to="/register"
              class="w-full sm:w-auto btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              Mulai Sekarang
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2"
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

            <router-link
              to="/login"
              class="w-full sm:w-auto btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              Login
            </router-link>
          </div>
        </div>

        <!-- Features Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-24 animate-slide-up px-4 sm:px-0"
        >
          <div class="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6"
            >
              <svg
                class="w-6 h-6 sm:w-8 sm:h-8 text-white"
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
              class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100"
            >
              QR Code Scanner
            </h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Scan QR code untuk absensi cepat dan akurat tanpa perlu antri
            </p>
          </div>

          <div class="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6"
            >
              <svg
                class="w-6 h-6 sm:w-8 sm:h-8 text-white"
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
              class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100"
            >
              Rekap Real-time
            </h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Lihat dan export data absensi ke Excel dengan mudah
            </p>
          </div>

          <div class="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6"
            >
              <svg
                class="w-6 h-6 sm:w-8 sm:h-8 text-white"
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
              class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100"
            >
              Jadwal Sholat
            </h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Akses jadwal sholat real-time untuk wilayah Cirebon
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="glass mt-12 sm:mt-20 py-6 sm:py-8">
      <div
        class="container mx-auto px-4 sm:px-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-400"
      >
        <p>&copy; 2025 Absensi Mahasiswa. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
const mobileMenuOpen = ref(false);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>
