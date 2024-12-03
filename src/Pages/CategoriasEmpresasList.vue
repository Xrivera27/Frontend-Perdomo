<template>
  <div class="categorias-empresas-wrapper">
    <div class="encabezado">
      <h1>Categorías de Empresas</h1>
      <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
    </div>
    <hr>

    <div class="opciones">
      <button class="btn-primary" @click="openModal">
        Agregar Categoría
      </button>

      <div class="search-bar">
        <input 
          class="busqueda" 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar categoría..."
        />
      </div>
    </div>

    <!-- Tabla de categorías -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in paginatedCategorias" :key="categoria.id_categoria">
            <td>{{ ((currentPage - 1) * pageSize) + index + 1 }}</td>
            <td>{{ categoria.categoria }}</td>
            <td>{{ categoria.descripcion }}</td>
            <td>
              <button class="btn-warning" @click="editCategoria(categoria)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="btn-danger" @click="showDeleteConfirm(categoria.id_categoria)">
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
          <tr v-if="paginatedCategorias.length === 0">
            <td colspan="4" class="text-center">No hay categorías disponibles</td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div v-if="filteredCategorias.length > 0" class="pagination-wrapper">
        <div class="pagination-info">
          Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, filteredCategorias.length) }} de {{ filteredCategorias.length }} registros
        </div>
        <div class="pagination-container">
          <button 
            class="pagination-button" 
            :disabled="currentPage === 1"
            @click="previousPage"
          >
            Anterior
          </button>
          
          <button 
            class="pagination-button" 
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar Categoría' : 'Agregar Categoría' }}</h2>
        
        <form @submit.prevent="guardarCategoria">
          <div class="form-group">
            <label>Categoría:</label>
            <input 
              v-model="categoriaForm.categoria" 
              type="text" 
              required
              placeholder="Ingrese el nombre de la categoría"
            >
          </div>

          <div class="form-group">
            <label>Descripción:</label>
            <input 
              v-model="categoriaForm.descripcion" 
              type="text" 
              required
              placeholder="Ingrese la descripción"
            >
          </div>

          <div class="modal-buttons">
            <button type="submit" class="btn-submit">
              {{ isEditing ? 'Guardar' : 'Agregar' }}
            </button>
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Está seguro que desea eliminar esta categoría?</p>
        <div class="modal-buttons">
          <button class="btn-danger" @click="deleteCategoria">Eliminar</button>
          <button class="btn-cancel" @click="closeDeleteModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton.vue';
import solicitudes from '../../services/Solicitudes';

export default {
  name: 'CategoriaEmpresa',
  
  components: {
    ProfileButton
  },

  data() {
    return {
      categorias: [],
      searchQuery: '',
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      selectedCategoriaId: null,
      currentPage: 1,
      pageSize: 10,
      itemsPerPage: "10",
      categoriaForm: {
        categoria: '',
        descripcion: ''
      }
    }
  },

  computed: {
    filteredCategorias() {
      return this.categorias.filter(categoria =>
        categoria.categoria.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        categoria.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    paginatedCategorias() {
      if (this.itemsPerPage === "") {
        return this.filteredCategorias;
      }
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredCategorias.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.filteredCategorias.length / this.pageSize);
    }
  },

  methods: {
    async fetchCategorias() {
      try {
        const data = await solicitudes.fetchCategorias();
        this.categorias = data;
      } catch (error) {
        console.error('Error:', error);
      }
    },

    openModal() {
      this.showModal = true;
      this.isEditing = false;
      this.categoriaForm = {
        categoria: '',
        descripcion: ''
      };
    },

    closeModal() {
      this.showModal = false;
      this.categoriaForm = {
        categoria: '',
        descripcion: ''
      };
    },

    async guardarCategoria() {
      try {
        if (this.isEditing) {
          await solicitudes.actualizarCategoria(
            this.selectedCategoriaId, 
            this.categoriaForm
          );
        } else {
          await solicitudes.crearCategoria(this.categoriaForm);
        }
        this.closeModal();
        await this.fetchCategorias();
      } catch (error) {
        console.error('Error:', error);
      }
    },

    editCategoria(categoria) {
      this.isEditing = true;
      this.selectedCategoriaId = categoria.id_categoria;
      this.categoriaForm = {
        categoria: categoria.categoria,
        descripcion: categoria.descripcion
      };
      this.showModal = true;
    },

    showDeleteConfirm(id) {
      this.selectedCategoriaId = id;
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
    },

    async deleteCategoria() {
      try {
        await solicitudes.eliminarCategoria(this.selectedCategoriaId);
        this.closeDeleteModal();
        await this.fetchCategorias();
      } catch (error) {
        console.error('Error:', error);
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },

  watch: {
    itemsPerPage(newValue) {
      this.pageSize = newValue === "" ? this.filteredCategorias.length : parseInt(newValue);
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    }
  },

  mounted() {
    this.fetchCategorias();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.categorias-empresas-wrapper {
  padding: 20px;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.opciones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #c09d62;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #a38655;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.registros {
  height: 100%;
  padding-bottom: 1%;
}

.custom-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 0 5px;
}

.custom-select:focus {
  outline: none;
  border-color: #c09d62;
}

.custom-select option {
  font-size: 14px;
}

.busqueda {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 200px;
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

/* Estilos de Paginación */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.9rem;
}

.pagination-container {
  display: flex;
  gap: 8px;
}

.pagination-button {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background-color: white;
  color: #495057;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-button:hover:not(:disabled) {
  background-color: #e9ecef;
  border-color: #dee2e6;
  color: #212529;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: #f8f9fa;
}


.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table thead th {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.btn-warning,
.btn-danger {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-warning {
  background-color: #ffc107;
}

.btn-warning:hover {
  background-color: #e8af06;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #b72433;
  transform: scale(1.05);
  transition: all 0.3s ease;
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-submit {
  background-color: #c09d62;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #a38655;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #5a6268;
  transform: scale(1.05);
  transition: all 0.3s ease;
}

h1 {
  color: #d6b602;
  margin: 0;
}

.text-center {
  text-align: center;
}
</style>