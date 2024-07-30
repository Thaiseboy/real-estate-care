<template>
  <div class="page-container">
    <HeaderComponent />
    <div class="content-wrap container">
      <div class="completed-inspections-container">
        <h1 class="mb-4 head-text">Uitgevoerde Rapportages</h1>
        <div v-for="report in reports" :key="report.id" class="report-item mb-3 p-3 border rounded bg-light">
          <div class="report-header d-flex justify-content-between align-items-center mb-3">
            <h2 class="h5">{{ report.title }}</h2>
            <div class="report-buttons">
              <button @click="editReport(report)" class="btn btn-primary me-2">Bijwerken</button>
              <button @click="deleteReport(report.id)" class="btn btn-danger">Verwijderen</button>
            </div>
          </div>
          <div v-if="selectedReport && selectedReport.id === report.id">
            <div class="forms">
              <DamageAssessmentForm v-if="report.damage" v-model="selectedReport.damageDetails" />
              <MaintenanceAssessmentForm v-if="report.maintenance" v-model="selectedReport.maintenanceDetails" />
              <TechnicalInspectionForm v-if="report.technical" v-model="selectedReport.technicalDetails" />
              <ModificationInventoryForm v-if="report.modification" v-model="selectedReport.modificationDetails" />
            </div>
            <button @click="updateReport" class="btn btn-success mt-4">Opslaan</button>
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
      reports: [],
      selectedReport: null,
      notificationsEnabled: true,
      soundsEnabled: true
    };
  },
  async created() {
    await this.fetchReports();
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) !== false;
    this.soundsEnabled = JSON.parse(localStorage.getItem('soundsEnabled')) !== false;
  },
  methods: {
    async fetchReports() {
      try {
        this.reports = await apiService.fetchReports();
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },
    editReport(report) {
      this.selectedReport = { ...report };
    },
    async updateReport() {
      try {
        await apiService.saveReport(this.selectedReport);
        await this.fetchReports();
        this.selectedReport = null;
        if (this.notificationsEnabled) {
          toastr.success('Het rapport is succesvol bijgewerkt.');
        }
        if (this.soundsEnabled) {
          this.playSound('success');
        }
      } catch (error) {
        console.error('Error updating report:', error);
      }
    },
    async deleteReport(reportId) {
      try {
        await apiService.deleteReport(reportId);
        await this.fetchReports();
        if (this.notificationsEnabled) {
          toastr.success('Het rapport is succesvol verwijderd.');
        }
        if (this.soundsEnabled) {
          this.playSound('success');
        }
      } catch (error) {
        console.error('Error deleting report:', error);
      }
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
.report-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
}
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.report-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>