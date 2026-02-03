import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Load current user from localStorage (for session persistence)
  const loadFromStorage = () => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  loadFromStorage()

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStudent = computed(() => user.value?.role === 'student')

  // Fetch all users (for admin)
  async function fetchUsers() {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      users.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register new user
  async function register(userData) {
    try {
      loading.value = true
      error.value = null

      console.log('=== REGISTERING USER ===')
      console.log('User data:', userData)

      // Validate NIM (must be 8 digits)
      if (!/^\d{8}$/.test(userData.nim)) {
        throw new Error('NIM harus 8 digit angka')
      }

      // Check if NIM or email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('nim, email')
        .or(`nim.eq.${userData.nim},email.eq.${userData.email}`)

      if (checkError) throw checkError

      if (existingUsers && existingUsers.length > 0) {
        throw new Error('NIM atau Email sudah terdaftar')
      }

      // Insert new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          name: userData.name,
          nim: userData.nim,
          email: userData.email,
          password: userData.password,
          role: 'student',
          phone: userData.phone || null,
          address: userData.address || null
        }])
        .select()
        .single()

      if (insertError) throw insertError

      console.log('✅ User registered successfully:', newUser)
      console.log('=== END REGISTRATION ===')

      return newUser
    } catch (err) {
      console.error('=== REGISTRATION ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login
  async function login(identifier, password) {
    try {
      loading.value = true
      error.value = null

      console.log('=== LOGIN ATTEMPT ===')
      console.log('Identifier:', identifier)

      // Find user by username, NIM, or email
      const { data: foundUsers, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .or(`username.eq.${identifier},nim.eq.${identifier},email.eq.${identifier}`)
        .eq('password', password)

      if (fetchError) throw fetchError

      if (!foundUsers || foundUsers.length === 0) {
        throw new Error('Username/NIM/Email atau Password salah')
      }

      const foundUser = foundUsers[0]

      user.value = foundUser
      localStorage.setItem('currentUser', JSON.stringify(foundUser))

      console.log('✅ Login successful:', foundUser.name)
      console.log('=== END LOGIN ===')

      return foundUser
    } catch (err) {
      console.error('=== LOGIN ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  function logout() {
    user.value = null
    localStorage.removeItem('currentUser')
    console.log('✅ User logged out')
  }

  // Update profile
  async function updateProfile(updates) {
    try {
      loading.value = true
      error.value = null

      if (!user.value) {
        throw new Error('Tidak ada user yang login')
      }

      console.log('=== UPDATE PROFILE ===')
      console.log('Current user:', user.value)
      console.log('Updates:', updates)

      // Update in database
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.value.id)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local state
      user.value = updatedUser
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))

      console.log('✅ Profile updated successfully')
      console.log('=== END UPDATE PROFILE ===')

      return updatedUser
    } catch (err) {
      console.error('=== UPDATE PROFILE ERROR ===')
      console.error('Error:', err)
      console.error('=== END ERROR ===')
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update password
  async function updatePassword(oldPassword, newPassword) {
    try {
      if (!user.value) {
        throw new Error('Tidak ada user yang login')
      }

      if (user.value.password !== oldPassword) {
        throw new Error('Password lama salah')
      }

      await updateProfile({ password: newPassword })
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Delete student (admin only)
  async function deleteStudent(studentId) {
    try {
      loading.value = true
      error.value = null

      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', studentId)

      if (deleteError) throw deleteError

      // Update local users array
      users.value = users.value.filter(u => u.id !== studentId)

      console.log('✅ Student deleted successfully')
    } catch (err) {
      console.error('Error deleting student:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get students
  async function getStudents() {
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data || []
    } catch (err) {
      console.error('Error fetching students:', err)
      throw err
    }
  }

  return {
    user,
    users,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isStudent,
    fetchUsers,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    deleteStudent,
    getStudents,
  }
})
