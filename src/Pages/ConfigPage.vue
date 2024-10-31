<template>
  <div class="configuracion-usuario">
    <div class="encabezado">
      <h1>Configuracion</h1>
      <ProfileButton :company-name="'Perdomo y Asociados'" :role="'Gerente'" />

    </div>
    <hr>
    <div class="config-wrapper">
      <div class="usuario-config">
        <form autocomplete="off" class="formulario form-basic-user">
          <fieldset :disabled="usuarioEditing" >
            <div class="contenedor-titulo">
            <h2 class="titulo-form">Configuración</h2>
          </div>

          <div class="contenedor-principal">
            <div class="contenedor-interno contenedor-izquierdo">
              <label for="nombre-usuario">Nombre de usuario:</label>
              <input type="text" id="nombre-usuario" name="nombre-usuario" required />


              <label for="telefono">Teléfono:</label>
              <input type="text" id="telefono" name="telefono" required />


              <label for="direccion">Dirección:</label>
              <input type="text" id="direccion" name="direccion" required />
            </div>


            <div class="contenedor-interno contenedor-derecho">
              <label for="contrasena">Contraseña actual:</label>
              <input type="password" id="input-codigo-contrasena" name="contrasena" required />


              <label for="contrasena-nueva">Contraseña nueva:</label>
              <input type="password" id="contrasena-nueva" name="contrasena-nueva" required />


              <label for="contrasena-confirmar">Confirmar contraseña:</label>
              <input type="password" id="contrasena-confirmar" name="contrasena-confirmar" required />
            </div>
            
          </div>
          </fieldset>
          

          <div class="botones-container">
              <button class="btn editar" @click="isEditing(1)" :disabled="!usuarioEditing" >Editar</button>
              <button class="btn guardar" :disabled="usuarioEditing" >Guardar</button>
            </div>
        </form>

        <form autocomplete="off" class="formulario form-avanced-user">
          <fieldset :disabled="usuarioAvancedEditing" >
            <div class="contenedor-titulo">
            <h2 class="titulo-form">Configuración avanzada</h2>
          </div>

          <div class="contenedor-principal">
            <div class="contenedor-interno contenedor-izquierdo">
              <label for="Nombre">Nombre:</label>
              <input type="text" id="Nombre" name="Nombre" required />


              <label for="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" required />


              <label for="correo">Correo:</label>
              <input type="email" id="correo" name="correo" required />
            </div>
          </div>

          </fieldset>
          
          <div class="botones-container">
              <button class="btn editar" @click="isEditing(2)" :disabled="!usuarioAvancedEditing" >Editar</button>
              <button class="btn guardar" :disabled="usuarioAvancedEditing" >Guardar</button>
            </div>

          <!-- Fecha de inicio -->
        </form>
      </div>

    </div>
  </div>
  


</template>

<script>
import ProfileButton from '@/components/ProfileButton.vue';

export default {
  components: {
    ProfileButton,
  },
  data() {
    return {
      usuarioEditing: true,
      usuarioAvancedEditing: true,
      userForm: [{
        nombreUsuario: '',
          telefono: '',
          direccion: '',
          contrasena_actual: '',
          contrasena_nueva: '',
          contrasena_confirm: '',
      }],

      userFormAdvanced: [
        {
          nombre: '',
          apellido: '',
          correo: '',
        }
      ],
    };
  },
  methods: {

    pushEsc(event) {
      if (event.key === "Esc" || event.key === "Escape") {
        this.usuarioAvancedEditing = true;
        this.usuarioEditing = true;
      }
    },

    isEditing(orden) {
      switch (orden) {
        case 1: this.usuarioEditing = false;
                this.usuarioAvancedEditing = true;
        break;

        case 2: this.usuarioAvancedEditing = false;
                this.usuarioEditing = true;
        break;

        default:
          alert("Ha ocurrido un error!");
      }
    },
  },

  mounted() {
    // Añade el manejador de eventos cuando el componente se monta
    window.addEventListener("keydown", this.pushEsc);
  },
  beforeUnmount() {
    // Elimina el manejador de eventos cuando el componente se destruye
    window.removeEventListener("keydown", this.pushEsc);
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.encabezado {
  display: flex;
  justify-content: space-between;
}

h1 {
  color: #d6b602;
}

.contenedor-principal {
  display: flex;
  justify-content: space-around;
}

form {
  border: 1px solid rgb(110, 109, 109);
  padding: 3% 0 2% 0;
  border-radius: 10px;
  min-width: 800px;
  min-height: 200px;
  position: relative;
}


fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

fieldset:disabled label,
fieldset:disabled input {
  color: #858585;
}

.botones-container .btn:disabled {
  background-color: #888787;
}

.formulario {
  margin-bottom: 5%;
}

.contenedor-principal input {
  margin-bottom: 4%;
}

.titulo-form {
  position: absolute;
  top: -11.5%;
  background-color: #f5f5f5;
  padding: 0 10px;
  color: #858585;
}

.contenedor-titulo {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.contenedor-boton {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.contenedor-principal input {
  width: 95%;
  height: 25%;

  justify-content: center;
}

.contenedor-interno {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0 2%;
}

.config-wrapper {
  padding: 16px;
}

.botones-container {
  display: flex;
  justify-content: end;
  margin-right: 2.5%;
}

.botones-container .btn {
  border-radius: 5px;
}

.btn {
  padding: 8px 16px;
  margin: 4px;
  border: none;
  cursor: pointer;
}

.guardar {
  background-color: #009b15;
  font-weight: bolder;
  color: rgb(255, 255, 255);
}

.editar {
  background-color: #5a5a5a;
  font-weight: bolder;
  color: rgb(255, 255, 255);
}

.boton-switch.activo:hover {
  padding: 10px 18px;
  transition: all 0.3s ease;
}

.activo {
  background-color: rgb(62, 238, 62);
  color: white;
}

.inactivo {
  background-color: rgb(238, 62, 62);
  color: white;
}
</style>
