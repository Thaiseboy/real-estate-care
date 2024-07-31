<template>
  <div class="page-container">
    <HeaderComponent /> <!-- HeaderComponent bovenaan de pagina -->
    <div class="content-wrap container">
      <div class="assigned-reports">
        <h1 class="mb-4 head-text">Toegewezen Rapportages</h1> <!-- Titel van het gedeelte -->
        <div class="card mb-4">
          <div class="card-body">
            <div class="report-title mb-4">
              <label for="reportTitle" class="form-label">Titel:</label>
              <input type="text" id="reportTitle" v-model="newReport.title" class="form-control" placeholder="Titel van het rapport"> <!-- Invoerveld voor de titel van het rapport -->
            </div>
            <div class="inspection-options mb-4">
              <!-- Verschillende checkboxen voor inspectieopties -->
              <div class="form-check mb-2">
                <input type="checkbox" id="damageAssessment" v-model="newReport.damage" class="form-check-input"/>
                <label for="damageAssessment" class="form-check-label">Schade opnemen</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="maintenanceAssessment" v-model="newReport.maintenance" class="form-check-input"/>
                <label for="maintenanceAssessment" class="form-check-label">Achterstallig onderhoud opnemen</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="technicalInspection" v-model="newReport.technical" class="form-check-input"/>
                <label for="technicalInspection" class="form-check-label">Technische installaties inspecteren</label>
              </div>
              <div class="form-check mb-2">
                <input type="checkbox" id="modificationInventory" v-model="newReport.modification" class="form-check-input"/>
                <label for="modificationInventory" class="form-check-label">Modificaties inventariseren</label>
              </div>
            </div>
            <hr>
            <div class="forms">
              <!-- Dynamisch weergeven van formulieren op basis van de geselecteerde opties -->
              <DamageAssessmentForm v-if="newReport.damage" v-model="newReport.damageDetails" />
              <MaintenanceAssessmentForm v-if="newReport.maintenance" v-model="newReport.maintenanceDetails" />
              <TechnicalInspectionForm v-if="newReport.technical" v-model="newReport.technicalDetails" />
              <ModificationInventoryForm v-if="newReport.modification" v-model="newReport.modificationDetails" />
            </div>
            <button @click="saveNewReport" class="btn btn-primary mt-4">Opslaan</button> <!-- Opslaan knop -->
          </div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
          <!-- Modal voor succesmelding -->
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
    <FooterComponent /> <!-- FooterComponent onderaan de pagina -->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'; // Importeer Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.js'; // Importeer Bootstrap JS
import * as bootstrap from 'bootstrap'; // Importeer Bootstrap namespace
import HeaderComponent from '../components/HeaderComponent.vue'; // Importeer HeaderComponent
import FooterComponent from '../components/FooterComponent.vue'; // Importeer FooterComponent
import DamageAssessmentForm from '@/components/form/DamageAssessment.vue'; // Importeer DamageAssessmentForm
import MaintenanceAssessmentForm from '@/components/form/MaintenanceAssessment.vue'; // Importeer MaintenanceAssessmentForm
import TechnicalInspectionForm from '@/components/form/TechnicalInspection.vue'; // Importeer TechnicalInspectionForm
import ModificationInventoryForm from '@/components/form/ModificationInventory.vue'; // Importeer ModificationInventoryForm
import { apiService } from '@/services/apiService'; // Importeer apiService
import { idbKeyval } from '../idb'; // Importeer idbKeyval voor IndexedDB interacties
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
      newReport: {
        title: '', // Titel van het nieuwe rapport
        damage: false, // Schade opnemen optie
        maintenance: false, // Onderhoud opnemen optie
        technical: false, // Technische inspectie optie
        modification: false, // Modificaties inventariseren optie
        damageDetails: {}, // Details van de schade inspectie
        maintenanceDetails: {}, // Details van het onderhoud
        technicalDetails: {}, // Details van de technische inspectie
        modificationDetails: {}, // Details van de modificaties
        photos: [] // Foto's bij het rapport
      },
      showModal: false // Variabele om modal weer te geven
    };
  },
  methods: {
    async saveNewReport() {
      try {
        if (navigator.onLine) { // Controleer of de gebruiker online is
          const savedData = await apiService.saveReport(this.newReport); // Sla het rapport op via de API
          console.log('Data saved:', savedData); // Log de opgeslagen data
          toastr.success('Het rapport is succesvol opgeslagen'); // Toon succesmelding
          this.playSound('success'); // Speel succesgeluid af
        } else {
          await idbKeyval.set(this.newReport.title, this.newReport); // Sla het rapport lokaal op in IndexedDB
          console.log('Data saved locally'); // Log lokale opslag
          toastr.info('Het rapport is lokaal opgeslagen. Het wordt gesynchroniseerd wanneer er weer netwerk beschikbaar is.'); // Toon informatiemelding
          this.playSound('info'); // Speel informiegeluid af
        }
        this.showModal = true; // Toon modal
        this.resetForm(); // Reset het formulier
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show(); // Toon succesmodal
      } catch (error) {
        console.error('Error saving data:', error); // Log de fout
        toastr.error('Er is een fout opgetreden bij het opslaan van het rapport'); // Toon foutmelding
      }
    },
    resetForm() {
      this.newReport = {
        title: '', // Reset titel
        damage: false, // Reset schade opnemen optie
        maintenance: false, // Reset onderhoud opnemen optie
        technical: false, // Reset technische inspectie optie
        modification: false, // Reset modificaties inventariseren optie
        damageDetails: {}, // Reset schade details
        maintenanceDetails: {}, // Reset onderhoud details
        technicalDetails: {}, // Reset technische details
        modificationDetails: {}, // Reset modificatie details
        photos: [] // Reset foto's
      };
    },
    playSound(type) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Maak een nieuwe AudioContext
      const oscillator = audioContext.createOscillator(); // Maak een nieuwe oscillator
      const gainNode = audioContext.createGain(); // Maak een nieuwe gain node

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
</style>