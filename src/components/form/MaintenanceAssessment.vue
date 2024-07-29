<template>
  <div>
    <h1>Achterstallig onderhoud opnemen:</h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie</label>
      <input v-model="formData.location" type="text" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="maintenanceType" class="form-label">Soort onderhoud</label>
      <select v-model="formData.maintenanceType" id="maintenanceType" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="schilderwerk">Schilderwerk</option>
        <option value="houtrot">Houtrot</option>
        <option value="elektra">Elektra</option>
        <option value="leidingwerk">Leidingwerk</option>
        <option value="beglazing">Beglazing</option>
      </select>
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
      <label for="costEstimate" class="form-label">Kostenindicatie</label>
      <select v-model="formData.costEstimate" id="costEstimate" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="0-500">0-500</option>
        <option value="500-1500">500-1500</option>
        <option value="1500+">1500+</option>
      </select>
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