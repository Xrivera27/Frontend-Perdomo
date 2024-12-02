<template>
  <div class="encabezado">
    <h1>Usuarios</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <div class="empleados-wrapper">
    <div class="opciones">
      <button id="btnAdd" class="btn btn-primary" @click="openModal">
        Agregar Usuario
      </button>

      <div class="registros">
        <span>Mostrar
          <select v-model="itemsPerPage" class="custom-select">
            <option value="">Todos</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select> registros
        </span>
      </div>

      <div class="search-bar">
        <input 
          class="busqueda" 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar empleado..." 
        />
      </div>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nombre Usuario</th>
            <th>Contraseña</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado, index) in paginatedEmpleados" :key="empleado.id_usuario">
            <td>{{ index + 1 }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.apellido }}</td>
            <td>{{ empleado.nombre_usuario }}</td>
            <td>{{ empleado.contraseña }}</td>
            <td>{{ empleado.correo }}</td>
            <td>{{ empleado.telefono }}</td>
            <td>{{ empleado.direccion }}</td>
            <td>
              <button class="btn btn-warning" @click="editEmpleado(empleado)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="btn btn-danger" @click="desactivarEmpleado(empleado.id_usuario)">
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para agregar o editar empleados -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2 class="h2-modal-content">
          {{ isEditing ? 'Editar Empleado' : 'Agregar Empleado' }}
        </h2>

        <div class="contenedor-principal">
          <div class="contenedor contenedor-izquierdo">
            <div class="form-group">
              <label>Nombre:</label>
              <input 
                v-model="empleadoForm.nombre" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Apellido:</label>
              <input 
                v-model="empleadoForm.apellido" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Nombre de Usuario:</label>
              <input 
                v-model="empleadoForm.nombre_usuario" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Correo:</label>
              <input 
                v-model="empleadoForm.correo" 
                type="email" 
                required
              >
            </div>
          </div>

          <div class="contenedor contenedor-derecho">
            <div class="form-group password-group">
              <label>Contraseña:</label>
              <div class="password-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="empleadoForm.contraseña" 
                  required
                />
                <i 
                  :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" 
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label>Teléfono:</label>
              <input 
                v-model="empleadoForm.telefono" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Dirección:</label>
              <input 
                v-model="empleadoForm.direccion" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Identificación de Sucursal:</label>
              <input 
                v-model="empleadoForm.id_sucursal" 
                type="number" 
                required
              >
            </div>
          </div>
        </div>

        <button 
          class="btn btn-primary" 
          @click="guardarEmpleado"
        >
          {{ isEditing ? 'Guardar Cambios' : 'Agregar Empleado' }}
        </button>
        <button 
          class="btn btn-secondary" 
          @click="closeModal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton.vue';
import solicitudes from '../../services/Solicitudes';

export default {
  components: {
    ProfileButton
  },

  data() {
    return {
      searchQuery: '',
      isModalOpen: false,
      isEditing: false,
      showPassword: false,
      itemsPerPage: "",
      empleadoForm: {
        nombre: '',
        apellido: '',
        nombre_usuario: '',
        contraseña: '',
        correo: '',
        telefono: '',
        direccion: '',
        id_sucursal: ''
      },
      empleados: []
    };
  },

  computed: {
    filteredEmpleados() {
      return this.empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        empleado.apellido.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        empleado.nombre_usuario.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    paginatedEmpleados() {
      if (this.itemsPerPage === "" || this.itemsPerPage === null) {
        return this.filteredEmpleados;
      }
      return this.filteredEmpleados.slice(0, parseInt(this.itemsPerPage));
    }
  },

  methods: {
    async loadEmpleados() {
      try {
        this.empleados = await solicitudes.fetchUsuarios();
      } catch (error) {
        console.error('Error al cargar empleados:', error);
        // Aquí podrías agregar una notificación de error
      }
    },

    openModal() {
      this.isModalOpen = true;
      this.isEditing = false;
      this.clearForm();
    },

    closeModal() {
      this.isModalOpen = false;
      this.clearForm();
    },

    clearForm() {
      this.empleadoForm = {
        nombre: '',
        apellido: '',
        nombre_usuario: '',
        contraseña: '',
        correo: '',
        telefono: '',
        direccion: '',
        id_sucursal: ''
      };
    },

    async guardarEmpleado() {
      try {
        if (this.isEditing) {
          await solicitudes.actualizarUsuario(this.empleadoForm.id_usuario, this.empleadoForm);
        } else {
          await solicitudes.crearUsuario(this.empleadoForm);
        }
        
        this.closeModal();
        await this.loadEmpleados();
        // Aquí podrías agregar una notificación de éxito
      } catch (error) {
        console.error('Error al guardar empleado:', error);
        // Aquí podrías agregar una notificación de error
      }
    },

    editEmpleado(empleado) {
      this.isEditing = true;
      this.empleadoForm = { ...empleado };
      this.isModalOpen = true;
    },

    async desactivarEmpleado(id_usuario) {
      if (confirm('¿Está seguro de desactivar este usuario?')) {
        try {
          await solicitudes.desactivarUsuario(id_usuario, false);
          await this.loadEmpleados();
          // Aquí podrías agregar una notificación de éxito
        } catch (error) {
          console.error('Error al desactivar empleado:', error);
          // Aquí podrías agregar una notificación de error
        }
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  },

  mounted() {
    this.loadEmpleados();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

h1 {
  color: #d6b602;
}

.encabezado {
  display: flex;
  justify-content: space-between;
}

.opciones {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.busqueda {
  float: right;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border-width: 0.5px;
  width: 200px;
}

.registros {
  height: 100%;
  padding-bottom: 1%;
}

#btnAdd {
  background-color: #c09d62;
  font-size: 16px;
  width: 170px;
  height: 40px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
}

#btnAdd:hover {
  background-color: #a38655;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.btn-warning {
  font-size: 18px;
  width: 50px;
  height: 40px;
  border-radius: 10px;
  margin-right: 5px;
}

.btn-warning:hover {
  background-color: #e8af06;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.btn-danger {
  font-size: 18px;
  width: 50px;
  height: 40px;
  border-radius: 10px;
  color: black;
}

.btn-danger:hover {
  background-color: #b72433;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.empleados-wrapper {
  padding: 16px;
}

.table-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table th,
.table td {
  padding: 8px;
  text-align: center;
}

.table thead th {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
}

.contenedor-principal {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.contenedor {
  flex: 1;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.custom-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #c09d62;
  color: black;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>