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
    // Generate 6-digit manual code
    const manualCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    const newQR = {
      id: Date.now(),
      ...qrData,
      manualCode, // Add manual code
      createdAt: new Date().toISOString(),
      isActive: true
    }

    qrCodes.value.push(newQR)
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value))
    
    console.log('QR Code created with manual code:', manualCode)
    
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
    
    console.log('=== ATTENDANCE VALIDATION ===')
    console.log('QR Code:', qr)
    console.log('Student ID:', studentId)
    
    if (!qr || !qr.isActive) {
      console.error('QR Code not found or inactive')
      throw new Error('QR Code tidak valid atau sudah tidak aktif')
    }

    // Validate date and time
    const now = new Date()
    console.log('Current time:', now.toISOString())
    console.log('Current local time:', now.toLocaleString('id-ID'))
    console.log('Current date string:', now.toDateString())
    
    // Parse QR date (format: YYYY-MM-DD)
    const [qrYear, qrMonth, qrDay] = qr.date.split('-').map(Number)
    const qrDateOnly = new Date(qrYear, qrMonth - 1, qrDay) // month is 0-indexed
    
    // Get today's date (without time)
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    console.log('QR Date (input):', qr.date)
    console.log('QR Date (parsed):', qrDateOnly.toLocaleDateString('id-ID'))
    console.log('QR Date (ISO):', qrDateOnly.toISOString())
    console.log('Today Date:', nowDateOnly.toLocaleDateString('id-ID'))
    console.log('Today Date (ISO):', nowDateOnly.toISOString())
    console.log('QR timestamp:', qrDateOnly.getTime())
    console.log('Today timestamp:', nowDateOnly.getTime())
    console.log('Difference (ms):', Math.abs(qrDateOnly.getTime() - nowDateOnly.getTime()))
    
    // More flexible date comparison (allow same day even with timezone differences)
    const qrDateStr = `${qrYear}-${String(qrMonth).padStart(2, '0')}-${String(qrDay).padStart(2, '0')}`
    const nowDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    
    console.log('QR Date String:', qrDateStr)
    console.log('Now Date String:', nowDateStr)
    
    // Check if the date matches (using string comparison to avoid timezone issues)
    if (qrDateStr !== nowDateStr) {
      console.error('Date mismatch!')
      console.error('Expected:', qrDateStr)
      console.error('Got:', nowDateStr)
      
      // Calculate difference in days
      const diffTime = Math.abs(qrDateOnly.getTime() - nowDateOnly.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      console.error('Difference:', diffDays, 'days')
      
      throw new Error(`QR Code hanya berlaku pada tanggal ${qrDateOnly.toLocaleDateString('id-ID')}`)
    }
    
    console.log('✅ Date validation passed')
    
    // Check if current time is within the valid time range
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [startHour, startMinute] = qr.startTime.split(':').map(Number)
    const [endHour, endMinute] = qr.endTime.split(':').map(Number)
    const startTimeMinutes = startHour * 60 + startMinute
    const endTimeMinutes = endHour * 60 + endMinute
    
    console.log('Current time (minutes):', currentTime, `(${now.getHours()}:${now.getMinutes()})`)
    console.log('Start time (minutes):', startTimeMinutes, `(${qr.startTime})`)
    console.log('End time (minutes):', endTimeMinutes, `(${qr.endTime})`)
    
    if (currentTime < startTimeMinutes || currentTime > endTimeMinutes) {
      console.error('Time out of range!')
      console.error('Current:', currentTime, 'Range:', startTimeMinutes, '-', endTimeMinutes)
      throw new Error(`QR Code hanya berlaku pada pukul ${qr.startTime} - ${qr.endTime}`)
    }
    
    console.log('✅ Time validation passed')

    // Check if already attended
    const existingAttendance = attendances.value.find(
      a => a.studentId === studentId && a.qrCodeId === qrCodeId
    )

    if (existingAttendance) {
      console.error('Already attended!')
      throw new Error('Anda sudah melakukan absensi untuk sesi ini')
    }
    
    console.log('✅ Duplicate check passed')

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
    
    console.log('✅ Attendance recorded:', attendance)
    console.log('=== END VALIDATION ===')
    
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
  
  function recordAttendanceByCode(studentId, manualCode) {
    console.log('=== ATTENDANCE BY MANUAL CODE ===')
    console.log('Manual Code:', manualCode)
    console.log('Student ID:', studentId)
    
    // Find QR by manual code
    const qr = qrCodes.value.find(q => q.manualCode === manualCode && q.isActive)
    
    if (!qr) {
      console.error('QR Code not found with manual code:', manualCode)
      throw new Error('Kode tidak valid atau QR Code sudah tidak aktif')
    }
    
    console.log('QR Code found:', qr)
    
    // Use the same validation as recordAttendance
    return recordAttendance(studentId, qr.id)
  }

  return {
    attendances,
    qrCodes,
    createQRCode,
    deactivateQRCode,
    recordAttendance,
    recordAttendanceByCode,
    getAttendancesByStudent,
    getAttendancesByQR,
    getAllAttendances,
    getActiveQRCodes,
  }
})
