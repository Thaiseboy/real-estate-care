import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const apiService = {
  async fetchReports() {
    try {
      const querySnapshot = await getDocs(collection(db, "reports"));
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      return reports;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },
  async saveReport(report) {
    try {
      if (report.id) {
        const reportRef = doc(db, "reports", report.id);
        await updateDoc(reportRef, report);
      } else {
        await addDoc(collection(db, "reports"), report);
      }
    } catch (error) {
      console.error("Error saving report:", error);
      throw error;
    }
  },
  async deleteReport(reportId) {
    try {
      const reportRef = doc(db, "reports", reportId);
      await deleteDoc(reportRef);
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error;
    }
  },
};
