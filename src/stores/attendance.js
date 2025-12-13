import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttendanceStore = defineStore('attendance', () => {
  const attendances = ref([])
  const qrCodes = ref([])

  // Load from localStorage
  const loadFromStorage = () => {
    const savedAttendances = localStorage.getItem('attendances')
    const savedQRCodes = localStorage.getItem('qrCodes')
    
    if (savedAttendances) {
      attendances.value = JSON.parse(savedAttendances)
    }
    
    if (savedQRCodes) {
      qrCodes.value = JSON.parse(savedQRCodes)
    }
  }

  loadFromStorage()

  function createQRCode(qrData) {
    const newQR = {
      id: Date.now(),
      ...qrData,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    qrCodes.value.push(newQR)
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value))
    
    return newQR
  }

  function deactivateQRCode(qrId) {
    const qrIndex = qrCodes.value.findIndex(q => q.id === qrId)
    if (qrIndex !== -1) {
      qrCodes.value[qrIndex].isActive = false
      localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value))
    }
  }

  function recordAttendance(studentId, qrCodeId) {
    const qr = qrCodes.value.find(q => q.id === qrCodeId)
    
    if (!qr || !qr.isActive) {
      throw new Error('QR Code tidak valid atau sudah tidak aktif')
    }

    // Validate date and time
    const now = new Date()
    const qrDate = new Date(qr.date)
    
    // Check if the date matches (ignore time for date comparison)
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const qrDateOnly = new Date(qrDate.getFullYear(), qrDate.getMonth(), qrDate.getDate())
    
    if (nowDate.getTime() !== qrDateOnly.getTime()) {
      throw new Error('QR Code hanya berlaku pada tanggal ' + qrDate.toLocaleDateString('id-ID'))
    }
    
    // Check if current time is within the valid time range
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [startHour, startMinute] = qr.startTime.split(':').map(Number)
    const [endHour, endMinute] = qr.endTime.split(':').map(Number)
    const startTimeMinutes = startHour * 60 + startMinute
    const endTimeMinutes = endHour * 60 + endMinute
    
    if (currentTime < startTimeMinutes || currentTime > endTimeMinutes) {
      throw new Error(`QR Code hanya berlaku pada pukul ${qr.startTime} - ${qr.endTime}`)
    }

    // Check if already attended
    const existingAttendance = attendances.value.find(
      a => a.studentId === studentId && a.qrCodeId === qrCodeId
    )

    if (existingAttendance) {
      throw new Error('Anda sudah melakukan absensi untuk sesi ini')
    }

    const attendance = {
      id: Date.now(),
      studentId,
      qrCodeId,
      subject: qr.subject,
      date: qr.date,
      timestamp: new Date().toISOString(),
      status: 'present'
    }

    attendances.value.push(attendance)
    localStorage.setItem('attendances', JSON.stringify(attendances.value))
    
    return attendance
  }

  function getAttendancesByStudent(studentId) {
    return attendances.value.filter(a => a.studentId === studentId)
  }

  function getAttendancesByQR(qrCodeId) {
    return attendances.value.filter(a => a.qrCodeId === qrCodeId)
  }

  function getAllAttendances() {
    return attendances.value
  }

  function getActiveQRCodes() {
    return qrCodes.value.filter(q => q.isActive)
  }

  return {
    attendances,
    qrCodes,
    createQRCode,
    deactivateQRCode,
    recordAttendance,
    getAttendancesByStudent,
    getAttendancesByQR,
    getAllAttendances,
    getActiveQRCodes,
  }
})
