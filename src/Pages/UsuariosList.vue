<template>
  <div class="encabezado">
    <h1>Usuarios</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <div class="empleados-wrapper">
    <div class="opciones">
    <button id="btnAdd" class="btn btn-primary" @click="openModal" style="width: 200px; white-space: nowrap;">Agregar
      Usuario</button>

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

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input class="busqueda" type="text" v-model="searchQuery" placeholder="Buscar empleado..." />
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
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado, index) in paginatedEmpleados" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.apellido }}</td>
            <td>{{ empleado.nombreusuario }}</td>
            <td>{{ empleado.contraseña }}</td>
            <td>{{ empleado.correo }}</td>
            <td>{{ empleado.telefono }}</td>
            <td>{{ empleado.direccion }}</td>
            <td>
              <button id="btnEditar" class="btn btn-warning" @click="editEmpleado(index)"><i
                  class="bi bi-pencil-fill"></i></button>
              <button id="btnEliminar" class="btn btn-danger" @click="deleteEmpleado(index)"><b><i
                    class="bi bi-x-lg"></i></b></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para agregar o editar empleados -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2 class="h2-modal-content">{{ isEditing ? 'Editar Empleado' : 'Agregar Empleado' }}</h2>

        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="empleadoForm.nombre" type="text" required>
        </div>

        <div class="form-group">
          <label>Apellido:</label>
          <input v-model="empleadoForm.apellido" type="text" required>
        </div>

        <div class="form-group">
          <label>Nombre de Usuario:</label>
          <input v-model="empleadoForm.nombreusuario" type="text" required>
        </div>

        <div class="form-group">
          <label>Correo:</label>
          <input v-model="empleadoForm.correo" type="text" required>
        </div>


        <div class="form-group password-group">
          <label>Contraseña:</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
            <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" class="toggle-password"
              @click="togglePasswordVisibility"></i>
          </div>
        </div>

        <div class="form-group password-group">
          <label>Confirmar Contraseña:</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
            <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" class="toggle-password"
              @click="togglePasswordVisibility"></i>
          </div>
        </div>

        <div id="form-tel" class="form-group">
          <label>Telefono:</label>
          <input v-model="empleadoForm.telefono" type="text" required>
        </div>

        <div id="form-direc" class="form-group">
          <label>Direccion:</label>
          <input v-model="empleadoForm.direccion" type="text" required>
        </div>

        <div id="form-idenSucursal" class="form-group">
          <label>Identificacion unico de Sucursal:</label>
          <input v-model="empleadoForm.identificarSucursal" type="text" required>
        </div>

        <button id="AddEmpleadoModal" class="btn btn-primary" @click="guardarEmpleado">
          {{ isEditing ? 'Guardar Cambios' : 'Agregar Empleado' }}
        </button>
        <button id="BtnCerrar" class="btn btn-secondary" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton.vue';
