<template>
  <div>
    <h1><strong>Achterstallig onderhoud opnemen</strong></h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie</label>
      <input type="text" v-model="formData.location" id="location" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="maintenanceType" class="form-label">Soort Onderhoud</label>
      <select v-model="formData.maintenanceType" id="maintenanceType" class="form-select" required>
        <option value="schilderwerk">Schilderwerk</option>
        <option value="houtrot">Houtrot</option>
        <option value="elektra">Elektra</option>
        <option value="leidingwerk">Leidingwerk</option>
        <option value="beglazing">Beglaing</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Acute Actie Vereist</label>
      <div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="formData.urgentAction" id="urgentActionYes" value="yes">
          <label class="form-check-label" for="urgentActionYes">Ja</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="formData.urgentAction" id="urgentActionNo" value="no">
          <label class="form-check-label" for="urgentActionNo">Nee</label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="costEstimate" class="form-label">Kostenindicatie</label>
      <select v-model="formData.costEstimate" id="costEstimate" class="form-select" required>
        <option value="0-500">0-500</option>
        <option value="500-1500">500-1500</option>
        <option value="1500+">1500+</option>
      </select>
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
  name: 'MaintenanceAssessmentForm',
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