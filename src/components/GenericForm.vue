<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <form @submit.prevent="handleSubmit" class="generic-form">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-for="field in fields" :key="field.name" class="form-group">
          <label :for="field.name">{{ field.label }}</label>
          <template v-if="field.type === 'select'">
            <select
                v-model="formData[field.name]"
                :id="field.name"
                :placeholder="field.placeholder"
                class="form-input"
            >
              <option value="" disabled>{{ field.placeholder }}</option>
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </template>
          <template v-else>
            <input
                v-model="formData[field.name]"
                :id="field.name"
                :type="field.type || 'text'"
                :placeholder="field.placeholder"
                class="form-input"
            />
          </template>
        </div>
        <button type="submit" class="form-button">Submit</button>
        <button @click="closeModal" type="button" class="close-button">Close</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue';

const props = defineProps({
  showModal: Boolean,
  fields: Array,
  formData: Object,
  errorMessage: String
});

const emit = defineEmits(['close', 'submit']);

const closeModal = () => {
  emit('close');
};

const handleSubmit = () => {
  emit('submit', {...props.formData});
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
}

.generic-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}

.form-button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #218838;
}

.close-button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #c82333;
}
</style>
