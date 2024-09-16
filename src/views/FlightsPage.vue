<template>
  <div class="flight-page">
    <div class="button-container">
      <button class="action-button" @click="openAddFlightModal">Cadastrar Flight</button>
      <button class="action-button" @click="listFlights">Verificar Flights</button>
    </div>

    <GenericForm
        v-if="showAddFlightModal"
        :showModal="showAddFlightModal"
        :fields="flightFields"
        :formData="newFlight"
        :errorMessage="errorMessage"
        @close="closeFlightModal"
        @submit="handleSubmitFlight"
    />

    <GenericList
        v-if="flights.length > 0"
        :items="flights"
        :headers="['Origem', 'Destino', 'Data']"
        :fieldMap="['source', 'destiny', 'date']"
        @edit="editFlight"
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
let isEditing = ref(false);
let editingFlightId = ref(null);

const flightFields = [
  { name: 'sourceId', label: 'Origem', placeholder: 'Selecione a origem', type: 'select', options: [] },
  { name: 'destinyId', label: 'Destino', placeholder: 'Selecione o destino', type: 'select', options: [] },
  { name: 'date', label: 'Data', placeholder: 'Data', type: 'date' },
  { name: 'time', label: 'Hora', placeholder: 'Hora', type: 'time' }
];

// Abre o modal de cadastro de voo, resetando o formulário
const openAddFlightModal = () => {
  newFlight.value = { sourceId: '', destinyId: '', date: '', time: '' }; // Reseta o formulário
  isEditing.value = false;
  showAddFlightModal.value = true;
};

// Função para editar um voo
const editFlight = (flight) => {
  newFlight.value = {
    sourceId: flight.source_id,
    destinyId: flight.destiny_id,
    date: flight.date.split('T')[0],
    time: flight.date.split('T')[1]
  };
  editingFlightId.value = flight.id;
  isEditing.value = true;
  showAddFlightModal.value = true; // Certifique-se de que o modal é aberto
};

// Função que lida com a submissão do formulário, diferenciando entre adicionar ou editar voo
const handleSubmitFlight = () => {
  const { date, time } = newFlight.value;
  const dateTime = `${date}T${time}`;

  const flightData = {
    ...newFlight.value,
    date: dateTime,
    sourceId: newFlight.value.sourceId,
    destinyId: newFlight.value.destinyId
  };

  if (isEditing.value) {
    updateFlight(flightData);
  } else {
    addFlight(flightData);
  }
};

// Função para adicionar um voo
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
    errorMessage.value = error.response?.data?.message || 'Erro ao adicionar o voo';
  }
};

// Função para atualizar um voo
const updateFlight = async (flight) => {
  try {
    await axios.put(`http://localhost:3000/flights/${editingFlightId.value}`, flight);
    await listFlights();
    showAddFlightModal.value = false;
    errorMessage.value = ''; // Limpar mensagem de erro
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Erro ao atualizar o voo';
  }
};

// Função para listar os voos
const listFlights = async () => {
  try {
    const response = await axios.get('http://localhost:3000/flights');
    flights.value = response.data.map(flight => ({
      id: flight.id, // Adicionando o ID necessário para edição
      source: `${flight.source.city} - ${flight.source.state} (${flight.source.cep})`,
      destiny: `${flight.destiny.city} - ${flight.destiny.state} (${flight.destiny.cep})`,
      date: flight.date
    }));
  } catch (error) {
    console.error('Error fetching flights:', error);
  }
};

// Carrega as opções de origem e destino
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

// Fecha o modal de voo
const closeFlightModal = () => {
  showAddFlightModal.value = false;
  errorMessage.value = '';
};

// Monta o componente, carregando as localizações e os voos
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
