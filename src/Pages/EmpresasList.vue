<template>
  <div class="encabezado">
    <h1>Administracion de Empresas</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <div class="empresas-wrapper">
    <div class="opciones">
      <button id="btnAdd" class="btn btn-primary" @click="openModal" style="width: 200px; white-space: nowrap;">
        Agregar Empresas</button>
      <ExportButton :columns="columns" :rows="rows" fileName="Empresas.pdf" class="export-button"/>

      <div class="registros">
        <span> Mostrar
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

      <!--Barra de busqueda-->
      <input class="busqueda" type="text" v-model="searchQuery" placeholder="Buscar empresas...." />
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empresa,index) in paginatedEmpresas" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ empresa.nombre }}</td>
            <td>{{ empresa.ciudad }}</td>
            <td>{{ empresa.telefono }}</td>
            <td>{{ empresa.direccion }}</td>
            <td>{{ empresa.correo }}</td>
            <td>
            <button id="btnEditar" class="btn btn-warning" @click="editEmpresas(index)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button id="btnEliminar" class="btn btn-danger" @click="deleteEmpresa(index)"><b><i
              class="bi bi-x-lg"></i></b></button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>


    <!-- Modal para agregar o editar empresas-->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2 class="h2-modal-content">{{ isEditing ? 'Editar Empresa' : 'Agregar Empresa' }} </h2>

        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="empresaForm.nombre" type="text" required>
        </div>

        <div class="form-group">
          <label>Correo:</label>
          <input v-model="empresaForm.correo" type="text" required>
        </div>

        <div class="form-group">
          <label>Telefono:</label>
          <input v-model="empresaForm.telefono" type="text" required>
        </div>

        <div class="form-group">
          <label>Dirección:</label>
          <input v-model="empresaForm.direccion" type="text" required>
        </div>

        <button id="AddEmpresaModal" class="btn btn-primary" @click="guardarEmpresa">
          {{ isEditing ? 'Guardar Cambios' : 'Agregar Empresa' }}
        </button>
        <button id="BtnCerrar" class="btn btn-secondary" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>

</template>


<script>
import ProfileButton from '../components/ProfileButton.vue';
import ExportButton from '@/components/ExportButton.vue';

export default {
  components: {
    ProfileButton,
    ExportButton,
  },

  data() {
    return {
      searchQuery: '', // Almacena el texto de búsqueda
      itemsPerPage: "", // Valor por defecto para mostrar todos los registros
      isModalOpen: false,
      isEditing: false,
      editIndex: null,
      empresaForm: {
        nombre: '',
        ciudad: '',
        telefono: '',
        direccion: '',
        correo: '',
      },

      empresas: [
        {
          nombre: 'Libreria Coello',
          ciudad: 'San Pedro Sula',
          telefono: '555 57 67',
          direccion: 'calle 27 # 40 - 36',
          correo: 'ejemplocorreo',
        },
        {
          nombre: 'Panaderia y Reposteria Las Espigas',
          ciudad: 'San Pedro Sula',
          telefono: '504 22 33 44',
          direccion: 'avenida 10, zona norte',
          correo: 'norte@empresa.com',
        },

        {
          nombre: 'Ferreteria La Cumbre',
          ciudad: 'La Ceiba',
          telefono: '504 34 12 23',
          direccion: 'avenida 12, zona central',
          correo: 'Lacumbre@empresa.com',
        },

        {
          nombre: 'Textiles EL Caribe',
          ciudad: 'La Ceiba',
          telefono: '504 21 33  56 07',
          direccion: 'Parque Central, 2da avenida',
          correo: 'Lacumbre@empresa.com',
        },

        {
          nombre: 'Carnitas del Pablo',
          ciudad: 'La Ceiba',
          telefono: '504 21 44 60 12',
          direccion: 'Avenida San Isidro, cerca del Muelle Turistico Reynaldo Canales',
          correo: 'Lacumbre@empresa.com',
        },
      ],

      // Define tus columnas para la exportacion a PDF
      columns: [
        { header: '#', datakey: 'index' },
        { header: 'Nombre', datakey: 'nombre' },
        { header: 'Ciudad', datakey: 'ciudad' },
        { header: 'Teléfono', datakey: 'telefono' },
        { header: 'Correo', datakey: 'correo' },
      ],
      rows: [] // Inicialmente vacio, se llena despues
    };
  },

  computed: {
    filteredEmpresas() {
      // Filtra las empresas basados en el texto de busqueda
      return this.empresas.filter(empresa =>
        empresa.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        empresa.ciudad.includes(this.searchQuery)
      );
    },
    paginatedEmpresas() {
      return this.itemsPerPage === "" || this.itemsPerPage === null
        ? this.filteredEmpresas
        : this.filteredEmpresas.slice(0, this.itemsPerPage);
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.isEditing = false;
      this.empresaForm = {
        nombre: '',
        ciudad: '',
        telefono: '',
        direccion: '',
        correo: '',
      };
    },

    guardarEmpresa() {
      if(this.isEditing) {
        Object.assign(this.empresas[this.editIndex], this.empresaForm);
      }else{
        this.empresas.push({ ...this.empresaForm});
      }
      this.closeModal();
    },

    editEmpresas(index) {
      this.isModalOpen = true;
      this.isEditing = true;
      this.editIndex = index;
      this.empresaForm = { ...this.empresas[index] };
    },

    deleteEmpresa(index) {
      this.empresas.splice(index, 1);
    },

    generateRows() {
      // Genera las filas basadas en las empresas paginados
      this.rows = this.paginatedEmpresas.map((sucursal,index) => ({
        index: index + 1,
        nombre: sucursal.nombre,
        ciudad: sucursal.ciudad,
        telefono: sucursal.telefono,
        correo: sucursal.correo,

      }));
      console.log('Failas generadas', this.rows);
    }
  },

  watch: {
    // Cuando cambie la paginación o el filtro, actualiza las filas
    paginatedEmpresas() {
      this.generateRows();
    }
  },
  mounted() {
    // Genera las filas al cargar el componente
    this.generateRows();
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

.h2-modal-content {
  margin-top: 0px;
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


#AddEmpresaModal {
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


</style>
