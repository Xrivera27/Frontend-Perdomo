<template>
  <div class="dashboard-container">
    <!-- Tarjetas informativas con iconos de Bootstrap y enlaces "Ver más" -->
    <div class="cards-container">

      <div class="card" v-for="(item, index) in cards" :key="index">
        <div class="card-content">

          <div class="value-content">

            <h3 {{ item.title }}></h3>
            <i :class="item.icon" class="card-icon"></i>
            <p class="item-value">{{ item.value }}</p>
          </div>
        </div>
        <a :href="item.link" class="card-link">Ver más</a>
      </div>

    </div>
    <div class="graphics-container">
      <!-- Gráficos -->
      <div class="charts-container">
        <div class="line-chart">
          <LineChart :chart-data="lineChartData" :options="lineChartOptions" />
        </div>
        <div class="pie-chart">
          <PieChart :chart-data="pieChartData" :options="pieChartOptions" />
        </div>
      </div>
    </div>

    <!-- Tabla de últimas sucursales registradas -->
    <table class="sales-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sale, index) in sales" :key="index">
          <td>{{ sale.nombre }}</td>
          <td>{{ sale.descripcion }}</td>
          <td><a href="#">Ver más</a><span>|</span> <button style="font-size: 1rem;">Descargar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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

export default {
  name: "BarChartList",
  components: {
    LineChart: Line,
    PieChart: Pie,
  },
  data() {
    return {
      // Datos para las tarjetas con iconos y enlaces
      cards: [
        { title: "Categorias Empresas", value: "3", icon: "bi bi-shop-window", link: "/categorias-empresas" },
        { title: "Usuarios", value: "21", icon: "bi bi-person-fill", link: "/usuarios" },
      ],

      //Datos para el grafico de lineas (Usuarios por mes)
      lineChartData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
          {
            labels: 'Usuarios por mes',
            borderColor: '#FF6384',
            data: [1, 2, 4, 5, 8],
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
      },

      //Datos para el grafico de pastel (Tipos de Usuarios)
      pieChartData: {
        labels: ['Cajero', 'Administrador', 'Gerente'],
        datasets: [
          {
            data: [21, 7, 3],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
      //Datos para la tabla de Categorias Empresas recientemente registrados
      sales: [
        { nombre: 'CategoriaEmpresa #1', descripcion: 'descripcion #1' },
        { nombre: 'CategoriaEmpresa #2', descripcion: 'descripcion #2' },
        { nombre: 'CategoriaEmpresa #3', descripcion: 'descripcion #3' },
      ],
    };
  },
};
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
  width: 30%;
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