export default {
  components: {
    ProfileButton
  },
  data() {
    return {
      searchQuery: '', // Almacena el texto de búsqueda
      isModalOpen: false,
      isEditing: false,
      showPassword: false,
      editIndex: null,
      itemsPerPage: "",
      empleadoForm: {
        nombre: '',
        apellido: '',
        nombreusuario: '',
        contraseña: '',
        correo: '',
        telefono: '',
        direccion: '',
        identificarSucursal: '',
      },
      empleados: [
        {nombre: 'Carlos', apellido: 'Sosa', nombreusuario: 'Ernest', contraseña: '********',correo: 'trabajososa@gmail.com', telefono: '99765432', direccion: 'Col. La Pradera'},
        {nombre: 'Ada', apellido: 'Selina', nombreusuario: 'Selena', contraseña: '******',correo: 'adaselina@gmail.com', telefono: '97654321', direccion: 'Col. Pizzaty'},
        {nombre: 'Leonel', apellido: 'Salinas', nombreusuario: 'Sol', contraseña: '*****',correo: 'leoslinas@gmail.com', telefono: '97896743', direccion: 'Col. Las Acacias'},
      ]

    };
  },
  computed: {
    filteredEmpleados() {
      // Filtra los empleados basados en el texto de búsqueda
      return this.empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        empleado.apellido.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        empleado.nombreusuario.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedEmpleados() {
      // Si itemsPerPage es vacío, mostramos todos los registros, de lo contrario aplicamos la paginación
      if (this.itemsPerPage === "" || this.itemsPerPage === null) {
        return this.filteredEmpleados;
      } else {
        return this.filteredEmpleados.slice(0, parseInt(this.itemsPerPage));
      }
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.clearForm();
    },
    clearForm() {
      this.empleadoForm = {
        nombre: '',
        apellido: '',
        nombreusuario: '',
        contraseña: '',
        correo: '',
        telefono: '',
        direccion: '',
        identificarSucursal: '',
      };
      this.isEditing = false;
      this.editIndex = null;
    },
    guardarEmpleado() {
      if (this.isEditing) {
        this.empleados[this.editIndex] = { ...this.empleadoForm };
      } else {
        this.empleados.push({ ...this.empleadoForm });
      }
      this.closeModal();
    },
    editEmpleado(index) {
      this.empleadoForm = { ...this.empleados[index] };
      this.isEditing = true;
      this.editIndex = index;
      this.openModal();
    },
    deleteEmpleado(index) {
      this.empleados.splice(index, 1);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
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

.opciones{
  display:flex;
  align-items: center;
  justify-content: space-between;
}

.busqueda {
  float: right;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border-width: 0.5px;
}

.registros{
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

.export-button{
  margin: 0;
}

.opciones{
  display:flex;
  align-items: center;
  justify-content: space-between;
}

.h2-modal-content {
  margin-top: 0px
}

#btnAdd:hover {
  background-color: #a38655;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

#btnEditar {
  font-size: 18px;
  width: 50px;
  height: 40px;
  border-radius: 10px;
}

#btnEditar:hover {
  background-color: #e8af06;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

#btnEliminar {
  font-size: 18px;
  width: 50px;
  height: 40px;
  border-radius: 10px;
  color: black;
}

#btnEliminar:hover {
  background-color: #b72433;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

#campana {
  margin-right: 10px;
  font-size: 18px;
  color: #a38655;
}

.container-top {
  width: 100%;
  text-align: right;
}

.rol {
  color: #969696;
  font-size: 14px;
}

select {
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  width: 60px;
  height: 35px;
  border-radius: 5px;
}

.empleados-wrapper {
  padding: 16px;
}

.table-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-top: 16px;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table th,
.table td {
  padding: 8px;
}

.table thead th {
  background-color: none;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.table tbody td {
  text-align: center;
  border-top: 1px solid #ddd;
}

.table thead th:first-child {
  border-top-left-radius: 10px;
}

.table thead th:last-child {
  border-top-right-radius: 10px;
}

.table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

.table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.btn {
  padding: 8px 16px;
  margin: 4px;
  border: none;
  cursor: pointer;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
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

#AddEmpleadoModal {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  margin-right: 1rem;
}

#BtnCerrar {
  background-color: rgb(93, 100, 104);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  margin-right: 1rem;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 16px;

}

.form-group label {
  display: flexbox;
  margin-bottom: 8px;
}

.form-group input {
  width: 95%;
  height: 25%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  justify-content: center;
}

button {
  cursor: pointer;
}

.custom-select {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
  padding: 5px;
  background-color: #fff;
  cursor: pointer;
  width: 80px;
  /* Ajusta el ancho a 120px o el valor que prefieras */
}

.custom-select:focus {
  outline: none;
  border-color: #a38655;
  /* Ajusta el color del borde al de tu diseño */
}

.custom-select option {
  font-size: 16px;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 95%;
  height: 25%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  justify-content: center;
}

.password-wrapper .toggle-password {
  position: absolute;
  right: 1.3rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;
}

.password-wrapper .toggle-password:hover {
  color: #000;
}

#form-tel{
  width: 30%;
}

#form-direc{
  width: 30%;
}
</style>
