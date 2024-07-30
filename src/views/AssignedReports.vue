<template>
  <div class="page-container">
    <HeaderComponent />
    <div class="content-wrap container">
      <div class="assigned-reports">
        <h1 class="mb-4 head-text">Toegewezen Rapportages</h1>
        <div class="card mb-4">
          <div class="card-body">
            <div class="report-title mb-4">
              <label for="reportTitle" class="form-label">Titel:</label>
              <input type="text" id="reportTitle" v-model="newReport.title" class="form-control" placeholder="Titel van het rapport">
            </div>
            <div class="inspection-options mb-4">
              <div class="form-check mb-2">
                <input type="checkbox" id="damageAssessment" v-model="newReport.damage" class="form-check-input" />
                <label for="damageAssessment" class="form-check-label">Schade opnemen</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="maintenanceAssessment" v-model="newReport.maintenance" class="form-check-input" />
                <label for="maintenanceAssessment" class="form-check-label">Achterstallig onderhoud opnemen</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="technicalInspection" v-model="newReport.technical" class="form-check-input" />
                <label for="technicalInspection" class="form-check-label">Technische installaties inspecteren</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="modificationInventory" v-model="newReport.modification" class="form-check-input" />
                <label for="modificationInventory" class="form-check-label">Modificaties inventariseren</label>
              </div>
            </div>
            <div class="forms">
              <DamageAssessmentForm v-if="newReport.damage" v-model="newReport.damageDetails" />
              <MaintenanceAssessmentForm v-if="newReport.maintenance" v-model="newReport.maintenanceDetails" />
              <TechnicalInspectionForm v-if="newReport.technical" v-model="newReport.technicalDetails" />
              <ModificationInventoryForm v-if="newReport.modification" v-model="newReport.modificationDetails" />
            </div>
            <button @click="saveNewReport" class="btn btn-primary mt-4">Opslaan</button>
          </div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Succes</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Het rapport is succesvol opgeslagen.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import * as bootstrap from 'bootstrap'; // Import the whole Bootstrap module
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import DamageAssessmentForm from '@/components/form/DamageAssessment.vue';
import MaintenanceAssessmentForm from '@/components/form/MaintenanceAssessment.vue';
import TechnicalInspectionForm from '@/components/form/TechnicalInspection.vue';
import ModificationInventoryForm from '@/components/form/ModificationInventory.vue';
import { apiService } from '@/services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    DamageAssessmentForm,
    MaintenanceAssessmentForm,
    TechnicalInspectionForm,
    ModificationInventoryForm
  },
  data() {
    return {
      newReport: {
        title: '',
        damage: false,
        maintenance: false,
        technical: false,
        modification: false,
        damageDetails: {},
        maintenanceDetails: {},
        technicalDetails: {},
        modificationDetails: {}
      },
      showModal: false,
      notificationsEnabled: true,
      soundsEnabled: true
    };
  },
  created() {
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) !== false;
    this.soundsEnabled = JSON.parse(localStorage.getItem('soundsEnabled')) !== false;
  },
  methods: {
    async saveNewReport() {
      try {
        const savedData = await apiService.saveReport(this.newReport);
        console.log('Data saved:', savedData);
        if (this.notificationsEnabled) {
          toastr.success('Het rapport is succesvol opgeslagen.');
        }
        if (this.soundsEnabled) {
          this.playSound('success');
        }
        this.showModal = true;
        this.resetForm();
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    },
    resetForm() {
      this.newReport = {
        title: '',
        damage: false,
        maintenance: false,
        technical: false,
        modification: false,
        damageDetails: {},
        maintenanceDetails: {},
        technicalDetails: {},
        modificationDetails: {}
      };
    },
    playSound(type) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'success') {
        oscillator.frequency.value = 440; // A4
      } else if (type === 'info') {
        oscillator.frequency.value = 660; // E5
      }

      oscillator.type = 'sine';
      oscillator.start();
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);

      oscillator.stop(audioContext.currentTime + 1);
    }
  }
};
</script>

<style scoped>
.head-text {
  color: white;
}
</style>