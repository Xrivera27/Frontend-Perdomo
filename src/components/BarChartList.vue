<template>
  <div class="dashboard-container">
    <div class="cards-container">

      <div class="card" v-for="(item, index) in cards" :key="index">
        <div class="card-content">

          <div class="value-content">
            <h3>{{ item.title }}</h3>
            <i :class="item.icon" class="card-icon"></i>
            <p class="item-value">{{ item.value }}</p>
          </div>
        </div>
        <a href="item.link" class="card-link">Ver más</a>
      </div>
    </div>

    <div class="graphics-container">
      <!--Graficos de linea y de Pie-->
      <div class="charts-container">
        <div class="line-chart">
          
        </div>
        <div class="pie-chart">

        </div>
      </div>
    </div>

    <table class="sales-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in empresas" :key="index">
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.ciudad }}</td>
          <td>{{ empresa.telefono }}</td>
          <td>{{ empresa.direccion }}</td>
          <td>{{ empresa.correo }}</td>
          <td><a href="#">Ver más</a><span>|</span><button style="font-size: 1rem;">Descargar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Line, Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, ArcElement, CategoryScale, LinearScale);


export default defineComponent({
  components: {
    LineChart: Line,
    PieChart: Pie,
  },
  data() {
    return {
      cards: [
        { title: "Empresas", value: "18", icon: "bi bi-cash", link: "/empresas" },
        { title: "Usuarios", value: "16", icon: "bi bi-people", link: "/usuarios" },
      ],

      lineChartData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
          {
            label: 'Empresas',
            borderColor: '#FF6384',
            data: [1, 3, 4, 8, 2],
            fill: false,
          }
        ],
      },

      lineChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        maintainAspectRatio: false,
      },

      pieChartData: {
        labels: ['Gerentes', 'Cajero', 'Administrador'],
        datasets: [
          {
            data: [9, 12, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }
        ],
      },

      pieChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        maintainAspectRatio: false,
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
      ],
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

/* Estilo para las tarjetas informativas */

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.graphics-container {
  padding: 0 5%;
}

.card {
  background-color: #f7f7f7;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}


.card-icon {
  margin-top: 3rem;
  font-size: 1.75rem;
  color: #333;
}

.item-value {
  display: inline;
  padding: 10px;
}

.card h3 {
  font-size: 1.25rem;
  color: #333;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card-link {
  display: block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

/* Estilo para los gráficos más pequeños */
.charts-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.line-chart,
.pie-chart {
  width: 100%;
  height: 300px;
}

/* Estilo para la tabla de ventas */
.sales-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

.sales-table th,
.sales-table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.sales-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.sales-table td {
  text-align: center;
}

.sales-table a,
.sales-table button {
  margin-right: 10px;
  text-decoration: none;
  color: #007bff;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>