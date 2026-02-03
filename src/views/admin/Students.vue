<template>
  <div class="animate-fade-in">
    <div class="mb-6 sm:mb-8">
      <h1
        class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2"
      >
        Data Mahasiswa
      </h1>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Kelola data mahasiswa yang terdaftar
      </p>
    </div>

    <!-- Stats Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
    >
      <div class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold mb-1"
            >
              Total Mahasiswa
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
            >
              {{ students.length }}
            </p>
          </div>
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold mb-1"
            >
              Terdaftar Hari Ini
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
            >
              {{ todayRegistrations }}
            </p>
          </div>
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover sm:col-span-2 lg:col-span-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold mb-1"
            >
              Aktif Bulan Ini
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
            >
              {{ monthlyActive }}
            </p>
          </div>
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex items-center space-x-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan nama, NIM, atau email..."
            class="input-field pl-10 sm:pl-12 text-sm sm:text-base"
          />
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="lg:hidden space-y-4 mb-4">
      <div
        v-for="(student, index) in filteredStudents"
        :key="student.id"
        class="glass rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-white font-bold text-lg">{{
                student.name.charAt(0)
              }}</span>
            </div>
            <div>
              <p class="font-bold text-gray-900 dark:text-gray-100">
                {{ student.name }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {{ student.nim }}
              </p>
            </div>
          </div>
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400"
            >#{{ index + 1 }}</span
          >
        </div>
        <div class="space-y-2 mb-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-semibold">Email:</span> {{ student.email }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-semibold">Terdaftar:</span>
            {{ formatDate(student.createdAt) }}
          </p>
        </div>
        <button
          @click="confirmDelete(student)"
          class="w-full py-2 px-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          Hapus
        </button>
      </div>
      <div
        v-if="filteredStudents.length === 0"
        class="glass rounded-lg p-8 text-center"
      >
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Tidak ada data mahasiswa
        </p>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden lg:block glass rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                No
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                NIM
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Tanggal Daftar
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="(student, index) in filteredStudents"
              :key="student.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
              >
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center mr-3"
                  >
                    <span class="text-white font-semibold">{{
                      student.name.charAt(0)
                    }}</span>
                  </div>
                  <span
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >{{ student.name }}</span
                  >
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-mono"
              >
                {{ student.nim }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400"
              >
                {{ student.email }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400"
              >
                {{ formatDate(student.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  @click="confirmDelete(student)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0">
              <td
                colspan="6"
                class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
              >
                <svg
                  class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p class="text-lg font-semibold">Tidak ada data mahasiswa</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="modal-backdrop"
      @click="showDeleteModal = false"
    >
      <div
        @click.stop
        class="glass rounded-2xl p-8 max-w-md mx-auto mt-32 animate-slide-up"
      >
        <div class="text-center mb-6">
          <div
            class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Konfirmasi Hapus
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Apakah Anda yakin ingin menghapus mahasiswa
            <strong>{{ studentToDelete?.name }}</strong
            >?
          </p>
        </div>
        <div class="flex space-x-4">
          <button @click="showDeleteModal = false" class="flex-1 btn-secondary">
            Batal
          </button>
          <button @click="deleteStudent" class="flex-1 btn-danger">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const searchQuery = ref("");
const showDeleteModal = ref(false);
const studentToDelete = ref(null);

const students = computed(() => authStore.getStudents());

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;

  const query = searchQuery.value.toLowerCase();
  return students.value.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.nim.includes(query) ||
      student.email.toLowerCase().includes(query),
  );
});

const todayRegistrations = computed(() => {
  const today = new Date().toDateString();
  return students.value.filter(
    (s) => new Date(s.createdAt).toDateString() === today,
  ).length;
});

const monthlyActive = computed(() => {
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  return students.value.filter((s) => {
    const date = new Date(s.createdAt);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  }).length;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const confirmDelete = (student) => {
  studentToDelete.value = student;
  showDeleteModal.value = true;
};

const deleteStudent = () => {
  if (studentToDelete.value) {
    authStore.deleteStudent(studentToDelete.value.id);
    showDeleteModal.value = false;
    studentToDelete.value = null;
  }
};
</script>
