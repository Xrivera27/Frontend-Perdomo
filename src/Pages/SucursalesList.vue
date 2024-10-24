<template>
   <div class="encabezado">
    <h1>Administracion Sucursales</h1>
    <ProfileButton :companyName="'Perdomo y Asociados'" :role="'Gerente'" />
  </div>
  <hr>

  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, cupiditate a impedit iste consequuntur commodi quibusdam suscipit optio doloribus illo quod est? Facere modi natus sed veritatis unde placeat suscipit?</p>

</template>


<script>
import ProfileButton from '../components/ProfileButton.vue';

export default{
  components: {
    ProfileButton,
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

h1{
  color: #d6b602;
}
</style>
