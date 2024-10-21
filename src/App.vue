<template>
  <div class="app-wrapper">
    <AppSideBar/>

    <main class="main-content" :class="{expanded: isExpanded}">
      <!-- Aquí se carga el contenido dinámico según la ruta -->
      <router-view />
    </main>
  </div>
</template>

<script>

import AppSideBar from "./components/AppSidebar.vue";

export default {
  name: 'App',
  components: {
    AppSideBar
  },
  data () {
    return {
      isExpanded: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.isExpanded= !this.isExpanded;
    },
  },
};
</script>

<style scoped>

.app-wrapper {
  display: flex;
  min-height: 100vh;
}

.tooltip-text {
  display: none;
  position: absolute;
  left: 90px;
  white-space: nowrap;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.main-content {
  margin-left: 80px;
  padding: 20px;
  width: 100%;
  transition: margin-left 0.3 ease, background-color 0.3s ease;
  background-color: #f5f5f5;
}

.main-content.expanded {
  margin-left: 255px;
  z-index: 1;
}

</style>
