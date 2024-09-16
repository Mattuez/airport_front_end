<template>
  <header class="header">
    <nav>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/locations">Localizações</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/airports">Voos</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
}

.nav-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0 15px;
}

.nav-item a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>
