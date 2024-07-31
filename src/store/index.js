import { createStore } from "vuex"; // Importeer Vuex om een store te maken
import axios from "axios"; // Importeer axios voor HTTP-verzoeken

const API_URL = "http://localhost:3000/reports"; // Bepaal de API basis-URL

export default createStore({
  state: {
    reports: [], // Array om rapporten op te slaan
    currentReport: null, // Huidig geselecteerd rapport
  },
  mutations: {
    setReports(state, reports) {
      state.reports = reports; // Zet de rapporten in de state
    },
    setCurrentReport(state, report) {
      state.currentReport = report; // Zet het huidige rapport in de state
    },
    addReport(state, report) {
      state.reports.push(report); // Voeg een nieuw rapport toe aan de state
    },
    updateReport(state, updatedReport) {
      const index = state.reports.findIndex(
        (report) => report.id === updatedReport.id
      ); // Vind het index van het te updaten rapport
      if (index !== -1) {
        state.reports.splice(index, 1, updatedReport); // Werk het rapport bij in de state
      }
    },
    deleteReport(state, reportId) {
      state.reports = state.reports.filter((report) => report.id !== reportId); // Verwijder het rapport uit de state
    },
  },
  actions: {
    async fetchReports({ commit }) {
      try {
        const response = await axios.get(API_URL); // Haal rapporten op van de API
        commit("setReports", response.data); // Commit de opgehaalde rapporten aan de state
      } catch (error) {
        console.error("Error fetching reports:", error); // Log de fout
      }
    },
    async fetchReport({ commit }, reportId) {
      try {
        const response = await axios.get(`${API_URL}/${reportId}`); // Haal een specifiek rapport op van de API
        commit("setCurrentReport", response.data); // Commit het opgehaalde rapport aan de state
      } catch (error) {
        console.error("Error fetching report:", error); // Log de fout
      }
    },
    async saveReport({ commit }, report) {
      try {
        let response;
        if (report.id) {
          response = await axios.patch(`${API_URL}/${report.id}`, report); // Update bestaand rapport via de API
          commit("updateReport", response.data); // Commit het bijgewerkte rapport aan de state
        } else {
          response = await axios.post(API_URL, report); // Maak een nieuw rapport aan via de API
          commit("addReport", response.data); // Commit het nieuwe rapport aan de state
        }
      } catch (error) {
        console.error("Error saving report:", error); // Log de fout
      }
    },
    async removeReport({ commit }, reportId) {
      try {
        await axios.delete(`${API_URL}/${reportId}`); // Verwijder rapport via de API
        commit("deleteReport", reportId); // Commit het verwijderde rapport aan de state
      } catch (error) {
        console.error("Error deleting report:", error); // Log de fout
      }
    },
  },
});
