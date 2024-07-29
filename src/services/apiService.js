import axios from "axios";

const API_URL = "http://localhost:3000/reports";

export const apiService = {
  async fetchReports() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },
  async saveReport(report) {
    try {
      let response;
      if (report.id) {
        response = await axios.put(`${API_URL}/${report.id}`, report);
      } else {
        response = await axios.post(API_URL, report);
      }
      return response.data;
    } catch (error) {
      console.error("Error saving report:", error);
      throw error;
    }
  },
  async deleteReport(reportId) {
    try {
      await axios.delete(`${API_URL}/${reportId}`);
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error;
    }
  },
};
