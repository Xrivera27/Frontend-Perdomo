<template>
    <div>
        <div class="btn-config-container">
            <button class="btn-config" @click="openModal">
                <i id="campana" class="bi bi-bell-fill"></i> {{ companyName }}
                <br>
                <span class="rol">{{ role }}</span>
            </button>
        </div>

        <!--Modal-->
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h2>Configuracion del Perfil</h2>
                <form @submit.prevent="saveSettings">
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" name="email" v-model="settings.email">
                    </div>
                    <div>
                        <label for="phone">Teléfono:</label>
                        <input type="tel" name="phone" v-model="settings.phone">
                    </div>
                    <div>
                        <label for="address">Dirección</label>
                        <input type="text" name="address" v-model="settings.address">
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" v-model="settings.password">
                    </div>
                    <div>
                        <button type="submit">Guardar</button>
                        <button type="button" @click="closeModal">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        companyName: {
            type : String,
            default: 'Perdomo y Asociados',        
        },

        role: {
            type: String,
            default: 'Gerente'
        },
    },

    data() {
        return {
            isModalOpen: false,
            settings: {
                email: '',
                phone: '',
                address: '',
                password: '',
            },
        };
    },

     methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },

        saveSettings() {
            console.log('Configuracion guardada:', this.settings);
            this.closeModal();
        }
     }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
    font-family: 'Montserrat', sans-serif;
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

/* Estilos para el contenedor del botón de configuración */
.btn-config-container {
    display: flex;
    justify-content: flex-end;
}

/* Estilos para el botón de configuración */
.btn-config {
    background-color: #f8f8f8;
    border: none;
    padding: 10px 20px;
    text-align: left;
    width: auto;
    max-width: 300px;
    cursor: pointer;
    font-size: 18px;
    color: #a38655;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: block;

}

.btn-config{
    white-space: nowrap;
}

/* Efecto al pasar el mouse por encima */
.btn-config:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Estilos para el modal */
.modal-overlay {
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
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    position: relative;
}

.modal-content h2 {
    margin-top: 0;
    font-size: 1.5rem;
}

.modal-content form {
    display: flex;
    flex-direction: column;
}

.modal-content form div {
    margin-bottom: 1rem;
}

.modal-content label {
    display: block;
    margin-bottom: 0.5rem;
}

.modal-content input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-content button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
    margin-right: 1rem;
}

.modal-content button[type="button"] {
    background-color: #6c757d;
}

.modal-content button:hover {
    background-color: #0056b3;
}

.modal-content button[type="button"]:hover {
    background-color: #5a6268;
}
</style>