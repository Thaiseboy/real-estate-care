import axios from "axios"; // Importeer de axios bibliotheek voor HTTP-verzoeken
import { idbKeyval } from "../idb"; // Importeer idbKeyval voor IndexedDB interacties

const API_URL = "http://localhost:3000/reports"; // Bepaal de API basis-URL

export const apiService = {
  async fetchReports() {
    try {
      if (navigator.onLine) {
        // Controleer of de gebruiker online is
        const response = await axios.get(API_URL); // Haal rapporten op van de API
        return response.data; // Retourneer de opgehaalde data
      } else {
        console.warn("Network unavailable, fetching reports from IndexedDB"); // Waarschuwing voor offline modus
        const keys = await idbKeyval.keys(); // Haal alle sleutels op uit IndexedDB
        const reports = await Promise.all(
          keys.map((key) => idbKeyval.get(key)) // Haal alle rapporten op met de sleutels
        );
        return reports; // Retourneer de rapporten
      }
    } catch (error) {
      console.error("Error fetching reports:", error); // Log de fout
      throw error; // Gooi de fout door
    }
  },

  async saveReport(report) {
    try {
      let response;
      if (navigator.onLine) {
        // Controleer of de gebruiker online is
        if (report.id) {
          response = await axios.put(`${API_URL}/${report.id}`, report); // Update bestaand rapport via de API
        } else {
          response = await axios.post(API_URL, report); // Maak een nieuw rapport aan via de API
        }
        return response.data; // Retourneer de API-respons data
      } else {
        console.warn("Network unavailable, saving report to IndexedDB"); // Waarschuwing voor offline modus
        await idbKeyval.set(
          report.id || new Date().getTime().toString(), // Gebruik rapport ID of een nieuwe tijdstempel als sleutel
          report
        );
        return report; // Retourneer het rapport
      }
    } catch (error) {
      console.error("Error saving report:", error); // Log de fout
      throw error; // Gooi de fout door
    }
  },

  async deleteReport(reportId) {
    try {
      if (navigator.onLine) {
        // Controleer of de gebruiker online is
        await axios.delete(`${API_URL}/${reportId}`); // Verwijder rapport via de API
      } else {
        console.warn("Network unavailable, deleting report from IndexedDB"); // Waarschuwing voor offline modus
        await idbKeyval.delete(reportId); // Verwijder rapport uit IndexedDB
      }
    } catch (error) {
      console.error("Error deleting report:", error); // Log de fout
      throw error; // Gooi de fout door
    }
  },
};
