<template>
  <div class="page-container">
    <HeaderComponent />
    <div class="content-wrap">
      <div class="settings">
        <h1>Settings</h1>
        <form @submit.prevent="saveSettings">
          <div>
            <label for="avatar">Avatar URL:</label>
            <input type="url" v-model="settings.avatar" id="avatar" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" v-model="settings.password" id="password" />
          </div>
          <div>
            <label for="theme">Theme:</label>
            <select v-model="settings.theme" id="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label for="notifications">Notifications:</label>
            <input type="checkbox" v-model="settings.notifications" id="notifications" />
          </div>
          <div>
            <label for="sounds">Sounds:</label>
            <input type="checkbox" v-model="settings.sounds" id="sounds" />
          </div>
          <button type="submit" class="save-button">Save Settings</button>
        </form>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
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
      settings: {
        avatar: '',
        password: '',
        theme: 'light',
        notifications: false,
        sounds: false
      }
    };
  },
  methods: {
    saveSettings() {
      // Opslaan van instellingen, eventueel naar een API of local storage
      console.log('Settings saved:', this.settings);
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
}
.settings {
  padding: 20px;
}
.settings form {
  display: flex;
  flex-direction: column;
}
.settings form > div {
  margin-bottom: 15px;
}
.settings form label {
  margin-bottom: 5px;
}
.settings form input,
.settings form select {
  padding: 5px;
}
.save-button {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
}
.save-button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}
.save-button:active {
  transform: translateY(0);
}
h1, label {
  color: white;
}
</style>