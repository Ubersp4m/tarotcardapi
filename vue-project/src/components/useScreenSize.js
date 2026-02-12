// useScreenSize.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useScreenSize() {
  const width = ref(window.innerWidth);
  const isMobile = ref(window.innerWidth < 768); // Define your mobile breakpoint

  const updateWidth = () => {
    width.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768; // Update the boolean on resize
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { width, isMobile };
}