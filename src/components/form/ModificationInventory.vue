<template>
  <div>
    <h1>Modificaties inventariseren:</h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie aangetroffen modificatie</label>
      <input v-model="formData.location" type="text" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="executedBy" class="form-label">Uitgevoerd door</label>
      <select v-model="formData.executedBy" id="executedBy" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="huur">Huur</option>
        <option value="aannemer">Aannemer</option>
        <option value="onbekend">Onbekend</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="modificationDescription" class="form-label">Beschrijving modificatie</label>
      <textarea v-model="formData.modificationDescription" id="modificationDescription" class="form-control" rows="3" required></textarea>
    </div>
    <div class="mb-3">
      <label for="actionToTake" class="form-label">Te ondernemen actie</label>
      <select v-model="formData.actionToTake" id="actionToTake" class="form-select" required>
        <option value="" disabled>Selecteer een optie</option>
        <option value="accepteren">Accepteren</option>
        <option value="laten keuren">Laten keuren</option>
        <option value="laten verwijderen">Laten verwijderen</option>
        <option value="laten aanpassen en keuren">Laten aanpassen en keuren</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="remarks" class="form-label">Opmerking</label>
      <textarea v-model="formData.remarks" id="remarks" class="form-control" rows="3" required></textarea>
    </div>
    <div class="mb-3">
      <label for="file" class="form-label">Upload foto's</label>
      <input type="file" id="file" class="form-control" @change="handleFileUpload">
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
  },
  methods: {
    handleFileUpload(event) {
      this.formData.files = event.target.files;
    }
  }
};
</script>