<template>
  <div class="encabezado">
    <h1>Administración de Empresas</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <div class="empresas-wrapper">
    <div class="opciones">
      <ExportButton :columns="columns" :rows="rows" fileName="Empresas.pdf" class="export-button"/>
      <input class="busqueda" type="text" v-model="searchQuery" placeholder="Buscar empresas...." />
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="loading-container">
      <span>Cargando empresas...</span>
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
            <th>Nombre</th>
            <th>RTN</th>
            <th>Categoria de Empresa</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empresa, index) in paginatedEmpresas" :key="empresa.id_empresa">
            <td>{{ ((currentPage - 1) * pageSize) + index + 1 }}</td>
            <td>{{ empresa.nombre }}</td>
            <td>{{ empresa.rtn }}</td>
            <td>{{ empresa.categoria_empresa?.categoria }}</td>
            <td>{{ empresa.telefono_principal }}</td>
            <td>{{ empresa.direccion }}</td>
            <td>{{ empresa.correo_principal }}</td>
            <td>
              <button id="btnEliminar" class="btn btn-danger" @click="showDeleteConfirm(empresa.id_empresa)">
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="pagination-wrapper">
        <div class="pagination-info">
          Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, filteredEmpresas.length) }} de {{ filteredEmpresas.length }} registros
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

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Confirmar Desactivación</h2>
        <p>¿Está seguro que desea desactivar esta empresa?</p>
        <button class="btn btn-danger" @click="deleteEmpresa">Desactivar</button>
        <button class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton.vue';
import ExportButton from '@/components/ExportButton.vue';
import empresaService from '../../services/Solicitudes';

export default {
  name: 'EmpresasView',
  
  components: {
    ProfileButton,
    ExportButton,
  },

  data() {
    return {
      searchQuery: '',
      loading: true,
      error: null,
      empresas: [],
      currentPage: 1,
      pageSize: 10,
      showDeleteModal: false,
      selectedEmpresaId: null,
      columns: [
        { header: '#', datakey: 'index' },
        { header: 'Nombre', datakey: 'nombre' },
        { header: 'RTN', datakey: 'rtn' },
        { header: 'Teléfono', datakey: 'telefono_principal' },
        { header: 'Correo', datakey: 'correo_principal' },
      ],
      rows: []
    };
  },

  computed: {
    filteredEmpresas() {
      return this.empresas.filter(empresa => {
        const searchTerm = this.searchQuery.toLowerCase();
        return empresa.nombre.toLowerCase().includes(searchTerm) ||
               empresa.rtn.toLowerCase().includes(searchTerm) ||
               empresa.correo_principal.toLowerCase().includes(searchTerm);
      });
    },
    
    paginatedEmpresas() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredEmpresas.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.filteredEmpresas.length / this.pageSize);
    }
  },

  methods: {
    async fetchEmpresas() {
      try {
        this.loading = true;
        this.error = null;
        this.empresas = await empresaService.fetchEmpresas();
        this.generateRows();
      } catch (error) {
        this.error = 'Error al cargar las empresas: ' + error.message;
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    showDeleteConfirm(id) {
      this.selectedEmpresaId = id;
      this.showDeleteModal = true;
    },

    async deleteEmpresa() {
      try {
        await empresaService.deleteEmpresa(this.selectedEmpresaId);
        await this.fetchEmpresas();
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error al desactivar empresa:', error);
      }
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedEmpresaId = null;
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
      this.rows = this.paginatedEmpresas.map((empresa, index) => ({
        index: ((this.currentPage - 1) * this.pageSize) + index + 1,
        nombre: empresa.nombre,
        rtn: empresa.rtn,
        telefono_principal: empresa.telefono_principal,
        correo_principal: empresa.correo_principal,
      }));
    }
  },

  watch: {
    paginatedEmpresas() {
      this.generateRows();
    },
    searchQuery() {
      this.currentPage = 1;
    }
  },

  mounted() {
    this.fetchEmpresas();
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
}

.encabezado h1 {
  color: #d6b602;
}

.opciones {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loading-container, .error-container {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
}

.error-container {
  color: #dc3545;
}

.busqueda {
  float: right;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border-width: 0.5px;
}

.registros {
  height: 100%;
  padding-bottom: 1%;
}

.export-button {
  margin: 0;
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

.empresas-wrapper {
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
  text-align: center;
}

.table thead th {
  background-color: none;
  border-bottom: 1px solid #ddd;
}

.table tbody td {
  border-top: 1px solid #ddd;
}

/* Estilos del Modal */
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
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

/* Responsive Design */
@media screen and (max-width: 768px) {
  .encabezado {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .opciones {
    flex-direction: column;
    gap: 1rem;
  }

  .busqueda {
    width: 100%;
    max-width: none;
  }

  .table-container {
    overflow-x: auto;
  }

  .pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .pagination-container {
    justify-content: center;
    width: 100%;
  }

  .pagination-button {
    min-width: 80px;
  }

  .modal-content {
    margin: 10px;
    max-height: 90vh;
    overflow-y: auto;
  }
}

@media screen and (max-width: 480px) {
  .encabezado h1 {
    font-size: 1.5rem;
  }

  .table th,
  .table td {
    padding: 6px;
    font-size: 14px;
  }

  #btnEliminar {
    width: 40px;
    height: 35px;
    font-size: 16px;
  }

  .pagination-button {
    padding: 6px 12px;
    font-size: 12px;
    min-width: 70px;
  }
}
</style>