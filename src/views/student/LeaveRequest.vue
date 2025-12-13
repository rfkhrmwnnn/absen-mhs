<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Pengajuan Izin</h1>
      <p class="text-gray-600 dark:text-gray-400">Ajukan izin ketidakhadiran Anda</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Form Pengajuan -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Form Pengajuan Izin</h2>
        
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

        <form @submit.prevent="submitLeaveRequest" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tanggal Izin
            </label>
            <input
              v-model="formData.leaveDate"
              type="date"
              required
              :min="today"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Jenis Izin
            </label>
            <select v-model="formData.leaveType" required class="input-field">
              <option value="">Pilih jenis izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
              <option value="Keluarga">Urusan Keluarga</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Alasan
            </label>
            <textarea
              v-model="formData.reason"
              rows="5"
              required
              placeholder="Jelaskan alasan izin Anda..."
              class="input-field"
            ></textarea>
          </div>

          <button type="submit" class="w-full btn-primary">
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Ajukan Izin
          </button>
        </form>
      </div>

      <!-- Riwayat Pengajuan -->
      <div class="glass rounded-xl p-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Riwayat Pengajuan</h2>
        
        <div v-if="myLeaves.length > 0" class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <div v-for="leave in myLeaves" :key="leave.id" class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-bold text-gray-800 dark:text-gray-100">{{ leave.leaveType }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(leave.leaveDate) }}</p>
              </div>
              <span
                :class="{
                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400': leave.status === 'pending',
                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400': leave.status === 'approved',
                  'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400': leave.status === 'rejected'
                }"
                class="px-3 py-1 text-xs font-semibold rounded-full"
              >
                {{ getStatusText(leave.status) }}
              </span>
            </div>
            
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">{{ leave.reason }}</p>
            
            <div v-if="leave.adminNote" class="bg-white dark:bg-gray-900/30 rounded-lg p-3 mb-3">
              <p class="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">Catatan Admin:</p>
              <p class="text-sm text-gray-700 dark:text-gray-300">{{ leave.adminNote }}</p>
            </div>
            
            <p class="text-xs text-gray-500 dark:text-gray-500">
              Diajukan: {{ formatDateTime(leave.submittedAt) }}
            </p>
            <p v-if="leave.processedAt" class="text-xs text-gray-500 dark:text-gray-500">
              Diproses: {{ formatDateTime(leave.processedAt) }}
            </p>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Belum ada pengajuan izin</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-3 gap-6 mt-8">
      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Total Pengajuan</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ myLeaves.length }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Disetujui</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ approvedCount }}</p>
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
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Menunggu</p>
            <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ pendingCount }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useLeaveStore } from '../../stores/leave'

const authStore = useAuthStore()
const leaveStore = useLeaveStore()

const formData = ref({
  leaveDate: '',
  leaveType: '',
  reason: ''
})

const successMessage = ref('')
const errorMessage = ref('')

const today = new Date().toISOString().split('T')[0]

const myLeaves = computed(() => 
  leaveStore.getLeavesByStudent(authStore.user?.id)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
)

const approvedCount = computed(() => 
  myLeaves.value.filter(l => l.status === 'approved').length
)

const pendingCount = computed(() => 
  myLeaves.value.filter(l => l.status === 'pending').length
)

const submitLeaveRequest = () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    leaveStore.submitLeaveRequest({
      studentId: authStore.user.id,
      ...formData.value
    })

    successMessage.value = 'Pengajuan izin berhasil dikirim!'
    
    // Reset form
    formData.value = {
      leaveDate: '',
      leaveType: '',
      reason: ''
    }

    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (err) {
    errorMessage.value = err.message
  }
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
