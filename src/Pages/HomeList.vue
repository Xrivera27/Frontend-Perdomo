
<template>
  <div class = "encabezado">
    <h1>Bienvenido , Perdomo</h1>
    <ProfileButton :companyName = "'Perdomo y Asociados'" :role="'Gerente'"/>
  </div>
  <hr>


</template>

<script>
  import BarChart from '../components/BarChartList.vue';
  import ProfileButton from '../components/ProfileButton.vue';

  export default {
    components: {
      ProfileButton,
      BarChart,
    },
    data() {
      return {
        role: Number(localStorage.getItem('role')) || 0
      };
    }
  }
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

.dashboard {
  padding: 20px;
}

.box {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
}

.box-header h3 {
  margin: 0;
}

h1 {
  color: #d6b602;
}

h3 {
  color: #333;
}

.container-top {
  width: 100%;
  text-align: right;
}

#campana {
  margin-right: 10px;
  font-size: 18px;
  color: #a38655;
}

.rol {
  color: #969696;
  font-size: 14px;
}

.navigate-button {
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.navigate-button:hover {
  background-color: #0056b3;
}

</style>
