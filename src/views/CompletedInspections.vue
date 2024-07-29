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
      selectedReport: null
    };
  },
  async created() {
    await this.fetchReports();
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
      } catch (error) {
        console.error('Error updating report:', error);
      }
    },
    async deleteReport(reportId) {
      try {
        await apiService.deleteReport(reportId);
        await this.fetchReports();
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  }
};
</script>

<style scoped>
.head-text {
  color: white;
}
</style>
