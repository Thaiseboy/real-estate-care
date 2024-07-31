<template>
  <div class="page-container">
    <HeaderComponent /> <!-- HeaderComponent bovenaan de pagina -->
    <div class="content-wrap container">
      <div class="completed-inspections-container">
        <h1 class="mb-4 head-text">Uitgevoerde Rapportages</h1> <!-- Titel van het gedeelte -->
        <div v-for="report in reports" :key="report.id" class="report-item mb-3 p-3 border rounded bg-light">
          <!-- Iteratie over de rapporten, elk rapport wordt weergegeven in een item -->
          <div class="report-header d-flex justify-content-between align-items-center mb-3">
            <h2 class="h5">{{ report.title }}</h2> <!-- Titel van het rapport -->
            <div class="report-buttons">
              <button @click="editReport(report)" class="btn btn-primary me-2">Bijwerken</button> <!-- Bijwerken knop -->
              <button @click="deleteReport(report.id)" class="btn btn-danger">Verwijderen</button> <!-- Verwijderen knop -->
            </div>
          </div>
          <div v-if="selectedReport && selectedReport.id === report.id">
            <!-- Formulieren voor bewerken van geselecteerd rapport -->
            <div class="forms">
              <DamageAssessmentForm v-if="report.damage" v-model="selectedReport.damageDetails" />
              <MaintenanceAssessmentForm v-if="report.maintenance" v-model="selectedReport.maintenanceDetails" />
              <TechnicalInspectionForm v-if="report.technical" v-model="selectedReport.technicalDetails" />
              <ModificationInventoryForm v-if="report.modification" v-model="selectedReport.modificationDetails" />
            </div>
            <button @click="updateReport" class="btn btn-success mt-4">Opslaan</button> <!-- Opslaan knop -->
          </div>
        </div>
      </div>
    </div>
    <FooterComponent /> <!-- FooterComponent onderaan de pagina -->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'; // Importeer Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.js'; // Importeer Bootstrap JS
import HeaderComponent from '../components/HeaderComponent.vue'; // Importeer HeaderComponent
import FooterComponent from '../components/FooterComponent.vue'; // Importeer FooterComponent
import DamageAssessmentForm from '@/components/form/DamageAssessment.vue'; // Importeer DamageAssessmentForm
import MaintenanceAssessmentForm from '@/components/form/MaintenanceAssessment.vue'; // Importeer MaintenanceAssessmentForm
import TechnicalInspectionForm from '@/components/form/TechnicalInspection.vue'; // Importeer TechnicalInspectionForm
import ModificationInventoryForm from '@/components/form/ModificationInventory.vue'; // Importeer ModificationInventoryForm
import { apiService } from '@/services/apiService'; // Importeer apiService
import toastr from 'toastr'; // Importeer toastr voor meldingen
import 'toastr/build/toastr.min.css'; // Importeer toastr CSS

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
      reports: [], // Array om rapporten op te slaan
      selectedReport: null, // Huidig geselecteerd rapport voor bewerken
      notificationsEnabled: true, // Variabele voor meldingen
      soundsEnabled: true // Variabele voor geluiden
    };
  },
  async created() {
    await this.fetchReports(); // Haal rapporten op bij het laden van de component
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) !== false; // Haal meldingsinstellingen op uit localStorage
    this.soundsEnabled = JSON.parse(localStorage.getItem('soundsEnabled')) !== false; // Haal geluidsinstellingen op uit localStorage
  },
  methods: {
    async fetchReports() {
      try {
        this.reports = await apiService.fetchReports(); // Haal rapporten op via apiService
      } catch (error) {
        console.error('Error fetching reports:', error); // Log de fout
      }
    },
    editReport(report) {
      this.selectedReport = { ...report }; // Zet het geselecteerde rapport voor bewerken
    },
    async updateReport() {
      try {
        await apiService.saveReport(this.selectedReport); // Werk het rapport bij via apiService
        await this.fetchReports(); // Haal de bijgewerkte lijst met rapporten op
        this.selectedReport = null; // Reset het geselecteerde rapport
        if (this.notificationsEnabled) {
          toastr.success('Het rapport is succesvol bijgewerkt.'); // Toon succesmelding
        }
        if (this.soundsEnabled) {
          this.playSound('success'); // Speel succesgeluid af
        }
      } catch (error) {
        console.error('Error updating report:', error); // Log de fout
      }
    },
    async deleteReport(reportId) {
      try {
        await apiService.deleteReport(reportId); // Verwijder rapport via apiService
        await this.fetchReports(); // Haal de bijgewerkte lijst met rapporten op
        if (this.notificationsEnabled) {
          toastr.success('Het rapport is succesvol verwijderd.'); // Toon succesmelding
        }
        if (this.soundsEnabled) {
          this.playSound('success'); // Speel succesgeluid af
        }
      } catch (error) {
        console.error('Error deleting report:', error); // Log de fout
      }
    },
    playSound(type) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Maak een nieuwe AudioContext aan
      const oscillator = audioContext.createOscillator(); // Maak een nieuwe oscillator aan
      const gainNode = audioContext.createGain(); // Maak een nieuwe gain node aan

      oscillator.connect(gainNode); // Verbind de oscillator met de gain node
      gainNode.connect(audioContext.destination); // Verbind de gain node met de bestemming (speakers)

      if (type === 'success') {
        oscillator.frequency.value = 440; // A4 toon voor succes
      } else if (type === 'info') {
        oscillator.frequency.value = 660; // E5 toon voor informatie
      }

      oscillator.type = 'sine'; // Zet de oscillator op sinusgolf
      oscillator.start(); // Start de oscillator
      gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Zet het volume op 1
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1); // Verlaag het volume geleidelijk

      oscillator.stop(audioContext.currentTime + 1); // Stop de oscillator na 1 seconde
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