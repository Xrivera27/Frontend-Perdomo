<template>
    <aside ref="sidebar" class="sidebar" :class="{expanded}">
        <!--Boton de expansion y retracion del AppSidebar-->
        <li class="nav-item toggle-btn" @click="toggleSidebar" >
            <i class="bi" :class="expanded ? 'bi-chevron-left' : 'bi-chevron-right'"></i>
        </li>

      <ul class="nav flex-column">

        <!--Home-->
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <i class="bi bi-house-door-fill"></i>
            <span v-if= "expanded" class="link-text">Home</span>
          </router-link>
        </li>

        <!--Sucursales-->
        <li class="nav-item">
          <router-link to="/sucursales" class="nav-link">
            <i class="bi bi-shop-window"></i>
            <span v-if= "expanded" class="link-text">Sucursales</span>
          </router-link>
        </li>

        <!--Usuario-->
        <li class="nav-item">
          <router-link to="/usuarios" class="nav-link">
            <i class="bi bi-person-fill"></i>
            <span v-if= "expanded" class="link-text">Usuarios</span>
          </router-link>
        </li>
        
      </ul>

      <div id="aside-line"></div>

      <!--Configuracion-->
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/config-page" class="nav-link">
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
      </ul>

    </aside>
  </template>
  
  <script>
  export default {
    name: "AppSidebar",
    props: {
      expanded:{
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

/* Estilos y layout del sidebar*/ 
.sidebar {
  width: 80px;
  background-color:#ebebeb;
  color: white;
  padding-top: 20px;
  position: fixed;
  height: 100%;
  transition: width 0.3s ease;
  overflow-x: hidden;
}

.sidebar.expanded {
    width: 250px; /*Tamaño del sidebar al esta expandido */

    .nav-item{
        padding-left: 40px
    }

    .toggle-btn{
        padding: 0;
    }
}

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

.nav-link.active {
    background-color: #d4d4d4;
    color: #79552f;
    /* Color del texto y los íconos en estado activo */
}

.link-text {
    margin-left: 10px;
    transition: opacity 0.3s ease;
}
  
/* Estilo del botón de expansión/retracción del AppSidebar */
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

    position: relative;

    flex-shrink: 0;

}

</style>
  