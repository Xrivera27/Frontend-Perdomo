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
        <a :href="item.link" class="card-link">Ver más</a>
      </div>
    </div>

    <table class="sales-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre Empresa</th>
          <th>RTN</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>Nombre de CEO</th>
          <th>Correo CEO</th>
          <th>Telefono CEO</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in empresas" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.rtn }}</td>
          <td>{{ empresa.telefono }}</td>
          <td>{{ empresa.correo }}</td>
          <td>{{ empresa.nombreCEO }}</td>
          <td>{{ empresa.correoCEO }}</td>
          <td>{{ empresa.telefonoCEO }}</td>
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
        { title: "Empresas", value: "5", icon: "bi bi-bank", link: "/empresas" },
        { title: "Usuarios", value: "6", icon: "bi bi-people", link: "/usuarios" },
        { title: "Sucursales", value: "5", icon: "bi bi-shop-window", link: "/usuarios" },
        { title: "Categorias Empresariales" , value: "3", icon: "bi bi-building", link: "/categorias_empresas"},
      ],
      
      // Datos para el gráfico de linea 
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
      
      // Datos para el gráfico de pastel
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
          rtn: '05678901234',
          telefono: '555 57 67',
          correo: 'ejemplocorreo',
          nombreCEO: 'Lenny Coello',
          correoCEO: 'lennyCoello@gmail.com',
          telefonoCEO: '99674211',
        },
        {
          nombre: 'Panaderia y Reposteria Las Espigas',
          rtn: '01345566239',
          telefono: '504 22 33 44',
          correo: 'norte@empresa.com',
          nombreCEO: 'Mildred Montana',
          correoCEO: 'MontanaMildred@gmail.com',
          telefonoCEO: '99086750',
        },

        {
          nombre: 'Ferreteria La Cumbre',
          rtn: '02431133567',
          telefono: '504 34 12 23',
          direccion: 'avenida 12, zona central',
          correo: 'Lacumbre@empresa.com',
          nombreCEO: 'Juan Molina',
          correoCEO: 'JuanMolina@gmail.com',
          telefonoCEO: '99567834',
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