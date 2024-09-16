<template>
  <div class="list-container">
    <div class="list-header">
      <span v-for="header in headers" :key="header" class="header-item">{{ header }}</span>
      <span class="header-item">Ações</span>
    </div>
    <ul class="list">
      <li v-for="item in items" :key="item.id" class="list-item">
        <span v-for="field in fieldMap" :key="field" class="list-field">
          {{ formatField(item[field], field) }}
        </span>
        <span class="list-field">
          <button @click="editItem(item)" class="edit-button">✏️</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  items: Array,
  headers: Array,
  fieldMap: Array
});

const emit = defineEmits(['edit']);

const formatField = (value, field) => {
  if (field === 'date') {
    return new Date(value).toLocaleString(); // Formata a data
  }
  return value || 'N/A';
};

const editItem = (item) => {
  emit('edit', item); // Emite o item selecionado para edição
};
</script>

<style scoped>
.list-container {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
}

.list-header {
  display: flex;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  font-weight: bold;
}

.header-item {
  flex: 1;
  text-align: center;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-field {
  flex: 1;
  text-align: center;
}

.edit-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}
</style>
