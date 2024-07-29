<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <HeaderComponent />
    <div class="content-wrap container flex-grow-1 mt-4">
      <h1 class="mb-4 head-text">Kennisbase/Documentatie</h1>
      <div v-if="reports.length" class="list-group">
        <button v-for="report in reports" :key="report.id" class="list-group-item list-group-item-action" @click="showReportDetails(report.id)">
          {{ report.title }}
        </button>
      </div>
      <div v-else class="alert alert-info">
        Geen rapporten gevonden.
      </div>
      
      <!-- Modal -->
      <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reportModalLabel">{{ selectedReport.title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Titel van het rapport:</strong> {{ selectedReport.title }}</p>
              <p v-if="selectedReport.damageDetails"><strong>Datum:</strong> {{ selectedReport.damageDetails.date }}</p>
              <p><strong>URL:</strong> <a :href="selectedReport.url" target="_blank">{{ selectedReport.url }}</a></p>
              <!-- Voeg hier meer details toe zoals vereist -->
              <pre>{{ formatJSON(selectedReport) }}</pre>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sluiten</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  name: 'KnowledgeBase',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      reports: [],
      selectedReport: {
        damageDetails: {} // Initialiseer damageDetails als een leeg object
      }
    };
  },
  async created() {
    await this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await axios.get('http://localhost:3000/reports');
        this.reports = response.data;
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },
    async showReportDetails(reportId) {
      try {
        const response = await axios.get(`http://localhost:3000/reports/${reportId}`);
        this.selectedReport = response.data;

        // Zorg ervoor dat damageDetails altijd een object is
        if (!this.selectedReport.damageDetails) {
          this.selectedReport.damageDetails = {};
        }

        const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
        reportModal.show();
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    },
    formatJSON(obj) {
      return JSON.stringify(obj, null, 2);
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
  padding-bottom: 50px; /* Height of the footer */
}

h1 {
  font-size: 24px;
  color: var(--secondary-color);
}

.list-group-item {
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

.list-group-item:hover {
  background-color: var(--primary-color);
  color: white;
}
.head-text {
  color: var(--secondary-color);
}
</style>