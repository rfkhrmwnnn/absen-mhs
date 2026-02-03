<template>
  <div class="animate-fade-in">
    <div class="mb-6 sm:mb-8">
      <h1
        class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2"
      >
        Pengajuan Izin
      </h1>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Kelola pengajuan izin dari mahasiswa
      </p>
    </div>

    <!-- Stats -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
    >
      <div class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold mb-1"
            >
              Menunggu
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400"
            >
              {{ pendingLeaves.length }}
            </p>
          </div>
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
              Disetujui
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400"
            >
              {{ approvedLeaves.length }}
            </p>
          </div>
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-white"
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

      <div
        class="glass rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover sm:col-span-2 lg:col-span-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold mb-1"
            >
              Ditolak
            </p>
            <p
              class="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400"
            >
              {{ rejectedLeaves.length }}
            </p>
          </div>
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div
      class="glass rounded-lg sm:rounded-xl p-1.5 sm:p-2 mb-4 sm:mb-6 inline-flex flex-wrap gap-1"
    >
      <button
        @click="activeTab = 'pending'"
        :class="
          activeTab === 'pending'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300'
        "
        class="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-semibold transition-all duration-300"
      >
        Menunggu
      </button>
      <button
        @click="activeTab = 'approved'"
        :class="
          activeTab === 'approved'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300'
        "
        class="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-semibold transition-all duration-300"
      >
        Disetujui
      </button>
      <button
        @click="activeTab = 'rejected'"
        :class="
          activeTab === 'rejected'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300'
        "
        class="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-semibold transition-all duration-300"
      >
        Ditolak
      </button>
      <button
        @click="activeTab = 'all'"
        :class="
          activeTab === 'all'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300'
        "
        class="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-semibold transition-all duration-300"
      >
        Semua
      </button>
    </div>

    <!-- Leave Requests List -->
    <div class="space-y-4">
      <div
        v-for="leave in displayedLeaves"
        :key="leave.id"
        class="glass rounded-xl p-6 card-hover"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-white font-bold text-lg">{{
                getStudentName(leave.studentId).charAt(0)
              }}</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">
                {{ getStudentName(leave.studentId) }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                NIM: {{ getStudentNIM(leave.studentId) }}
              </p>
            </div>
          </div>

          <span
            :class="{
              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400':
                leave.status === 'pending',
              'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400':
                leave.status === 'approved',
              'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400':
                leave.status === 'rejected',
            }"
            class="px-4 py-2 text-sm font-semibold rounded-full"
          >
            {{ getStatusText(leave.status) }}
          </span>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Tanggal Izin
            </p>
            <p class="font-semibold text-gray-800 dark:text-gray-100">
              {{ formatDate(leave.leaveDate) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Jenis Izin
            </p>
            <p class="font-semibold text-gray-800 dark:text-gray-100">
              {{ leave.leaveType }}
            </p>
          </div>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Alasan</p>
          <p class="text-gray-800 dark:text-gray-100">{{ leave.reason }}</p>
        </div>

        <div
          v-if="leave.adminNote"
          class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <p
            class="text-sm text-blue-800 dark:text-blue-300 font-semibold mb-1"
          >
            Catatan Admin
          </p>
          <p class="text-blue-700 dark:text-blue-400">{{ leave.adminNote }}</p>
        </div>

        <div
          class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Diajukan: {{ formatDateTime(leave.submittedAt) }}
          </p>

          <div v-if="leave.status === 'pending'" class="flex space-x-3">
            <button
              @click="openRejectModal(leave)"
              class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              Tolak
            </button>
            <button
              @click="approveLeave(leave)"
              class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Setujui
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="displayedLeaves.length === 0"
        class="glass rounded-xl p-12 text-center"
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400 text-lg font-semibold">
          Tidak ada pengajuan izin
        </p>
      </div>
    </div>

    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="modal-backdrop"
      @click="showRejectModal = false"
    >
      <div
        @click.stop
        class="glass rounded-2xl p-8 max-w-md mx-auto mt-32 animate-slide-up"
      >
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Tolak Pengajuan Izin
        </h3>

        <div class="mb-6">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Catatan (Opsional)
          </label>
          <textarea
            v-model="rejectNote"
            rows="4"
            placeholder="Berikan alasan penolakan..."
            class="input-field"
          ></textarea>
        </div>

        <div class="flex space-x-4">
          <button @click="showRejectModal = false" class="flex-1 btn-secondary">
            Batal
          </button>
          <button @click="rejectLeave" class="flex-1 btn-danger">
            Tolak Izin
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLeaveStore } from "../../stores/leave";
import { useAuthStore } from "../../stores/auth";

const leaveStore = useLeaveStore();
const authStore = useAuthStore();

const activeTab = ref("pending");
const showRejectModal = ref(false);
const selectedLeave = ref(null);
const rejectNote = ref("");

const allLeaves = computed(() => leaveStore.getAllLeaves());
const pendingLeaves = computed(() => leaveStore.getPendingLeaves());
const approvedLeaves = computed(() =>
  allLeaves.value.filter((l) => l.status === "approved"),
);
const rejectedLeaves = computed(() =>
  allLeaves.value.filter((l) => l.status === "rejected"),
);

const displayedLeaves = computed(() => {
  switch (activeTab.value) {
    case "pending":
      return pendingLeaves.value;
    case "approved":
      return approvedLeaves.value;
    case "rejected":
      return rejectedLeaves.value;
    default:
      return allLeaves.value;
  }
});

const getStudentName = (studentId) => {
  const student = authStore.users.find((u) => u.id === studentId);
  return student ? student.name : "Unknown";
};

const getStudentNIM = (studentId) => {
  const student = authStore.users.find((u) => u.id === studentId);
  return student ? student.nim : "-";
};

const getStatusText = (status) => {
  const statusMap = {
    pending: "Menunggu",
    approved: "Disetujui",
    rejected: "Ditolak",
  };
  return statusMap[status] || status;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const approveLeave = (leave) => {
  leaveStore.updateLeaveStatus(
    leave.id,
    "approved",
    "Pengajuan izin disetujui",
  );
};

const openRejectModal = (leave) => {
  selectedLeave.value = leave;
  rejectNote.value = "";
  showRejectModal.value = true;
};

const rejectLeave = () => {
  if (selectedLeave.value) {
    leaveStore.updateLeaveStatus(
      selectedLeave.value.id,
      "rejected",
      rejectNote.value || "Pengajuan izin ditolak",
    );
    showRejectModal.value = false;
    selectedLeave.value = null;
    rejectNote.value = "";
  }
};
</script>
