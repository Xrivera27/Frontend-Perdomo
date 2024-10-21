<template>
  <div class="app-wrapper">
    <AppSideBar :expanded="expanded" @toggle-sidebar="toggleSidebar" @expand-sidebar="expandSidebar" @collapse-sidebar="collapseSidebar"/>

    <main class="main-content" :class="{expanded}">
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
      expanded: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.expanded= !this.expanded;
    },
    async expandSidebar() {
      this.expanded = true;
    },
    async collapseSidebar() {
      this.expanded = false;
    },
  },
};
</script>

<style scoped>

.app-wrapper {
  display: flex;
  min-height: 100vh;
}

.app-wrapper {
  padding-right: 0;
  /* Elimina el padding del lado derecho */
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

.toggle-btn {
  background-color: #d4d4d4;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

.toggle-btn i {
  font-size: 1.5rem;
  color: #c09d62;
}



</style>
