import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const users = ref([])

  // Load from localStorage
  const loadFromStorage = () => {
    const savedUser = localStorage.getItem('currentUser')
    const savedUsers = localStorage.getItem('users')
    
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
    
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    } else {
      // Create default admin
      users.value = [{
        id: 1,
        name: 'Administrator',
        username: 'admin',
        nim: 'ADMIN001',
        email: 'admin@gmail.com',
        password: 'parta2025',
        role: 'admin',
        createdAt: new Date().toISOString()
      }]
      localStorage.setItem('users', JSON.stringify(users.value))
    }
  }

  loadFromStorage()

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStudent = computed(() => user.value?.role === 'student')

  function register(userData) {
    try {
      // Validate NIM (must be 8 digits)
      if (!/^\d{8}$/.test(userData.nim)) {
        throw new Error('NIM harus 8 digit angka')
      }

      // Check if NIM or email already exists
      const existingUser = users.value.find(
        u => u.nim === userData.nim || u.email === userData.email
      )

      if (existingUser) {
        throw new Error('NIM atau Email sudah terdaftar')
      }

      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'student',
        createdAt: new Date().toISOString()
      }

      users.value.push(newUser)
      
      // Save to localStorage with error handling
      try {
        localStorage.setItem('users', JSON.stringify(users.value))
        
        // Verify the data was saved
        const saved = localStorage.getItem('users')
        if (!saved) {
          throw new Error('Data tidak tersimpan ke localStorage')
        }
        
        console.log('User registered successfully:', newUser)
      } catch (storageErr) {
        console.error('localStorage error:', storageErr)
        // Remove the user from array if save failed
        users.value = users.value.filter(u => u.id !== newUser.id)
        throw new Error('Gagal menyimpan data registrasi. Pastikan browser Anda mengizinkan penyimpanan data.')
      }
      
      return newUser
    } catch (err) {
      console.error('Error during registration:', err)
      throw err
    }
  }

  function login(identifier, password) {
    // identifier can be username (for admin), NIM, or email
    const foundUser = users.value.find(
      u => (u.username === identifier || u.nim === identifier || u.email === identifier) && u.password === password
    )

    if (!foundUser) {
      throw new Error('Username/NIM/Email atau Password salah')
    }

    user.value = foundUser
    localStorage.setItem('currentUser', JSON.stringify(foundUser))
    
    return foundUser
  }

  function logout() {
    user.value = null
    localStorage.removeItem('currentUser')
  }

  function updateProfile(updates) {
    if (!user.value) {
      console.error('No user logged in')
      throw new Error('Tidak ada user yang login')
    }

    console.log('=== UPDATE PROFILE ===')
    console.log('Current user:', user.value)
    console.log('Updates:', updates)

    const userIndex = users.value.findIndex(u => u.id === user.value.id)
    
    if (userIndex === -1) {
      console.error('User not found in users array')
      throw new Error('User tidak ditemukan')
    }

    // Merge existing data with updates (preserves all existing fields)
    const updatedUser = { 
      ...users.value[userIndex], // Keep all existing data
      ...updates // Apply updates
    }
    
    console.log('Updated user:', updatedUser)
    
    // Update in array
    users.value[userIndex] = updatedUser
    
    // Update current user
    user.value = updatedUser
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem('users', JSON.stringify(users.value))
      localStorage.setItem('currentUser', JSON.stringify(user.value))
      
      // Verify save
      const savedUsers = localStorage.getItem('users')
      const savedCurrentUser = localStorage.getItem('currentUser')
      
      if (!savedUsers || !savedCurrentUser) {
        throw new Error('Failed to save to localStorage')
      }
      
      console.log('✅ Profile updated successfully')
      console.log('=== END UPDATE PROFILE ===')
    } catch (err) {
      console.error('localStorage error:', err)
      throw new Error('Gagal menyimpan perubahan profile')
    }
  }

  function updatePassword(oldPassword, newPassword) {
    if (!user.value) return

    if (user.value.password !== oldPassword) {
      throw new Error('Password lama salah')
    }

    updateProfile({ password: newPassword })
  }

  function deleteStudent(studentId) {
    users.value = users.value.filter(u => u.id !== studentId)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  function getStudents() {
    return users.value.filter(u => u.role === 'student')
  }

  return {
    user,
    users,
    isAuthenticated,
    isAdmin,
    isStudent,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    deleteStudent,
    getStudents,
  }
})
