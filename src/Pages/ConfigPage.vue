<template>
  <div class="configuracion-usuario">
    <div class="encabezado">
      <h1>Configuracion</h1>
      <ProfileButton :company-name="'Perdomo y Asociados'" :role="'Gerente'" />

    </div>
    <hr>
    <div class="config-wrapper">
      <div class="company-config">
        <form autocomplete="off" class="formulario form-company">
          <fieldset :disabled="businessEditing">
            <div class="contenedor-titulo">
              <h2 class="titulo-form">Configuración Empresa</h2>
            </div>

            <div class="contenedor-principal">
              <div class="contenedor-interno contenedor-izquierdo">
                <label for="nombre-company">Nombre de la empresa:</label>
                <input type="text" id="nombre-company" name="nombre-company" required />


                <label for="telefono-empresa">Telefono principal:</label>
                <input type="text" id="telefono-empresa" name="telefono-empresa" required />


                <label for="correo-principal">Correo principal:</label>
                <input type="email" id="correo-principal" principal de la empresa name="correo" required />
              </div>
            </div>
          </fieldset>
          <div class="botones-container">
            <button class="btn editar" @click="isEditing(1)" :disabled="!businessEditing">Editar</button>
            <button class="btn guardar" :disabled="businessEditing">Guardar</button>
          </div>


          <!-- Fecha de inicio -->
        </form>

        <form autocomplete="off" class="formulario form-company-SAR">
          <fieldset :disabled="busisnessSarEditing">
            <div class="contenedor-titulo">
              <h2 class="titulo-form">Configuración SAR</h2>
            </div>

            <div class="contenedor-principal">
              <div class="contenedor-interno contenedor-izquierdo">
                <label for="categoria">Numero CAI:</label>
                <input type="text" id="numero_cai" name="numero_cai" required />

                <!-- Porcentaje de descuento -->
                <label for="rango_inical">Rango Inicial:</label>
                <input type="number" id="rango_inical" name="rango_inical" required />

                <label for="rango_inical">Rango Final:</label>
                <input type="number" id="rango_final" name="rango_final" required />
              </div>
              <!-- Categoria ID -->
              <div class="contenedor-interno contenedor-derecho">
                <label for="fecha_autorizacion">Fecha de autorización:</label>
                <input type="date" id="fecha_autorizacion" name="fecha_autorizacion" required />

                <!-- Fecha final -->
                <label for="fecha_vencimiento">Fecha de vencimiento:</label>
                <input type="date" id="fecha_vencimiento" name="fecha_vencimiento" required />

                <!-- Enviar el formulario -->
              </div>
            </div>
          </fieldset>

          <div class="botones-container">
            <button class="btn editar" @click="isEditing(2)" :disabled="!busisnessSarEditing">Editar</button>
            <button class="btn guardar" :disabled="busisnessSarEditing">Guardar</button>
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
      businessEditing: true,
      busisnessSarEditing: true,
      companyForm: [{
        nombre: '',
        apellido: '',
        correo: '',
      }],
    };
  },
  methods: {

    pushEsc(event) {
      if (event.key === "Esc" || event.key === "Escape") {
        this.busisnessSarEditing = true;
        this.businessEditing = true;
      }
    },

    isEditing(orden) {
      switch (orden) {
        case 1: this.businessEditing = false;
                this.busisnessSarEditing = true;
        break;

        case 2: this.busisnessSarEditing = false;
                this.businessEditing = true;
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
