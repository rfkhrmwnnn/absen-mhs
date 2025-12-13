<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Buat QR Code Absensi</h1>
      <p class="text-gray-600 dark:text-gray-400">Generate QR Code untuk sesi absensi</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Form Section -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Informasi Absensi</h2>
        
        <form @submit.prevent="generateQR" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mata Kuliah / Kegiatan
            </label>
            <input
              v-model="formData.subject"
              type="text"
              required
              placeholder="Contoh: Pemrograman Web"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tanggal
            </label>
            <input
              v-model="formData.date"
              type="date"
              required
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Waktu Mulai
            </label>
            <input
              v-model="formData.startTime"
              type="time"
              required
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Waktu Selesai
            </label>
            <input
              v-model="formData.endTime"
              type="time"
              required
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Keterangan (Opsional)
            </label>
            <textarea
              v-model="formData.description"
              rows="3"
              placeholder="Tambahkan keterangan jika diperlukan"
              class="input-field"
            ></textarea>
          </div>

          <button type="submit" class="w-full btn-primary">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Generate QR Code
          </button>
        </form>
      </div>

      <!-- QR Code Display -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">QR Code Preview</h2>
        
        <div v-if="currentQR" class="text-center">
          <div class="bg-white p-6 rounded-xl inline-block mb-6">
            <canvas ref="qrCanvas" class="mx-auto"></canvas>
          </div>
          
          <div class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3">{{ currentQR.subject }}</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Tanggal:</strong> {{ formatDate(currentQR.date) }}</p>
              <p><strong>Waktu:</strong> {{ currentQR.startTime }} - {{ currentQR.endTime }}</p>
              <p v-if="currentQR.description"><strong>Keterangan:</strong> {{ currentQR.description }}</p>
            </div>
            
            <!-- Manual Code Display -->
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Kode Manual (untuk input manual):</p>
              <div class="bg-white dark:bg-gray-900 rounded-lg p-4 text-center">
                <p class="text-3xl font-bold text-primary-600 dark:text-primary-400 tracking-widest font-mono">
                  {{ currentQR.manualCode }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Mahasiswa bisa input kode ini jika scan QR tidak berfungsi
                </p>
              </div>
            </div>
          </div>

          <div class="flex space-x-4">
            <button @click="downloadQR" class="flex-1 btn-primary">
              <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download QR
            </button>
            <button @click="deactivateQR" class="flex-1 btn-danger">
              <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Nonaktifkan
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <svg class="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400">QR Code akan muncul di sini</p>
        </div>
      </div>
    </div>

    <!-- Active QR Codes List -->
    <div class="mt-8 glass rounded-xl p-8">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">QR Code Aktif</h2>
      
      <div v-if="activeQRCodes.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="qr in activeQRCodes" :key="qr.id" class="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 card-hover">
          <div class="flex items-start justify-between mb-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-100">{{ qr.subject }}</h3>
            <span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Aktif</span>
          </div>
          <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <p><strong>Tanggal:</strong> {{ formatDate(qr.date) }}</p>
            <p><strong>Waktu:</strong> {{ qr.startTime }} - {{ qr.endTime }}</p>
          </div>
          <button @click="viewQR(qr)" class="w-full btn-secondary text-sm py-2">
            Lihat QR Code
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>Belum ada QR Code aktif</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAttendanceStore } from '../../stores/attendance'
import QRCode from 'qrcode'

const attendanceStore = useAttendanceStore()

const formData = ref({
  subject: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '',
  endTime: '',
  description: ''
})

const currentQR = ref(null)
const qrCanvas = ref(null)

const activeQRCodes = computed(() => attendanceStore.getActiveQRCodes())

const generateQR = async () => {
  // Validate time range
  if (!formData.value.startTime || !formData.value.endTime) {
    alert('Waktu mulai dan selesai harus diisi!')
    return
  }
  
  const [startHour, startMinute] = formData.value.startTime.split(':').map(Number)
  const [endHour, endMinute] = formData.value.endTime.split(':').map(Number)
  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  
  if (endMinutes <= startMinutes) {
    alert('Waktu selesai harus lebih besar dari waktu mulai!\n\nContoh yang benar:\nMulai: 08:00\nSelesai: 10:00')
    return
  }
  
  const qrData = attendanceStore.createQRCode(formData.value)
  currentQR.value = qrData
  
  await nextTick()
  await drawQRCode(qrData)
  
  // Reset form
  formData.value = {
    subject: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    description: ''
  }
}

const drawQRCode = async (qrData) => {
  if (!qrCanvas.value) return
  
  const qrString = JSON.stringify({
    id: qrData.id,
    subject: qrData.subject,
    date: qrData.date
  })
  
  await QRCode.toCanvas(qrCanvas.value, qrString, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })
}

const viewQR = async (qr) => {
  currentQR.value = qr
  await nextTick()
  await drawQRCode(qr)
}

const downloadQR = () => {
  if (!qrCanvas.value) return
  
  const link = document.createElement('a')
  link.download = `QR-${currentQR.value.subject}-${currentQR.value.date}.png`
  link.href = qrCanvas.value.toDataURL()
  link.click()
}

const deactivateQR = () => {
  if (currentQR.value) {
    attendanceStore.deactivateQRCode(currentQR.value.id)
    currentQR.value = null
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>
