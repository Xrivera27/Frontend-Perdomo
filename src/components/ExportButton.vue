<template>
    <div class="export-button">
        <button @click="toggleDropdown" class="dropdown-toggle">
            <i class="bi bi-printer-fill"></i><!-- Icono de impresora -->
            Exportar
            <i class="bi bi-chevron-down"></i><!-- Flecha hacia abajo -->
        </button>
        <div v-if="isDropdownOpen" class="dropdown-menu">
            <button @click="exportData('pdf')">
                <i class="bi bi-file-earmark-pdf-fill"></i> <!-- Icono de PDF -->
                Exportar a PDF
            </button>
            <button @click="exportData('xlsx')">
                <i class="bi bi-file-earmark-excel-fill"></i> <!-- Icono de XLSX -->
                Exportar a XLSX
            </button>
        </div>
    </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default {
    props: {
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        fileName: {
            type: String,
            default: 'export',
        }
    },
    data() {
        return {
            isDropdownOpen: false,
        }
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        exportData(type) {
            if (type === 'pdf') {
                this.exportPDF();
            } else if (type === 'xlsx') {
                this.exportXLSX();
            }
            this.isDropdownOpen = false; // Cerrar el dropdown después de la exportación
        },

        exportPDF() {
            const doc = new jsPDF();

            doc.autoTable({
                head: [this.columns.map(col => col.header)],
                body: this.rows.map(row => this.columns.map(col => row[col.datakey] || ''))
            });

            doc.save(`${this.fileName}.pdf`);
        },
        exportXLSX() {
            // Crear el encabezado con los nombres personalizados
            const header = this.columns.map(col => col.header);

            // Mapear los datos de las filas
            const data = this.rows.map(row =>
                this.columns.map(col => row[col.datakey] !== undefined ? row[col.datakey] : '')
            );

            // Convertir los datos en formato compatible con XLSX
            const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, `${this.fileName}.xlsx`);
        }
    }
};

</script>

<style scoped>
.export-button {
    position: relative;
    display: inline-block;
}

.dropdown-toggle {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

.dropdown-toggle i {
    margin-right: 10px;
    /* Espacio entre el icono y el texto */
}

.dropdown-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    box-shadow: 0px 9px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    margin-top: 5px;
    border-radius: 10px;
}

.dropdown-menu button {
    background-color: white;
    color: #4CAF50;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;

}

.dropdown-menu button i {
    margin-right: 10px;
    /* Espacio entre el icono y el texto */
}

.dropdown-menu button:hover {
    background-color: #f1f1f1;
}

.bi-chevron-down {
    margin-left: 10px;
}
</style>