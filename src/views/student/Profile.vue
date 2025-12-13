<template>
  <div class="animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Profile Saya</h1>
      <p class="text-gray-600 dark:text-gray-400">Kelola informasi profile dan password Anda</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Profile Card -->
      <div class="glass rounded-xl p-8 text-center">
        <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-4xl">{{ authStore.user?.name?.charAt(0) }}</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{{ authStore.user?.name }}</h2>
        <p class="text-gray-600 dark:text-gray-400 font-mono mb-2">{{ authStore.user?.nim }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mb-4">{{ authStore.user?.email }}</p>
        
        <!-- Bio -->
        <div v-if="authStore.user?.bio" class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 mb-4">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Bio</p>
          <p class="text-sm text-gray-700 dark:text-gray-300 italic">{{ authStore.user?.bio }}</p>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Bergabung sejak</p>
          <p class="font-semibold text-gray-800 dark:text-gray-100">{{ formatDate(authStore.user?.createdAt) }}</p>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Update Profile -->
        <div class="glass rounded-xl p-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Edit Profile</h2>
          
          <!-- Success Message -->
          <div v-if="profileSuccess" class="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ profileSuccess }}
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="profileError" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              {{ profileError }}
            </div>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nama Lengkap
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                required
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                required
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Bio (Opsional)
              </label>
              <textarea
                v-model="profileForm.bio"
                rows="3"
                maxlength="200"
                placeholder="Ceritakan sedikit tentang diri Anda... (max 200 karakter)"
                class="input-field resize-none"
              ></textarea>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ profileForm.bio?.length || 0 }}/200 karakter
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                NIM (Tidak dapat diubah)
              </label>
              <input
                :value="authStore.user?.nim"
                type="text"
                disabled
                class="input-field opacity-60 cursor-not-allowed"
              />
            </div>

            <button type="submit" class="w-full btn-primary">
              Simpan Perubahan
            </button>
          </form>
        </div>

        <!-- Change Password -->
        <div class="glass rounded-xl p-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Ubah Password</h2>
          
          <!-- Success Message -->
          <div v-if="passwordSuccess" class="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ passwordSuccess }}
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="passwordError" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              {{ passwordError }}
            </div>
          </div>

          <form @submit.prevent="changePassword" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password Lama
              </label>
              <input
                v-model="passwordForm.oldPassword"
                type="password"
                required
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password Baru
              </label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                required
                minlength="6"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Konfirmasi Password Baru
              </label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                class="input-field"
              />
            </div>

            <button type="submit" class="w-full btn-primary">
              Ubah Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const profileForm = ref({
  name: '',
  email: '',
  bio: ''
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const profileSuccess = ref('')
const profileError = ref('')
const passwordSuccess = ref('')
const passwordError = ref('')

onMounted(() => {
  profileForm.value.name = authStore.user?.name || ''
  profileForm.value.email = authStore.user?.email || ''
  profileForm.value.bio = authStore.user?.bio || ''
})

const updateProfile = () => {
  profileError.value = ''
  profileSuccess.value = ''

  try {
    authStore.updateProfile({
      name: profileForm.value.name,
      email: profileForm.value.email,
      bio: profileForm.value.bio
    })

    profileSuccess.value = 'Profile berhasil diperbarui!'
    
    setTimeout(() => {
      profileSuccess.value = ''
    }, 3000)
  } catch (err) {
    profileError.value = err.message
  }
}

const changePassword = () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Password baru tidak cocok'
    return
  }

  try {
    authStore.updatePassword(passwordForm.value.oldPassword, passwordForm.value.newPassword)

    passwordSuccess.value = 'Password berhasil diubah!'
    
    // Reset form
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    setTimeout(() => {
      passwordSuccess.value = ''
    }, 3000)
  } catch (err) {
    passwordError.value = err.message
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>
