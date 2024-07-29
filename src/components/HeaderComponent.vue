<template>
  <header class="bg-teal text-white py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div>
          <h1 class="h3 mb-0">Real Estate Care</h1>
          <p class="mb-0">Caring is in our nature</p>
        </div>
      </div>
      <nav>
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link nav" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav" to="/assigned-reports">Assigned Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav" to="/completed-inspections">Completed Inspections</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav" to="/knowledge-base">Knowledge Base</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav" to="/settings">Settings</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav" to="/login" @click="logout">Logout</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    logout() {
      // Voeg je logout logica hier toe
      console.log('User logged out');
    }
  }
};
</script>

<style scoped>
.bg-teal {
  background-color: (--tertiary-color);
}
h1 {
  margin: 0;
  color: rgba(0, 170, 162, 1);
  font-weight: bold;
}
p{
  color :white;
}
.nav {
  color:rgba(0, 170, 162, 1);
}
.nav-link:hover {
  color: white;
}
</style>