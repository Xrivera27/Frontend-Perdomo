<template>
  <div class="encabezado">
    <h1>Categorias de Empresas</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <div class="categorias-empresas-wrapper">
    <div class="opciones">
      <button id="btnAdd" class="btn btn-primary" @click="openModal" style="width: 200px; white-space: nowrap;">
        Agregar Categoria
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

      <!-- Barra de búsqueda -->
      <div class="search-bar">
        <input class="busqueda" type="text" v-model="searchQuery" placeholder="Buscar categoria..." />
      </div>
    </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(categoria,index) in paginatedCategorias" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ categoria.nombre }}</td>
              <td>{{ categoria.descripcion }}</td>
              <td>
                <button id="btnEditar" class="btn btn-warning" @click="editCategoria(index)">
                  <i class="bi bi-pencil-fill"></i>
                </button>

                <button id="btnEliminar" class="btn btn-danger" @click="deleteCategorias(index)">
                  <b><i class="bi bi-x-lg"></i></b>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal para agregar y editar categorias-->
       <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <h2 class="h2-modal-content">{{ isEditing ? 'Editar Categoria' :'Agregar Categoria' }}</h2>

          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="categoriaForm.nombre" type="text" required>
          </div>

          <div class="form-group">
            <label>Descripcion:</label>
            <input v-model="categoriaForm.descripcion" type="text" required>
          </div>

          <button id="AddCategoriaModal" class="btn btn-primary" @click="guardarCategoria">
            {{ isEditing ? 'Guardar cambios': 'Agregar Categoria' }}
          </button>

          <button id="btnCerrar" class="btn btn-secundary" @click="closeModal">Cerrar</button>
        </div>
      </div>
  </div>
</template>

<script>
import { guardReactiveProps } from 'vue';
import ProfileButton from '../components/ProfileButton.vue';

export default {
  components: {
    ProfileButton,
  },
  data() {
    return {
      searchQuery: '', // Almacena el texto de búsqueda
      isModalOpen: false,
      isEditing: false,
      editIndex: null,
      itemsPerPage: "",
      categoriaForm: {
        nombre: '',
        descripcion: '',
      },
      categorias: [
        { nombre: 'CategoriaEmpresa #1', descripcion:'descripcion #1' },
        { nombre: 'CategoriaEmpresa #2', descripcion:'descripcion #2' },
        { nombre: 'CategoriaEmpresa #3', descripcion:'descripcion #3' },
      ]
    };
  },

  computed: {
    filteredCategorias() {
      // Filtra las categorias basados en el texto de búsqueda
      return this.categorias.filter(categoria =>
        categoria.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        categoria.descripcion.includes(this.searchQuery)
      );
    },

    paginatedCategorias() {

      if (this.itemsPerPage === "" || this.itemsPerPage === null) {
        return this.filteredCategorias;
      } else {
        return this.filteredCategorias.slice(0, parseInt(this.itemsPerPage));
      }
    }

  },

  methods: {
    openModal(){
      this.isModalOpen = true;
    },

    closeModal(){
      this.isModalOpen = false;
      this.clearForm();
    },

    clearForm() {
      this.categoriaForm = {
        nombre: '',
        descripcion: '',
      }
      this.isEditing = false;
      this.editIndex = null;
    },


    guardarCategoria() {
      if (this.isEditing) {
        this.categorias[this.editIndex] = {...this.categoriaForm};
      }else {
        this.categorias.push({...this.categoriaForm});
      }
      this.closeModal();
    },

    editCategoria(index) {
      this.categoriaForm = {...this.categorias[index]};
      this.isEditing = true;
      this.editIndex = index;
      this.openModal();
    },

    deleteCategorias(index) {
      this.categorias.splice(index, 1);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categorias-empresas-wrapper {
  padding: 16px;
}

.opciones {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.registros {
  height: 100%;
  padding-bottom: 1%;
}

.custom-select:focus {
  outline: none;
  border-color: #a38655;
}

.custom-select option {
  font-size: 16px;
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

.busqueda {
  float: right;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border-width: 0.5px;
}

#btnAdd {
  background-color: #c09d62;
  width: 140px;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
  color: black;
  font-weight: bold;
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

.table-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-top: 16px;
}

h1 {
  color: #d6b602;
}

.rol {
  color: #969696;
  font-size: 14px;
}

.export-button {
  margin: 0;
}

#form-tel {
  width: 30%;
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

.h2-modal-content {
  margin-top: 0px;
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

#AddCategoriaModal {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  margin-right: 1rem;
}

.custom-select:focus {
  outline: none;
  border-color: #a38655;
}

.custom-select option {
  font-size: 16px;
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
</style>