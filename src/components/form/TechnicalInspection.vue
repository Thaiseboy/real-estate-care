<template>
  <div>
    <h1>Technische installaties inspecteren:</h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie</label>
      <input v-model="formData.location" type="text" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="installationType" class="form-label">Soort installatie</label>
      <select v-model="formData.installationType" id="installationType" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="koeling">Koeling</option>
        <option value="verwarming">Verwarming</option>
        <option value="luchtverversing">Luchtverversing</option>
        <option value="elektra">Elektra</option>
        <option value="beveiliging">Beveiliging</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="reportedIssues" class="form-label">Gemelde storingen</label>
      <textarea v-model="formData.reportedIssues" id="reportedIssues" class="form-control" rows="3" required></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Test procedure</label>
      <div class="form-check">
        <input type="radio" v-model="formData.testProcedure" id="testProcedureYes" value="yes" class="form-check-input" required>
        <label for="testProcedureYes" class="form-check-label">Ja</label>
      </div>
      <div class="form-check">
        <input type="radio" v-model="formData.testProcedure" id="testProcedureNo" value="no" class="form-check-input" required>
        <label for="testProcedureNo" class="form-check-label">Nee</label>
      </div>
    </div>
    <div class="mb-3">
      <label for="remarks" class="form-label">Opmerkingen</label>
      <textarea v-model="formData.remarks" id="remarks" class="form-control" rows="3" required></textarea>
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