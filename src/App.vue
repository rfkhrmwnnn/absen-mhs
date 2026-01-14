<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStore } from "./stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
</script>
