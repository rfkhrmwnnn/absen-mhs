I will fix the night mode transition issue by ensuring the application container maintains the correct background color during page transitions.

**The Problem:**
Currently, the `dark` class is applied to a wrapper `div` in `App.vue`, but this wrapper has no background color. The `body` element stays in light mode because the `dark` class is on its child. When navigating between pages (like Home to Login), the old page fades out, revealing the transparent wrapper and the white `body` background, causing a "white flash" in dark mode.

**The Fix:**
I will update `src/App.vue` to explicitly set the background color on the main wrapper `div` to match the theme.

**Implementation Steps:**

1. **Edit** **`src/App.vue`**:

   * Add `bg-gray-50` (light mode) and `dark:bg-gray-900` (dark mode) classes to the root `div`.

   * Add `transition-colors duration-300` to ensure smooth theme toggling.

   * This provides a solid background fallback during the split-second transition between pages, preventing the white flash.

**File to Change:**

* [App.vue](file:///Users/ryota/Documents/My%20Project/Trae/absen-mhs/src/App.vue)

