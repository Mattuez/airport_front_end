<template>
  <div class="home">
    <h1>Bem-vindo ao Neoron Airports!</h1>
    <p>Gerencie e visualize informações sobre voos e localizações de maneira fácil e rápida.</p>
    <p>Use o menu acima para navegar entre as páginas de Localizações e Voos .</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 20px;
  text-align: center;
  background-color: #f0f2f5;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.explore-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.explore-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
