<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Scan QR Code</h1>
      <p class="text-gray-600 dark:text-gray-400">Scan QR Code untuk melakukan absensi</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Total Kehadiran</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ myAttendances.length }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Bulan Ini</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ monthlyAttendances }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Minggu Ini</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ weeklyAttendances }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- QR Scanner -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Scanner QR Code</h2>
        
        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ successMessage }}
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {{ errorMessage }}
          </div>
        </div>

        <div v-if="!isScanning" class="text-center py-12">
          <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Klik tombol di bawah untuk memulai scan QR Code.<br/>
            <span class="text-sm">Browser akan meminta izin akses kamera.</span>
          </p>
          <button @click="startScanning" class="btn-primary">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mulai Scan
          </button>
        </div>

        <div v-else>
          <div id="qr-reader" class="rounded-lg overflow-hidden mb-4"></div>
          <button @click="stopScanning" class="w-full btn-danger">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Berhenti Scan
          </button>
        </div>

        <!-- Manual Input -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Atau masukkan kode manual</p>
          <div class="flex space-x-2">
            <input
              v-model="manualCode"
              type="text"
              placeholder="Masukkan kode QR"
              class="input-field flex-1"
            />
            <button @click="submitManualCode" class="btn-primary px-6">
              Submit
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Attendance -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Riwayat Absensi Terbaru</h2>
        
        <div v-if="recentAttendances.length > 0" class="space-y-4">
          <div v-for="attendance in recentAttendances" :key="attendance.id" class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-bold text-gray-800 dark:text-gray-100">{{ attendance.subject }}</h3>
              <span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Hadir</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(attendance.date) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{{ formatTime(attendance.timestamp) }}</p>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Belum ada riwayat absensi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useAttendanceStore } from '../../stores/attendance'
import { Html5Qrcode } from 'html5-qrcode'

const authStore = useAuthStore()
const attendanceStore = useAttendanceStore()

const isScanning = ref(false)
const html5QrCode = ref(null)
const successMessage = ref('')
const errorMessage = ref('')
const manualCode = ref('')

const myAttendances = computed(() => 
  attendanceStore.getAttendancesByStudent(authStore.user?.id)
)

const recentAttendances = computed(() => 
  myAttendances.value.slice(0, 5).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
)

const monthlyAttendances = computed(() => {
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  return myAttendances.value.filter(a => {
    const date = new Date(a.timestamp)
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear
  }).length
})

const weeklyAttendances = computed(() => {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return myAttendances.value.filter(a => new Date(a.timestamp) >= weekAgo).length
})

const startScanning = async () => {
  try {
    // Clear previous messages
    errorMessage.value = ''
    successMessage.value = ''
    
    // Check if browser supports camera
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Browser Anda tidak mendukung akses kamera')
    }
    
    // Initialize Html5Qrcode
    html5QrCode.value = new Html5Qrcode("qr-reader")
    
    // Get available cameras
    const devices = await Html5Qrcode.getCameras()
    
    if (!devices || devices.length === 0) {
      throw new Error('Tidak ada kamera yang terdeteksi')
    }
    
    console.log('Available cameras:', devices)
    
    // Try to find back camera, otherwise use first available
    let cameraId = devices[0].id
    
    // Look for back camera (environment facing)
    const backCamera = devices.find(device => 
      device.label.toLowerCase().includes('back') || 
      device.label.toLowerCase().includes('rear') ||
      device.label.toLowerCase().includes('environment')
    )
    
    if (backCamera) {
      cameraId = backCamera.id
      console.log('Using back camera:', backCamera.label)
    } else {
      console.log('Using first available camera:', devices[0].label)
    }
    
    // Start scanning with the selected camera
    await html5QrCode.value.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      onScanSuccess,
      onScanError
    )
    
    isScanning.value = true
    errorMessage.value = ''
  } catch (err) {
    console.error('Camera error:', err)
    errorMessage.value = err.message || 'Gagal mengakses kamera. Pastikan Anda telah mengizinkan akses kamera.'
    
    // Clean up if initialization failed
    if (html5QrCode.value) {
      try {
        await html5QrCode.value.clear()
      } catch (clearErr) {
        console.error('Error clearing scanner:', clearErr)
      }
      html5QrCode.value = null
    }
  }
}

const stopScanning = async () => {
  if (html5QrCode.value) {
    await html5QrCode.value.stop()
    html5QrCode.value = null
  }
  isScanning.value = false
}

const onScanSuccess = (decodedText) => {
  processQRCode(decodedText)
  stopScanning()
}

const onScanError = (err) => {
  // Ignore scan errors (happens frequently during scanning)
}

const processQRCode = (qrData) => {
  try {
    const data = JSON.parse(qrData)
    
    attendanceStore.recordAttendance(authStore.user.id, data.id)
    
    successMessage.value = `Absensi berhasil untuk ${data.subject}!`
    errorMessage.value = ''
    
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (err) {
    errorMessage.value = err.message
    successMessage.value = ''
  }
}

const submitManualCode = () => {
  if (!manualCode.value) {
    errorMessage.value = 'Masukkan kode QR terlebih dahulu'
    return
  }
  
  processQRCode(manualCode.value)
  manualCode.value = ''
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onUnmounted(() => {
  if (html5QrCode.value) {
    stopScanning()
  }
})
</script>
