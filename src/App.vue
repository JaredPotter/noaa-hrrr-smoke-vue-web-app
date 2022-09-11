<template>
  <div id="app">
    <div class="title">🔥 48-HOUR SMOKE FORECAST 🔥</div>
    <router-view />
    <div class="nav-bar">
      <router-link to="/north-west">North West</router-link> |
      <router-link to="/utah">Utah</router-link> |
      <router-link to="/united-states">United States</router-link>
    </div>
    <h3>
      Data Sourced from
      <a href="https://rapidrefresh.noaa.gov/hrrr/HRRRsmoke/">NOAA HRRR</a>
    </h3>
    <div>
      Created by <a href="https://twitter.com/jaredpotter">Jared Potter</a>
    </div>
    <div class="credit">
      <div>
        Code (MIT License) Found at:
        <ul class="links-list">
          <li>
            <a
              href="https://github.com/JaredPotter/noaa-hrrr-smoke-video-generator"
              >NOAA HRRR Video Generator</a
            >
            - Hosted on private Mac Server, Uploads videos to Firebase Storage
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-api"
              >Firebase Firestore API</a
            >
            - Hosted on Firebase
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-vue-web-app"
              >Vue Web App</a
            >
            - Hosted on Firebase
          </li>
          <li>
            Made possible thanks to many open source tools such as FFMPEG,
            ImageMagik, and many npm packages (@mapbox/blend, axios, firebase,
            firebase-admin, fs-extra, moment, node-cron, and uuid)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const flames = document.querySelectorAll('.fire .flames .flame');

    setTimeout(() => {
      flames.forEach((flame) => {
        flame.style['animation-play-state'] = 'pause';
      });
    }, 3000);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
}

.nav-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  align-items: center;

  a {
    margin: 0 0.5rem 0 0.5rem;
  }
}

.credit {
  .links-list {
    list-style: none;
  }
}

.title {
  font-size: 1.4em;
  font-weight: bold;
}

@media (min-width: 750px) {
  .title {
    font-size: 3em;
    font-weight: bold;
  }
}
</style>
