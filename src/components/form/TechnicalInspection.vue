<template>
  <div>
    <h1><strong>Technische installaties inspecteren</strong></h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie</label>
      <input type="text" v-model="formData.location" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="installationType" class="form-label">Soort Installatie</label>
      <select v-model="formData.installationType" id="installationType" class="form-select" required>
        <option value="koeling">Koeling</option>
        <option value="verwarming">Verwarming</option>
        <option value="luchtverversing">Luchtverversing</option>
        <option value="elektra">Elektra</option>
        <option value="beveilliging">Beveiliging</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="reportedIssues" class="form-label">Gemelde Storingen</label>
      <textarea v-model="formData.reportedIssues" id="reportedIssues" class="form-control" required></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Test Procedure</label>
      <div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="formData.testProcedure" id="testProcedureYes" value="yes">
          <label class="form-check-label" for="testProcedureYes">Ja</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="formData.testProcedure" id="testProcedureNo" value="no">
          <label class="form-check-label" for="testProcedureNo">Nee</label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="comments" class="form-label">Opmerkingen</label>
      <textarea v-model="formData.comments" id="comments" class="form-control" required></textarea>
    </div>
    <div class="mb-3">
      <label for="photos" class="form-label">Foto's</label>
      <input type="file" @change="handlePhotoUpload" multiple class="form-control" accept="image/*">
      <div class="mt-3">
        <img v-for="photo in formData.photos" :src="photo.url" :key="photo.name" :alt="photo.name" class="img-thumbnail me-2">
      </div>
    </div>
  </div>
  <hr>
</template>

<script>
export default {
  name: 'TechnicalInspectionForm',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.modelValue, photos: this.modelValue.photos || [] },
    };
  },
  watch: {
    formData: {
      deep: true,
      handler(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
  },
  methods: {
    handlePhotoUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.photos.push({
            name: file.name,
            url: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.img-thumbnail {
  max-width: 150px;
  max-height: 150px;
}
</style>