<template>
    <div class="dashboard-container">
        <!-- Tarjetas informativas con iconos de Bootstrap y enlaces "Ver más" -->
         <div class="cards-container">

            <div class="card" v-for="(item,index) in cards" :key="index">
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
                    <LineChart :chart-data="lineChartData" :options="lineChartOptions"/>
                </div>
                <div class="pie-chart">
                    <PieChart :chart-data="pieChartData" :options="pieChartOptions"/>
                </div>
             </div>
       </div>  

       <!-- Tabla de últimas sucursales registradas -->
       <table class="sales-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sale,index) in sales" :key="index">
                    <td>{{ sale.nombre }}</td>
                    <td>{{ sale.ciudad }}</td>
                    <td>{{ sale.telefono }}</td>
                    <td>{{ sale.direccion }}</td>
                    <td>{{ sale.correo }}</td>
                    <td><a href="#">Ver más</a><span>|</span> <button style="font-size: 1rem;">Descargar</button></td>
                </tr>
            </tbody>
       </table>
    </div>
</template>

<script>
import {Line, Pie} from 'vue-chartjs';
import{
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
    components: {
        LineChart: Line,
        PieChart: Pie,
    },
    data() {
        return {
            // Datos para las tarjetas con iconos y enlaces
            cards: [
               {title: "Sucursales", value: "7", icon: "bi bi-shop-window", link:"/sucursales"}, 
               {title: "Usuarios", value: "21", icon: "bi bi-person-fill", link:"/usuarios"},
            ],

            //Datos para el grafico de lineas (Sucursales por mes)
            lineChartData: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
                datasets: [
                    {
                      labels: 'Sucursales',
                      borderColor: '#FF6384',
                      data: [1,2,4,5,7],
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
            //Datos para la tabla de Sucursales recientemente registrados
            sales: [
            {
              nombre: 'Sucursal principal',
              ciudad: 'La Ceiba',
              telefono: '555 57 67',
              direccion: 'calle 27 # 40 - 36',
              correo: 'ejemplocorreo',
            },
            {
              nombre: 'Sucursal norte',
              ciudad: 'San Pedro Sula',
              telefono: '504 22 33 44',
              direccion: 'avenida 10, zona norte',
              correo: 'norte@empresa.com',
            },
            {
              nombre: 'Sucursal sur',
              ciudad: 'Tegucigalpa',
              telefono: '504 33 44 55',
              direccion: 'avenida 5, barrio centro',
              correo: 'sur@empresa.com',
            },
            {
              nombre: 'Sucursal este',
              ciudad: 'Choluteca',
              telefono: '504 11 22 33',
              direccion: 'calle 12, zona este',
              correo: 'este@empresa.com',
            },
            {
              nombre: 'Sucursal oeste',
              ciudad: 'Comayagua',
              telefono: '504 77 88 99',
              direccion: 'carrera 4, barrio oeste',
              correo: 'oeste@empresa.com',
            },
            {
              nombre: 'Sucursal central',
              ciudad: 'La Esperanza',
              telefono: '504 44 55 66',
              direccion: 'plaza principal, zona centro',
              correo: 'central@empresa.com',
            } 
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

.graphics-container{
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