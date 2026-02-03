<template>
  <div class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="spinner mx-auto mb-3"></div>
      <p class="text-sm text-gray-600 dark:text-gray-400">Memuat data cuaca...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ error }}</p>
      <button @click="fetchWeather" class="mt-3 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline">
        Coba Lagi
      </button>
    </div>

    <!-- Weather Data -->
    <div v-else-if="weather" class="animate-fade-in">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
            Cuaca Cirebon
          </h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {{ formatTime(lastUpdate) }}
          </p>
        </div>
        <button 
          @click="fetchWeather" 
          :disabled="refreshing"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Refresh"
        >
          <svg 
            :class="{'animate-spin': refreshing}" 
            class="w-5 h-5 text-gray-600 dark:text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <!-- Weather Icon -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <span class="text-4xl sm:text-5xl">{{ getWeatherEmoji(weather.weather[0].main) }}</span>
          </div>
          
          <!-- Temperature -->
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              {{ Math.round(weather.main.temp) }}°C
            </div>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 capitalize">
              {{ weather.weather[0].description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Terasa Seperti</p>
          <p class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
            {{ Math.round(weather.main.feels_like) }}°C
          </p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Kelembaban</p>
          <p class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
            {{ weather.main.humidity }}%
          </p>
        </div>
        <div class="text-center col-span-2 sm:col-span-1">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Kecepatan Angin</p>
          <p class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
            {{ Math.round(weather.wind.speed * 3.6) }} km/h
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const weather = ref(null)
const loading = ref(true)
const error = ref(null)
const refreshing = ref(false)
const lastUpdate = ref(null)
let refreshInterval = null

// OpenWeatherMap API key (free tier)
// Note: Untuk production, sebaiknya simpan di environment variables
const API_KEY = '9bffa714094a0a1e08d02ef741d72145' // Free API key untuk demo
const CITY = 'Cirebon'
const COUNTRY_CODE = 'ID'

const fetchWeather = async () => {
  if (weather.value) {
    refreshing.value = true
  } else {
    loading.value = true
  }
  
  error.value = null

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric&lang=id`
    )

    if (!response.ok) {
      throw new Error('Gagal mengambil data cuaca')
    }

    const data = await response.json()
    weather.value = data
    lastUpdate.value = new Date()
  } catch (err) {
    error.value = 'Tidak dapat memuat data cuaca. Silakan coba lagi.'
    console.error('Weather API Error:', err)
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

const getWeatherEmoji = (condition) => {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌋',
    'Squall': '💨',
    'Tornado': '🌪️'
  }
  return emojiMap[condition] || '🌤️'
}

const formatTime = (date) => {
  if (!date) return ''
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchWeather()
  // Auto refresh setiap 30 menit
  refreshInterval = setInterval(fetchWeather, 30 * 60 * 1000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>
