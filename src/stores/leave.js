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
    const newLeave = {
      id: Date.now(),
      ...leaveData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }

    leaveRequests.value.push(newLeave)
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value))
    
    return newLeave
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
