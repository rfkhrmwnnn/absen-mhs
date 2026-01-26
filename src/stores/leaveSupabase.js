import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useLeaveStore = defineStore('leave', () => {
  const leaveRequests = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all leave requests
  async function fetchLeaveRequests() {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('leave_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      leaveRequests.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching leave requests:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Submit leave request
  async function submitLeaveRequest(leaveData) {
    try {
      loading.value = true
      error.value = null

      console.log('=== SUBMITTING LEAVE REQUEST ===')
      console.log('Leave data:', leaveData)

      const { data: newLeave, error: insertError } = await supabase
        .from('leave_requests')
        .insert([{
          student_id: leaveData.studentId,
          start_date: leaveData.startDate,
          end_date: leaveData.endDate,
          reason: leaveData.reason,
          status: 'pending'
        }])
        .select()
        .single()

      if (insertError) throw insertError

      // Add to local array
      leaveRequests.value.unshift(newLeave)

      console.log('✅ Leave request submitted successfully')
      console.log('=== END LEAVE REQUEST ===')

      return newLeave
    } catch (err) {
      console.error('=== LEAVE REQUEST ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update leave status (admin only)
  async function updateLeaveStatus(leaveId, status, adminNote = '') {
    try {
      loading.value = true
      error.value = null

      console.log('=== UPDATING LEAVE STATUS ===')
      console.log('Leave ID:', leaveId)
      console.log('New status:', status)
      console.log('Admin note:', adminNote)

      const { data: updatedLeave, error: updateError } = await supabase
        .from('leave_requests')
        .update({
          status: status,
          admin_note: adminNote
        })
        .eq('id', leaveId)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local array
      const leaveIndex = leaveRequests.value.findIndex(l => l.id === leaveId)
      if (leaveIndex !== -1) {
        leaveRequests.value[leaveIndex] = updatedLeave
      }

      console.log('✅ Leave status updated successfully')
      console.log('=== END UPDATE ===')

      return updatedLeave
    } catch (err) {
      console.error('=== UPDATE ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get leaves by student
  async function getLeavesByStudent(studentId) {
    try {
      const { data, error: fetchError } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data || []
    } catch (err) {
      console.error('Error fetching student leaves:', err)
      return []
    }
  }

  // Get pending leaves
  async function getPendingLeaves() {
    try {
      const { data, error: fetchError } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data || []
    } catch (err) {
      console.error('Error fetching pending leaves:', err)
      return []
    }
  }

  // Get all leaves
  function getAllLeaves() {
    return leaveRequests.value
  }

  return {
    leaveRequests,
    loading,
    error,
    fetchLeaveRequests,
    submitLeaveRequest,
    updateLeaveStatus,
    getLeavesByStudent,
    getPendingLeaves,
    getAllLeaves,
  }
})
