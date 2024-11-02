<template>
  <aside ref="sidebar" class="sidebar" :class="{ expanded }">
    <!-- Toggle button for expanding/collapsing -->
    <!-- Toggle Sidebar Arrow -->
    <li class="nav-item toggle-btn" @click="toggleSidebar">
      <i class="bi" :class="expanded ? 'bi-chevron-left' : 'bi-chevron-right'"></i>
    </li>

    <!-- Toggle button for expanding/collapsing -->

    <ul class="nav flex-column">

      <!--Home-->
      <li class="nav-item">
        <router-link to="/home" class="nav-link">
          <i class="bi bi-house-door-fill"></i>
          <span v-if="expanded" class="tooltip-text">Home</span>
        </router-link>
      </li>

      <!--Sucursales-->
      <li class="nav-item">
        <router-link to="/empresas" class="nav-link">
          <i class="bi bi-shop-window"></i>
          <span v-if="expanded" class="tooltip-text">Empresas</span>
        </router-link>
      </li>

      <!--Usuario-->
      <li class="nav-item">
        <router-link to="/usuarios" class="nav-link">
          <i class="bi bi-person-fill"></i>
          <span v-if="expanded" class="tooltip-text">Usuarios</span>
        </router-link>
      </li>
      
      <!--Proveedores-->
      <li class="nav-item">
        <router-link to="/proveedores" class="nav-link">
          <i class="bi bi-truck"></i>
          <span v-if="expanded" class="tooltip-text">Usuarios</span>
        </router-link>
      </li>

    </ul>

    <div id="aside-line"></div>

    <!--Configuracion-->
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/config-page" class="nav-link" >
          <i class="bi bi-gear-fill"></i>
          <span v-if="expanded" class="tooltip-text">Configuracion</span>
        </router-link>
      </li>

      <!--Cerrar sesion-->
      <li class="nav-item">
        <a class="nav-link" style="cursor: pointer;">
          <i class="bi bi-box-arrow-right"></i>
          <span v-if="expanded" class="tooltip-text">Cerrar sesión</span>
        </a>
      </li>

      <!-- Toggle Dark Mode -->
      <li class="nav-item toggle-btn">
        <i class="bi bi-moon-stars-fill"></i>
      </li>
    </ul>

  </aside>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    expandSidebar() {
      this.$emit('expand-sidebar'); // Emitir evento para expandir
    },
    collapseSidebar() {
      this.$emit('collapse-sidebar'); // Emitir evento para contraer
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.app-wrapper {
  display: flex;
  min-height: 100vh;
}

#aside-line {
  width: 60%;
  height: 1px;
  background-color: #c09d62;
  margin: 10px auto;
}


a.nav-link {
  display: flex;
  justify-content: flex-start;
  /* Alinea el contenido a la izquierda */
}

/* 
ul.nav {
    padding: 0 15px;
}
 */

.main-content.expanded {
  padding-left: 0px;
  z-index: 1;
}

.main-content {
  margin-left: 80px;
  padding: 20px;
  width: 100%;
  transition: margin-left 0.3s ease, background-color 0.3s ease;
  background-color: #f5f5f5;
}

/*.main-content.dark */

/* Estilo del botón de expansión/retracción del AppSidebar */
.toggle-btn {
  background-color: #d4d4d4;
  border-radius: 50%;
  /* Mantiene la forma circular */
  padding: 5px;
  cursor: pointer;
  text-align: center;
  margin: 10px auto;
  /* Centra horizontalmente */
  display: flex;
  justify-content: center;
  /* Una sola vez es suficiente */
  align-items: center;
  width: 40px;
  /* Ancho fijo */
  height: 40px;
  /* Alto fijo */
  position: relative;
  /* Esto está bien si no usas `absolute` en hijos o elementos relacionados */
  flex-shrink: 0;
  /* Evita que se encoja con el sidebar */
}

.tooltip-text {
  margin-left: 10px;
  font-weight: bold;
  font-size: 15px;
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.10vh;
  position: relative;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /*Alinea los iconos a la izquierda */
  color: #c09d62;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link i {
  font-size: 3.5vh;
  /* Tamaño uniforme para los íconos */
  color: inherit;
  /* Hereda el color del texto */
}

.nav-link:hover {
  background-color: #dadada;
}

/* Estilos y layout del sidebar*/
.sidebar {
  width: 80px;
  background-color: #ebebeb;
  position: fixed;
  height: 100%;
  padding-top: 20px;
  padding-right: 0;
  z-index: 10;
  margin: 0;
  transition: width 0.3s ease;
  overflow-x: hidden;
}

.sidebar.expanded {
  width: 250px;
  /*Tamaño del sidebar al esta expandido */

  .nav-item {
    padding-left: 40px
  }

  .toggle-btn {
    padding: 0;
  }
}

/*.sidebar a.navlink */

/*.sidebar dark a.navlink */

/*.sidebar a.navlink active */

.sidebar .nav {
  list-style: none;
  padding-left: 0;
}

.sidebar .nav-item {
  margin-bottom: 10px;
}

.sidebar .nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  color: rgb(245, 196, 91);
  font-size: 24px;
  text-align: center;
  position: relative;
  text-decoration: none;
}

.sidebar .nav-link:hover {
  background-color: rgb(238, 203, 157);
  color: white;
}

.sidebar .nav-link i {
  display: block;
}

.sidebar .nav-link:hover .tooltip-text {
  display: block;
}

.link-text {
  margin-left: 10px;
  transition: opacity 0.3s ease;
}
</style>