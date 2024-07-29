import { createStore } from "vuex";
import axios from "axios";

const API_URL = "http://localhost:3000/reports";

export default createStore({
  state: {
    reports: [],
    currentReport: null,
  },
  mutations: {
    setReports(state, reports) {
      state.reports = reports;
    },
    setCurrentReport(state, report) {
      state.currentReport = report;
    },
    addReport(state, report) {
      state.reports.push(report);
    },
    updateReport(state, updatedReport) {
      const index = state.reports.findIndex(
        (report) => report.id === updatedReport.id
      );
      if (index !== -1) {
        state.reports.splice(index, 1, updatedReport);
      }
    },
    deleteReport(state, reportId) {
      state.reports = state.reports.filter((report) => report.id !== reportId);
    },
  },
  actions: {
    async fetchReports({ commit }) {
      try {
        const response = await axios.get(API_URL);
        commit("setReports", response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
    async fetchReport({ commit }, reportId) {
      try {
        const response = await axios.get(`${API_URL}/${reportId}`);
        commit("setCurrentReport", response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },
    async saveReport({ commit }, report) {
      try {
        let response;
        if (report.id) {
          response = await axios.patch(`${API_URL}/${report.id}`, report);
          commit("updateReport", response.data);
        } else {
          response = await axios.post(API_URL, report);
          commit("addReport", response.data);
        }
      } catch (error) {
        console.error("Error saving report:", error);
      }
    },
    async removeReport({ commit }, reportId) {
      try {
        await axios.delete(`${API_URL}/${reportId}`);
        commit("deleteReport", reportId);
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    },
  },
});
