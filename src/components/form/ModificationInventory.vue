<template>
  <div>
    <h1><strong>Modificaties inventariseren</strong></h1>
    <div class="mb-3">
      <label for="location" class="form-label">Locatie aangetroffen modificatie</label>
      <input v-model="formData.location" type="text" id="location" class="form-control" required>
    </div>
        <div class="mb-3">
      <label for="executedBy" class="form-label">Uitgevoerd Door</label>
      <select v-model="formData.executedBy" id="executedBy" class="form-select" required>
        <option value="huur">Huur</option>
        <option value="aannemer">Aannemer</option>
        <option value="onbekend">Onbekend</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="modificationDescription" class="form-label">Beschrijving Modificatie</label>
      <textarea v-model="formData.modificationDescription" id="modificationDescription" class="form-control" required></textarea>
    </div>
    <div class="mb-3">
      <label for="actionRequired" class="form-label">Te Ondernemen Actie</label>
      <select v-model="formData.actionRequired" id="actionRequired" class="form-select" required>
        <option value="accepteren">Accepteren</option>
        <option value="laten keuren">Laten Keuren</option>
        <option value="laten verwijderen">Laten Verwijderen</option>
        <option value="laten aanpassen en keuren">Laten Aanpassen en Keuren</option>
      </select>
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
  name: 'ModificationInventoryForm',
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