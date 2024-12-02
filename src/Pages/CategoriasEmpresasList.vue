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

      <ExportButton :columns="columns" :rows="rows" fileName="Categorias.pdf" class="export-button"/>

      <div class="search-bar">
        <input class="busqueda" type="text" v-model="searchQuery" placeholder="Buscar categoria..." />
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="loading-container">
      <span>Cargando categorías...</span>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="error-container">
      <span>{{ error }}</span>
    </div>

    <div v-else class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Categoria</th>
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
              <button id="btnEditar" class="btn btn-warning" @click="editCategoria(categoria)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button id="btnEliminar" class="btn btn-danger" @click="showDeleteConfirm(categoria.id_categoria)">
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
      <div class="pagination-wrapper">
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

    <!-- Modal para agregar y editar categorias -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2 class="h2-modal-content">{{ isEditing ? 'Editar Categoria' : 'Agregar Categoria' }}</h2>
        
        <form @submit.prevent="guardarCategoria">
          <div class="form-group">
            <label>Categoria:</label>
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

          <button type="submit" id="AddCategoriaModal" class="btn btn-primary">
            {{ isEditing ? 'Guardar cambios' : 'Agregar Categoria' }}
          </button>
          <button type="button" id="BtnCerrar" class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Está seguro que desea eliminar esta categoría?</p>
        <button class="btn btn-danger" @click="deleteCategoria">Eliminar</button>
        <button class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton.vue';
import ExportButton from '@/components/ExportButton.vue';
import solicitudes from '../../services/Solicitudes';

export default {
  name: 'CategoriaEmpresa',
  
  components: {
    ProfileButton,
    ExportButton,
  },

  data() {
    return {
      searchQuery: '',
      loading: true,
      error: null,
      categorias: [],
      currentPage: 1,
      pageSize: 10,
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      selectedCategoriaId: null,
      categoriaForm: {
        categoria: '',
        descripcion: '',
      },
      columns: [
        { header: '#', datakey: 'index' },
        { header: 'Categoria', datakey: 'categoria' },
        { header: 'Descripción', datakey: 'descripcion' },
      ],
      rows: []
    };
  },

  computed: {
    filteredCategorias() {
      return this.categorias.filter(categoria => {
        const searchTerm = this.searchQuery.toLowerCase();
        return categoria.categoria.toLowerCase().includes(searchTerm) ||
               categoria.descripcion.toLowerCase().includes(searchTerm);
      });
    },
    
    paginatedCategorias() {
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
        this.loading = true;
        this.error = null;
        this.categorias = await solicitudes.fetchCategorias();
        this.generateRows();
      } catch (error) {
        this.error = 'Error al cargar las categorías: ' + error.message;
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    editCategoria(categoria) {
      this.categoriaForm = {
        categoria: categoria.categoria,
        descripcion: categoria.descripcion,
      };
      this.selectedCategoriaId = categoria.id_categoria;
      this.isEditing = true;
      this.showModal = true;
    },

    async guardarCategoria() {
      try {
        if (this.isEditing) {
          await solicitudes.actualizarCategoria(this.selectedCategoriaId, this.categoriaForm);
        } else {
          await solicitudes.crearCategoria(this.categoriaForm);
        }
        await this.fetchCategorias();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar categoría:', error);
      }
    },

    showDeleteConfirm(id) {
      this.selectedCategoriaId = id;
      this.showDeleteModal = true;
    },

    async deleteCategoria() {
      try {
        await solicitudes.eliminarCategoria(this.selectedCategoriaId);
        await this.fetchCategorias();
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    },

    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.selectedCategoriaId = null;
      this.categoriaForm = {
        categoria: '',
        descripcion: '',
      };
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedCategoriaId = null;
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
    },

    generateRows() {
      this.rows = this.paginatedCategorias.map((categoria, index) => ({
        index: ((this.currentPage - 1) * this.pageSize) + index + 1,
        categoria: categoria.categoria,
        descripcion: categoria.descripcion,
      }));
    }
  },

  watch: {
    paginatedCategorias() {
      this.generateRows();
    },
    searchQuery() {
      this.currentPage = 1;
    }
  },

  mounted() {
    this.fetchCategorias();
  }
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
.pagination-button {
    padding: 6px 12px;
    font-size: 12px;
    min-width: 70px;
  }


  .pagination-container {
    justify-content: center;
    width: 100%;
  }

  .pagination-button {
    min-width: 80px;
  }

  /* Estilos para la paginación */
.loading-indicator,
.no-data {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
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
</style>