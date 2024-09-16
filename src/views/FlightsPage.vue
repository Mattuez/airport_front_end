<template>
  <div class="flight-page">
    <div class="button-container">
      <button class="action-button" @click="showAddFlightModal = true">Cadastrar Flight</button>
      <button class="action-button" @click="listFlights">Verificar Flights</button>
    </div>

    <GenericForm
        v-if="showAddFlightModal"
        :showModal="showAddFlightModal"
        :fields="flightFields"
        :formData="newFlight"
        :errorMessage="errorMessage"
        @close="showAddFlightModal = false"
        @submit="handleAddFlight"
    />

    <GenericList
        v-if="flights.length > 0"
        :items="flights"
        :headers="['Origem', 'Destino', 'Data']"
        :fieldMap="['source', 'destiny', 'date']"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GenericForm from "../components/GenericForm.vue";
import GenericList from "../components/GenericList.vue";

const showAddFlightModal = ref(false);
const newFlight = ref({ sourceId: '', destinyId: '', date: '', time: '' });
const flights = ref([]);
const errorMessage = ref('');

const flightFields = [
  { name: 'sourceId', label: 'Origem', placeholder: 'Selecione a origem', type: 'select', options: [] },
  { name: 'destinyId', label: 'Destino', placeholder: 'Selecione o destino', type: 'select', options: [] },
  { name: 'date', label: 'Data', placeholder: 'Data', type: 'date' },
  { name: 'time', label: 'Hora', placeholder: 'Hora', type: 'time' }
];

const handleAddFlight = () => {
  const { date, time } = newFlight.value;
  const dateTime = `${date}T${time}`;

  const flightData = {
    ...newFlight.value,
    date: dateTime,
    sourceId: newFlight.value.sourceId,
    destinyId: newFlight.value.destinyId
  };

  addFlight(flightData);
};

const addFlight = async (flight) => {
  try {
    await axios.post('http://localhost:3000/flights', {
      date: flight.date,
      source_id: flight.sourceId,
      destiny_id: flight.destinyId
    });
    await listFlights();
    showAddFlightModal.value = false;
    errorMessage.value = ''; // Limpar mensagem de erro
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Erro ao adicionar o voo';
    } else {
      errorMessage.value = 'Erro desconhecido';
    }
  }
};

const listFlights = async () => {
  try {
    const response = await axios.get('http://localhost:3000/flights');
    flights.value = response.data.map(flight => ({
      source: `${flight.source.city} - ${flight.source.state} (${flight.source.cep})`,
      destiny: `${flight.destiny.city} - ${flight.destiny.state} (${flight.destiny.cep})`,
      date: flight.date
    }));
  } catch (error) {
    console.error('Error fetching flights:', error);
  }
};

const fetchLocations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/locations');
    const locations = response.data;
    flightFields.forEach(field => {
      if (field.type === 'select') {
        field.options = locations.map(location => ({
          value: location.id,
          label: `${location.city} - ${location.state} (${location.cep})`
        }));
      }
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

onMounted(() => {
  fetchLocations();
  listFlights();
});
</script>



<style scoped>
.flight-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
