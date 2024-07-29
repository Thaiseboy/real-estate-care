<template>
  <div>
    <h1>Schade opnemen:</h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie</label>
      <input v-model="formData.location" type="text" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Nieuwe schade</label>
      <div class="form-check">
        <input type="radio" v-model="formData.newDamage" id="newDamageYes" value="yes" class="form-check-input" required>
        <label for="newDamageYes" class="form-check-label">Ja</label>
      </div>
      <div class="form-check">
        <input type="radio" v-model="formData.newDamage" id="newDamageNo" value="no" class="form-check-input" required>
        <label for="newDamageNo" class="form-check-label">Nee</label>
      </div>
    </div>
    <div class="mb-3">
      <label for="damageType" class="form-label">Soort schade</label>
      <select v-model="formData.damageType" id="damageType" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="moedwillig">Moedwillig</option>
        <option value="slijtage">Slijtage</option>
        <option value="geweld">Geweld</option>
        <option value="normaal gebruik">Normaal gebruik</option>
        <option value="calamiteit">Calamiteit</option>
        <option value="anders">Anders</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Datum</label>
      <input v-model="formData.date" type="date" id="date" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Acute actie vereist</label>
      <div class="form-check">
        <input type="radio" v-model="formData.urgentAction" id="urgentActionYes" value="yes" class="form-check-input" required>
        <label for="urgentActionYes" class="form-check-label">Ja</label>
      </div>
      <div class="form-check">
        <input type="radio" v-model="formData.urgentAction" id="urgentActionNo" value="no" class="form-check-input" required>
        <label for="urgentActionNo" class="form-check-label">Nee</label>
      </div>
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Omschrijving</label>
      <textarea v-model="formData.description" id="description" class="form-control" rows="3" required></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue'],
  computed: {
    formData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>