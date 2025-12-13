<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Rekap Absensi</h1>
      <p class="text-gray-600 dark:text-gray-400">Lihat dan export data absensi mahasiswa</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Total Absensi</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ allAttendances.length }}</p>
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
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Hari Ini</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ todayAttendances }}</p>
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
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Minggu Ini</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ weekAttendances }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="glass rounded-xl p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Bulan Ini</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ monthAttendances }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Export -->
    <div class="glass rounded-xl p-6 mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari mahasiswa..."
            class="input-field"
          />
        </div>
        
        <div>
          <input
            v-model="filterDate"
            type="date"
            class="input-field"
          />
        </div>

        <button @click="exportToExcel" class="btn-primary">
          <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export ke Excel
        </button>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="glass rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">No</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nama</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">NIM</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Mata Kuliah</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Waktu Absen</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(attendance, index) in filteredAttendances" :key="attendance.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                {{ getStudentName(attendance.studentId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-mono">
                {{ getStudentNIM(attendance.studentId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ attendance.subject }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ formatDate(attendance.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ formatTime(attendance.timestamp) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-semibold rounded-full">
                  Hadir
                </span>
              </td>
            </tr>
            <tr v-if="filteredAttendances.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-lg font-semibold">Tidak ada data absensi</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAttendanceStore } from '../../stores/attendance'
import { useAuthStore } from '../../stores/auth'
import * as XLSX from 'xlsx'

const attendanceStore = useAttendanceStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const filterDate = ref('')

const allAttendances = computed(() => attendanceStore.getAllAttendances())

const filteredAttendances = computed(() => {
  let filtered = allAttendances.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => {
      const student = authStore.users.find(u => u.id === a.studentId)
      return student && (
        student.name.toLowerCase().includes(query) ||
        student.nim.includes(query)
      )
    })
  }

  if (filterDate.value) {
    filtered = filtered.filter(a => a.date === filterDate.value)
  }

  return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

const todayAttendances = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return allAttendances.value.filter(a => a.date === today).length
})

const weekAttendances = computed(() => {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return allAttendances.value.filter(a => new Date(a.timestamp) >= weekAgo).length
})

const monthAttendances = computed(() => {
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  return allAttendances.value.filter(a => {
    const date = new Date(a.timestamp)
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear
  }).length
})

const getStudentName = (studentId) => {
  const student = authStore.users.find(u => u.id === studentId)
  return student ? student.name : 'Unknown'
}

const getStudentNIM = (studentId) => {
  const student = authStore.users.find(u => u.id === studentId)
  return student ? student.nim : '-'
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

const exportToExcel = () => {
  const data = filteredAttendances.value.map((a, index) => ({
    'No': index + 1,
    'Nama': getStudentName(a.studentId),
    'NIM': getStudentNIM(a.studentId),
    'Mata Kuliah': a.subject,
    'Tanggal': formatDate(a.date),
    'Waktu Absen': formatTime(a.timestamp),
    'Status': 'Hadir'
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Absensi')

  const fileName = `Rekap-Absensi-${new Date().toISOString().split('T')[0]}.xlsx`
  XLSX.writeFile(wb, fileName)
}
</script>
