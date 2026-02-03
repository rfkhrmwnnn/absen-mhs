<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Jadwal Sholat</h1>
      <p class="text-gray-600 dark:text-gray-400">Wilayah Cirebon dan sekitarnya</p>
    </div>

    <!-- Current Time & Date -->
    <div class="glass rounded-xl p-8 mb-8 text-center">
      <div class="mb-4">
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">Waktu Sekarang</p>
        <p class="text-5xl font-bold gradient-text mb-2">{{ currentTime }}</p>
        <p class="text-xl text-gray-700 dark:text-gray-300">{{ currentDate }}</p>
      </div>
      
      <div v-if="nextPrayer" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Sholat Berikutnya</p>
        <div class="flex items-center justify-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-left">
            <p class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ nextPrayer.name }}</p>
            <p class="text-lg text-gray-600 dark:text-gray-400">{{ nextPrayer.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="glass rounded-xl p-12 text-center">
      <div class="spinner mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Memuat jadwal sholat...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass rounded-xl p-8">
      <div class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Prayer Times Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="prayer in prayerTimes"
        :key="prayer.name"
        :class="prayer.isNext ? 'ring-2 ring-green-500' : ''"
        class="glass rounded-xl p-6 card-hover relative overflow-hidden"
      >
        <div v-if="prayer.isNext" class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Selanjutnya
        </div>
        
        <div class="flex items-center space-x-4 mb-4">
          <div :class="getPrayerColor(prayer.name)" class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ prayer.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ prayer.nameAr }}</p>
          </div>
        </div>
        
        <div class="text-center py-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ prayer.time }}</p>
        </div>
      </div>
    </div>

    <!-- Location Info -->
    <div class="mt-8 glass rounded-xl p-6">
      <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="font-semibold">Lokasi: Cirebon, Jawa Barat, Indonesia</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
const prayerTimes = ref([])
const loading = ref(true)
const error = ref('')
let timeInterval = null

const nextPrayer = computed(() => {
  return prayerTimes.value.find(p => p.isNext)
})

onMounted(async () => {
  updateCurrentTime()
  timeInterval = setInterval(updateCurrentTime, 1000)
  await fetchPrayerTimes()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

const updateCurrentTime = () => {
  const now = new Date()
  
  currentTime.value = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  currentDate.value = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchPrayerTimes = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Cirebon coordinates
    const latitude = -6.7063
    const longitude = 108.5571
    
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    
    // Using Aladhan API for prayer times
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=20`
    )
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data jadwal sholat')
    }
    
    const data = await response.json()
    const timings = data.data.timings
    
    prayerTimes.value = [
      { name: 'Subuh', nameAr: 'الفجر', time: timings.Fajr, isNext: false },
      { name: 'Dzuhur', nameAr: 'الظهر', time: timings.Dhuhr, isNext: false },
      { name: 'Ashar', nameAr: 'العصر', time: timings.Asr, isNext: false },
      { name: 'Maghrib', nameAr: 'المغرب', time: timings.Maghrib, isNext: false },
      { name: 'Isya', nameAr: 'العشاء', time: timings.Isha, isNext: false },
    ]
    
    updateNextPrayer()
    
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const updateNextPrayer = () => {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  
  let nextPrayerIndex = -1
  let minDiff = Infinity
  
  prayerTimes.value.forEach((prayer, index) => {
    const [hours, minutes] = prayer.time.split(':').map(Number)
    const prayerMinutes = hours * 60 + minutes
    const diff = prayerMinutes - currentMinutes
    
    if (diff > 0 && diff < minDiff) {
      minDiff = diff
      nextPrayerIndex = index
    }
  })
  
  // Reset all
  prayerTimes.value.forEach(p => p.isNext = false)
  
  // Set next prayer
  if (nextPrayerIndex !== -1) {
    prayerTimes.value[nextPrayerIndex].isNext = true
  } else {
    // If no prayer left today, next is Fajr tomorrow
    prayerTimes.value[0].isNext = true
  }
}

const getPrayerColor = (name) => {
  const colors = {
    'Subuh': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'Dzuhur': 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'Ashar': 'bg-gradient-to-br from-orange-500 to-orange-600',
    'Maghrib': 'bg-gradient-to-br from-red-500 to-red-600',
    'Isya': 'bg-gradient-to-br from-purple-500 to-purple-600',
  }
  return colors[name] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}
</script>
