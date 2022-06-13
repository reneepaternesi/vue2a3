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
            'is-invalid': !formValidationState.nameValid,
            'is-valid': formValidationState.nameValid,
          }"
          v-on:blur="formValidationState.nameValid = validString(form.name)"
        />
        <small class="d-block error" v-if="!formValidationState.nameValid">
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
            'is-invalid': !formValidationState.lastNameValid,
            'is-valid': formValidationState.lastNameValid,
          }"
          v-on:blur="
            formValidationState.lastNameValid = validString(form.lastName)
          "
        />
        <small class="d-block error" v-if="!formValidationState.lastNameValid">
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
            'is-invalid': !formValidationState.emailValid,
            'is-valid': formValidationState.emailValid,
          }"
          v-on:blur="formValidationState.emailValid = validEmail()"
        />
        <small class="d-block error" v-if="!formValidationState.emailValid"
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
            'is-invalid': !formValidationState.birthdayValid,
            'is-valid': formValidationState.birthdayValid,
          }"
          v-on:blur="formValidationState.birthdayValid = validBirthday()"
        />
        <small class="d-block error" v-if="!formValidationState.birthdayValid">
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
            'is-invalid': !formValidationState.phoneValid,
            'is-valid': formValidationState.phoneValid,
          }"
          v-on:blur="formValidationState.phoneValid = validatePhone()"
        />
        <small class="d-block error" v-if="!formValidationState.phoneValid">
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
  nameValid: true,
  lastNameValid: true,
  emailValid: true,
  birthdayValid: true,
  phoneValid: true,
});

const onSubmit = () => {
  emit("add-user", form);
  resetForm();
};

const resetForm = () => {
  form.name = "";
  formValidationState.nameValid = true;
  form.lastName = "";
  formValidationState.lastNameValid = true;
  form.email = "";
  formValidationState.emailValid = true;
  form.birthday = "";
  formValidationState.birthdayValid = true;
  form.province = null;
  form.phone = "";
  formValidationState.phoneValid = true;
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
