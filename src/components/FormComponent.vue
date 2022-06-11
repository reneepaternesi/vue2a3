<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <label for="name">Nombre:</label>
      <br />
      <div class="input-wrapper mb-4">
        <input
          id="name"
          name="name"
          type="text"
          v-model="form.name"
          placeholder="Nombre"
          required
          v-bind:class="{
            'is-invalid':
              !validString(form.name) && formValidationState.nameBlured,
            'is-valid': validString(form.name),
          }"
          v-on:blur="formValidationState.nameBlured = true"
        />
        <span class="valid" v-if="validString(form.name)">✅️</span>
        <small class="d-block error" v-if="!validString(form.name)">
          El nombre debe contener al menos 2 caracteres
        </small>
      </div>

      <br />

      <label for="lastName">Apellido:</label>
      <br />
      <div class="input-wrapper mb-4">
        <input
          id="lastName"
          name="lastName"
          type="text"
          v-model="form.lastName"
          placeholder="Apellido"
          required
          v-bind:class="{
            'is-invalid':
              !validString(form.lastName) && formValidationState.lastNameBlured,
            'is-valid': validString(form.lastName),
          }"
          v-on:blur="formValidationState.lastNameBlured = true"
        />
        <span class="valid" v-if="validString(form.lastName)">✅️</span>
        <small class="d-block error" v-if="!validString(form.lastName)">
          El apellido debe contener al menos 2 caracteres</small
        >
      </div>

      <br />

      <label for="email">E-mail:</label>
      <br />
      <div class="input-wrapper mb-4">
        <input
          id="email"
          name="email"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          v-bind:class="{
            'is-invalid': !validEmail() && formValidationState.emailBlured,
            'is-valid': validEmail(),
          }"
          v-on:blur="formValidationState.emailBlured = true"
        />
        <span class="valid" v-if="validEmail()">✅️</span>
        <small class="d-block error" v-if="!validEmail()"
          >El formato de mail no es correcto</small
        >
      </div>

      <br />

      <label for="birthday">Fecha de Nacimiento:</label>
      <br />
      <div class="input-wrapper mb-4">
        <input
          id="birthday"
          name="birthday"
          v-model="form.birthday"
          type="date"
          placeholder="dd / mm / aaaa"
          required
          v-bind:class="{
            'is-invalid':
              !validBirthday() && formValidationState.birthdayBlured,
            'is-valid': validBirthday(),
          }"
          v-on:blur="formValidationState.birthdayBlured = true"
        />
        <span class="valid" v-if="validBirthday()">✅️</span>
        <small class="d-block error" v-if="!validBirthday()">
          La fecha de nacimiento debe ser anterior al día de hoy</small
        >
      </div>

      <br />

      <label for="province">Provincia:</label>
      <br />
      <div class="input-wrapper mb-4">
        <select id="province" name="province" v-model="form.province" required>
          <option v-for="(province, i) in provinces" :key="i">
            {{ province }}
          </option>
        </select>
      </div>

      <br />

      <label for="phone">Teléfono:</label>
      <br />
      <div class="input-wrapper mb-4">
        <input
          id="phone"
          name="phone"
          v-model="form.phone"
          type="tel"
          placeholder="Teléfono"
          v-bind:class="{
            'is-invalid': !validatePhone() && formValidationState.phoneBlured,
            'is-valid': validatePhone(),
          }"
          v-on:blur="formValidationState.phoneBlured = true"
        />
        <span class="valid" v-if="validatePhone()">✅️</span>
        <small class="d-block error" v-if="!validatePhone()">
          El formato de teléfono no es correcto</small
        >
      </div>

      <button
        class="btn btn-primary mt-2"
        type="submit"
        :disabled="!validateForm()"
      >
        Agregar Usuario
      </button>
    </form>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { reactive } from "vue";

const emit = defineEmits(["add-user"]);

const form = reactive({
  name: "",
  lastName: "",
  email: "",
  birthday: "",
  province: null,
  phone: "",
});

const provinces = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán",
];

const formValidationState = reactive({
  nameBlured: false,
  lastNameBlured: false,
  emailBlured: false,
  birthdayBlured: false,
  phoneBlured: false,
});

const onSubmit = () => {
  emit("add-user", form);
  resetForm();
};

const resetForm = () => {
  form.name = "";
  formValidationState.nameBlured = false;
  form.lastName = "";
  formValidationState.lastNameBlured = false;
  form.email = "";
  formValidationState.emailBlured = false;
  form.birthday = "";
  formValidationState.birthdayBlured = false;
  form.province = null;
  form.phone = "";
  formValidationState.phoneBlured = false;
};

const validString = (text) => {
  return text.length >= 2;
};

const validEmail = () => {
  var re = /(.+)@(.+){2,}\.(.+){2,}/;
  return re.test(form.email.toLowerCase());
};

const validBirthday = () => {
  return form.birthday && new Date(form.birthday) < new Date();
};

const validatePhone = () => {
  var re =
    /^((?:\(?\d{3}\)?[- .]?\d{4}|\(?\d{4}\)?[- .]?\d{3}|\(?\d{5}\)?[- .]?\d{2})[- .]?\d{4})$/;
  return !form.phone || re.test(form.phone);
};

const validateForm = () => {
  return (
    validString(form.name) &&
    validString(form.lastName) &&
    validEmail() &&
    validBirthday() &&
    validatePhone()
  );
};
</script>

<style scopes lang="less">
.form-container {
  border: 2px solid grey;
  border-radius: 8px;
  padding: 40px 10px;
  .col {
    padding: 20px 100px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input.is-valid {
    border-color: green;
  }

  input.is-invalid {
    border-color: red;
  }

  small {
    color: red;
  }
}
</style>
