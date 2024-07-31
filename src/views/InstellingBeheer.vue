<template>
  <div class="settings-container">
    <HeaderComponent />
    <div class="content-wrap container mt-4">
      <h1 class="mb-4">Instellingen Beheer</h1>

      <div class="card mb-4">
        <div class="card-header">Gebruikersinformatie</div>
        <div class="card-body">
          <form @submit.prevent="updateUserInfo">
            <div class="mb-3">
              <label for="username" class="form-label">Gebruikersnaam</label>
              <input type="text" v-model="username" id="username" class="form-control" required aria-required="true">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Wachtwoord</label>
              <input type="password" v-model="password" id="password" class="form-control" required aria-required="true">
            </div>
            <button type="submit" class="btn btn-primary">Opslaan</button>
          </form>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header">Thema</div>
        <div class="card-body">
          <button @click="toggleTheme" class="btn" :class="isDarkMode ? 'btn-light' : 'btn-dark'">
            {{ isDarkMode ? 'Schakel over naar licht modus' : 'Schakel over naar donker modus' }}
          </button>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header">Meldingen</div>
        <div class="card-body">
          <button @click="toggleNotifications" class="btn" :class="notificationsEnabled ? 'btn-danger' : 'btn-success'">
            {{ notificationsEnabled ? 'Meldingen Uitschakelen' : 'Meldingen Inschakelen' }}
          </button>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-header">Geluiden</div>
        <div class="card-body">
          <button @click="toggleSounds" class="btn" :class="soundsEnabled ? 'btn-danger' : 'btn-success'">
            {{ soundsEnabled ? 'Geluiden Uitschakelen' : 'Geluiden Inschakelen' }}
          </button>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  name: 'InstellingBeheer',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      username: '',
      password: '',
      isDarkMode: false,
      notificationsEnabled: true,
      soundsEnabled: true
    };
  },
  created() {
    // Haal gebruikersinformatie, themavoorkeur en meldingsinstellingen op uit localStorage
    const userInfo = JSON.parse(localStorage.getItem('user')) || {};
    this.username = userInfo.username || '';
    this.password = userInfo.password || '';
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) !== false; // standaard aan
    this.soundsEnabled = JSON.parse(localStorage.getItem('soundsEnabled')) !== false; // standaard aan
    this.applyTheme();
  },
  methods: {
    updateUserInfo() {
      // Werk gebruikersinformatie bij in localStorage
      const userInfo = {
        username: this.username,
        password: this.password
      };
      localStorage.setItem('user', JSON.stringify(userInfo));
      if (this.notificationsEnabled) {
        this.showNotification('success', 'Gebruikersinformatie bijgewerkt');
      }
      if (this.soundsEnabled) {
        this.playSound('success');
      }
    },
    toggleTheme() {
      // Schakel tussen licht en donker modus
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
      this.applyTheme();
      if (this.notificationsEnabled) {
        this.showNotification('info', this.isDarkMode ? 'Donker modus geactiveerd' : 'Licht modus geactiveerd');
      }
      if (this.soundsEnabled) {
        this.playSound('info');
      }
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    },
    toggleNotifications() {
      this.notificationsEnabled = !this.notificationsEnabled;
      localStorage.setItem('notificationsEnabled', JSON.stringify(this.notificationsEnabled));
    },
    toggleSounds() {
      this.soundsEnabled = !this.soundsEnabled;
      localStorage.setItem('soundsEnabled', JSON.stringify(this.soundsEnabled));
    },
    showNotification(type, message) {
      if (type === 'success') {
        toastr.success(message || 'Succesmelding');
      } else if (type === 'info') {
        toastr.info(message || 'Informatiemelding');
      }
    },
    playSound(type) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'success') {
        oscillator.frequency.value = 440; // A4
      } else if (type === 'info') {
        oscillator.frequency.value = 660; // E5
      }

      oscillator.type = 'sine';
      oscillator.start();
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);

      oscillator.stop(audioContext.currentTime + 1);
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
  font-size: 24px;
}
.settings-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
  padding-bottom: 50px; 
}

.card {
  margin-bottom: 20px;
}

/* Licht modus */
.light-mode {
  --background-color: #ffffff;
  --text-color: #000000;
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
}

/* Donker modus */
.dark-mode {
  --background-color: #343a40;
  --text-color: #ffffff;
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
}

body.light-mode {
  background-color: var(--background-color);
  color: var(--text-color);
}

body.dark-mode {
  background-color: var(--background-color);
  color: var(--text-color);
}

.btn-light {
  background-color: var(--background-color);
  color: var(--text-color);
}

.btn-dark {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Toastr */
#toast-container > div {
  opacity: 0.9;
}
</style>