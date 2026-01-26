import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAttendanceStore = defineStore('attendance', () => {
  const attendances = ref([])
  const qrCodes = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all QR codes
  async function fetchQRCodes() {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      qrCodes.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching QR codes:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch all attendances
  async function fetchAttendances() {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('attendances')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      attendances.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching attendances:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create QR Code
  async function createQRCode(qrData) {
    try {
      loading.value = true
      error.value = null

      console.log('=== CREATING QR CODE ===')
      console.log('QR Data:', qrData)

      // Generate 6-digit manual code
      const manualCode = Math.floor(100000 + Math.random() * 900000).toString()

      const { data: newQR, error: insertError } = await supabase
        .from('qr_codes')
        .insert([{
          subject: qrData.subject,
          date: qrData.date,
          start_time: qrData.startTime,
          end_time: qrData.endTime,
          description: qrData.description || null,
          manual_code: manualCode,
          is_active: true
        }])
        .select()
        .single()

      if (insertError) throw insertError

      // Add to local array
      qrCodes.value.unshift(newQR)

      console.log('✅ QR Code created with manual code:', manualCode)
      console.log('=== END QR CODE CREATION ===')

      return newQR
    } catch (err) {
      console.error('=== QR CODE CREATION ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Deactivate QR Code
  async function deactivateQRCode(qrId) {
    try {
      loading.value = true
      error.value = null

      const { error: updateError } = await supabase
        .from('qr_codes')
        .update({ is_active: false })
        .eq('id', qrId)

      if (updateError) throw updateError

      // Update local array
      const qrIndex = qrCodes.value.findIndex(q => q.id === qrId)
      if (qrIndex !== -1) {
        qrCodes.value[qrIndex].is_active = false
      }

      console.log('✅ QR Code deactivated')
    } catch (err) {
      console.error('Error deactivating QR code:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Record attendance
  async function recordAttendance(studentId, qrCodeId) {
    try {
      loading.value = true
      error.value = null

      console.log('=== ATTENDANCE VALIDATION ===')
      console.log('Student ID:', studentId)
      console.log('QR Code ID:', qrCodeId)

      // Fetch QR code from database
      const { data: qr, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('id', qrCodeId)
        .single()

      if (qrError) throw qrError

      console.log('QR Code:', qr)

      if (!qr || !qr.is_active) {
        throw new Error('QR Code tidak valid atau sudah tidak aktif')
      }

      // Validate date and time
      const now = new Date()
      console.log('Current time:', now.toISOString())
      console.log('Current local time:', now.toLocaleString('id-ID'))

      // Parse QR date
      const qrDate = new Date(qr.date)
      const nowDateStr = now.toISOString().split('T')[0]
      const qrDateStr = qr.date

      console.log('QR Date:', qrDateStr)
      console.log('Now Date:', nowDateStr)

      // Check if the date matches
      if (qrDateStr !== nowDateStr) {
        throw new Error(`QR Code hanya berlaku pada tanggal ${qrDate.toLocaleDateString('id-ID')}`)
      }

      console.log('✅ Date validation passed')

      // Check if current time is within the valid time range
      const currentTime = now.getHours() * 60 + now.getMinutes()
      const [startHour, startMinute] = qr.start_time.split(':').map(Number)
      const [endHour, endMinute] = qr.end_time.split(':').map(Number)
      const startTimeMinutes = startHour * 60 + startMinute
      const endTimeMinutes = endHour * 60 + endMinute

      console.log('Current time (minutes):', currentTime, `(${now.getHours()}:${now.getMinutes()})`)
      console.log('Start time (minutes):', startTimeMinutes, `(${qr.start_time})`)
      console.log('End time (minutes):', endTimeMinutes, `(${qr.end_time})`)

      if (currentTime < startTimeMinutes || currentTime > endTimeMinutes) {
        throw new Error(`QR Code hanya berlaku pada pukul ${qr.start_time} - ${qr.end_time}`)
      }

      console.log('✅ Time validation passed')

      // Check if already attended (database will handle this with UNIQUE constraint)
      const { data: existingAttendance } = await supabase
        .from('attendances')
        .select('id')
        .eq('student_id', studentId)
        .eq('qr_code_id', qrCodeId)
        .single()

      if (existingAttendance) {
        throw new Error('Anda sudah melakukan absensi untuk sesi ini')
      }

      console.log('✅ Duplicate check passed')

      // Insert attendance
      const { data: attendance, error: insertError } = await supabase
        .from('attendances')
        .insert([{
          student_id: studentId,
          qr_code_id: qrCodeId,
          subject: qr.subject,
          date: qr.date,
          status: 'present'
        }])
        .select()
        .single()

      if (insertError) {
        // Check if it's a duplicate error
        if (insertError.code === '23505') {
          throw new Error('Anda sudah melakukan absensi untuk sesi ini')
        }
        throw insertError
      }

      // Add to local array
      attendances.value.unshift(attendance)

      console.log('✅ Attendance recorded:', attendance)
      console.log('=== END VALIDATION ===')

      return attendance
    } catch (err) {
      console.error('=== ATTENDANCE ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Record attendance by manual code
  async function recordAttendanceByCode(studentId, manualCode) {
    try {
      console.log('=== ATTENDANCE BY MANUAL CODE ===')
      console.log('Manual Code:', manualCode)
      console.log('Student ID:', studentId)

      // Find QR by manual code
      const { data: qr, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('manual_code', manualCode)
        .eq('is_active', true)
        .single()

      if (qrError || !qr) {
        console.error('QR Code not found with manual code:', manualCode)
        throw new Error('Kode tidak valid atau QR Code sudah tidak aktif')
      }

      console.log('QR Code found:', qr)

      // Use the same validation as recordAttendance
      return await recordAttendance(studentId, qr.id)
    } catch (err) {
      console.error('=== MANUAL CODE ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      throw err
    }
  }

  // Get attendances by student
  async function getAttendancesByStudent(studentId) {
    try {
      const { data, error: fetchError } = await supabase
        .from('attendances')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data || []
    } catch (err) {
      console.error('Error fetching student attendances:', err)
      return []
    }
  }

  // Get attendances by QR code
  async function getAttendancesByQR(qrCodeId) {
    try {
      const { data, error: fetchError } = await supabase
        .from('attendances')
        .select('*')
        .eq('qr_code_id', qrCodeId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data || []
    } catch (err) {
      console.error('Error fetching QR attendances:', err)
      return []
    }
  }

  // Get all attendances
  function getAllAttendances() {
    return attendances.value
  }

  // Get active QR codes
  function getActiveQRCodes() {
    return qrCodes.value.filter(q => q.is_active)
  }

  return {
    attendances,
    qrCodes,
    loading,
    error,
    fetchQRCodes,
    fetchAttendances,
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
