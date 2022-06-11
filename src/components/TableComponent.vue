<template>
  <div class="table-container">
    <table class="table table-dark table-striped table-bordered">
      <thead>
        <tr>
          <th v-for="(title, i) in titles" :key="i">{{ title }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.birthday }}</td>
          <td>{{ user.province }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  users: { type: Array, required: true },
});

const titles = [
  "Nombre",
  "Apellido",
  "Email",
  "Fecha de Nacimiento",
  "Provincia",
  "Teléfono",
];
</script>

<style scopes lag="less">
.table-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
