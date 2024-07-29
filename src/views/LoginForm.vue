<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Gebruikersnaam</label>
          <input type="text" v-model="username" id="username" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Wachtwoord</label>
          <input type="password" v-model="password" id="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Simuleer de inloglogica met local storage
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
        this.$router.push('/dashboard');
      } else {
        alert('Ongeldige gebruikersnaam of wachtwoord');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}

.login-container .card {
  max-width: 400px;
  width: 100%;
}
</style>