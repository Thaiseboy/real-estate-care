<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <HeaderComponent /> <!-- HeaderComponent bovenaan de pagina -->
    <div class="content-wrap container flex-grow-1 mt-4">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="item in dashboardItems" :key="item.id">
          <!-- Iteratie over dashboard items, elk item wordt weergegeven in een kolom -->
          <div class="card h-100 text-center">
            <div class="card-body">
              <div class="icon mb-3">
                <i :class="item.iconClass"></i> <!-- Icon van het dashboard item -->
              </div>
              <h5 class="card-title">{{ item.title }}</h5> <!-- Titel van het dashboard item -->
              <p class="card-text">{{ item.description }}</p> <!-- Beschrijving van het dashboard item -->
            </div>
            <div class="card-footer">
              <router-link :to="item.link" class="btn btn-primary">Ga naar {{ item.title }}</router-link> <!-- Link naar de bijbehorende pagina -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent /> <!-- FooterComponent onderaan de pagina -->
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'; // Importeer HeaderComponent
import FooterComponent from '../components/FooterComponent.vue'; // Importeer FooterComponent

export default {
  name: 'DashboardView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      dashboardItems: [
        { id: 1, title: 'Dashboard', description: 'Ga naar het dashboard', link: '/dashboard', iconClass: 'bi bi-speedometer2' },
        { id: 2, title: 'Assigned Reports', description: 'Bekijk toegewezen rapportages', link: '/assigned-reports', iconClass: 'bi bi-card-checklist' },
        { id: 3, title: 'Completed Inspections', description: 'Bekijk voltooide inspecties', link: '/completed-inspections', iconClass: 'bi bi-check-circle' },
        { id: 4, title: 'Knowledge Base', description: 'Toegang tot de kennisbank', link: '/knowledge-base', iconClass: 'bi bi-book' },
        { id: 5, title: 'Settings', description: 'Wijzig instellingen', link: '/settings', iconClass: 'bi bi-gear' },
        { id: 6, title: 'Logout', description: 'Uitloggen', link: '/login', iconClass: 'bi bi-box-arrow-right' }
      ]
    };
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
  flex-grow: 1;
  margin-top: 1rem;
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