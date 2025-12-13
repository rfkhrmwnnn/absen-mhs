<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md">
      <!-- Back Button -->
      <router-link to="/" class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </router-link>

      <!-- Login Card -->
      <div class="glass rounded-2xl p-8 shadow-2xl animate-slide-up">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold gradient-text mb-2">Selamat Datang</h2>
          <p class="text-gray-600 dark:text-gray-400">Login untuk melanjutkan</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {{ error }}
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Username/NIM/Email
            </label>
            <input
              v-model="formData.identifier"
              type="text"
              required
              placeholder="Masukkan Username, NIM, atau Email"
              class="input-field"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Masukkan password"
                class="input-field pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="rememberMe"
              v-model="rememberMe"
              type="checkbox"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="rememberMe" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Tetap masuk (Remember Me)
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary flex items-center justify-center"
          >
            <span v-if="!loading">Login</span>
            <span v-else class="flex items-center">
              <div class="spinner mr-2"></div>
              Memproses...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Belum punya akun?
            <router-link to="/register" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Daftar di sini
            </router-link>
          </p>
        </div>

        <!-- Admin Info -->
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  identifier: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const rememberMe = ref(true) // Default true - tetap masuk

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const user = await authStore.login(formData.value.identifier, formData.value.password)
    
    // Save remember me preference
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    } else {
      localStorage.setItem('rememberMe', 'false')
      // Note: Session tetap tersimpan, tapi bisa di-clear saat close browser
      // Untuk implementasi penuh, perlu sessionStorage vs localStorage
    }
    
    // Redirect based on role
    if (user.role === 'admin') {
      router.push('/admin/students')
    } else {
      router.push('/student/scan')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
