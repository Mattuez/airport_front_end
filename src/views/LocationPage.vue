<template>
  <div class="location-page">
    <div class="button-container">
      <button class="action-button" @click="showAddLocationModal = true">Cadastrar Localização</button>
      <button class="action-button" @click="listLocations">Verificar Localizações</button>
    </div>

    <GenericForm
        v-if="showAddLocationModal"
        :showModal="showAddLocationModal"
        :fields="locationFields"
        :formData="newLocation"
        :error-message="errorMessage"
        @close="showAddLocationModal = false"
        @submit="addLocation"
    />

    <GenericList
        v-if="locations.length > 0"
        :items="locations"
        :headers="['CEP', 'Cidade', 'Estado']"
        :fieldMap="['cep', 'city', 'state']"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GenericForm from "../components/GenericForm.vue";
import GenericList from "../components/GenericList.vue";

const showAddLocationModal = ref(false);
const newLocation = ref({ cep: '', city: '', state: '' });
const locations = ref([]);
const errorMessage = ref('');

const locationFields = [
  {name: 'cep', label: 'CEP', placeholder: 'CEP'},
  {name: 'city', label: 'Cidade', placeholder: 'Cidade'},
  {name: 'state', label: 'Estado', placeholder: 'Estado'}
];

const addLocation = async (location) => {
  try {
    await axios.post('http://localhost:3000/locations', location);
    await listLocations();
    showAddLocationModal.value = false;
    errorMessage.value = '';
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Erro ao adicionar o voo';
    } else {
      errorMessage.value = 'Erro desconhecido';
    }
  }
};

const listLocations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/locations');
    locations.value = response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

onMounted(() => {
  listLocations();
});
</script>

<style scoped>
.location-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>

