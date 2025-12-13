import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaveStore = defineStore('leave', () => {
  const leaveRequests = ref([])

  // Load from localStorage
  const loadFromStorage = () => {
    const savedLeaves = localStorage.getItem('leaveRequests')
    
    if (savedLeaves) {
      leaveRequests.value = JSON.parse(savedLeaves)
    }
  }

  loadFromStorage()

  function submitLeaveRequest(leaveData) {
    try {
      const newLeave = {
        id: Date.now(),
        ...leaveData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      }

      leaveRequests.value.push(newLeave)
      
      // Save to localStorage with error handling
      try {
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value))
        
        // Verify the data was saved
        const saved = localStorage.getItem('leaveRequests')
        if (!saved) {
          throw new Error('Data tidak tersimpan ke localStorage')
        }
        
        console.log('Leave request saved successfully:', newLeave)
      } catch (storageErr) {
        console.error('localStorage error:', storageErr)
        throw new Error('Gagal menyimpan data. Pastikan browser Anda mengizinkan penyimpanan data.')
      }
      
      return newLeave
    } catch (err) {
      console.error('Error submitting leave request:', err)
      throw err
    }
  }

  function updateLeaveStatus(leaveId, status, adminNote = '') {
    const leaveIndex = leaveRequests.value.findIndex(l => l.id === leaveId)
    
    if (leaveIndex !== -1) {
      leaveRequests.value[leaveIndex].status = status
      leaveRequests.value[leaveIndex].adminNote = adminNote
      leaveRequests.value[leaveIndex].processedAt = new Date().toISOString()
      
      localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value))
    }
  }

  function getLeavesByStudent(studentId) {
    return leaveRequests.value.filter(l => l.studentId === studentId)
  }

  function getPendingLeaves() {
    return leaveRequests.value.filter(l => l.status === 'pending')
  }

  function getAllLeaves() {
    return leaveRequests.value
  }

  return {
    leaveRequests,
    submitLeaveRequest,
    updateLeaveStatus,
    getLeavesByStudent,
    getPendingLeaves,
    getAllLeaves,
  }
})
