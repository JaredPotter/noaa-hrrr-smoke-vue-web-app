<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>NOAA HRRR SMOKE 48-HOUR FORECASTS</h1>
    <div>
      Created by <a href="https://twitter.com/jaredpotter">Jared Potter</a>
    </div>
    <div class="nav-bar">
      <router-link to="/north-west">North West</router-link> |
      <router-link to="/utah">Utah</router-link> |
      <router-link to="/colorado">Colorado</router-link> |
      <router-link to="/new-mexico">New Mexico</router-link> |
      <router-link to="/united-states">United States</router-link>
    </div>
    <router-view />
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
              >Laravel API</a
            >
            - Hosted on Heroku, mariaDb hosted on Digital Ocean
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-vue-web-app"
              >Vue Web App</a
            >
            - Hosted on Firebase
          </li>
          <li>
            Made possible thanks to many open source tools such as FFMPEG,
            ImageMagik, and numerous npm packages
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
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

.nav-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    margin: 0 0.5rem 0 0.5rem;
  }
}

.credit {
  .links-list {
    list-style: none;
  }
}
</style>
