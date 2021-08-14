<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>NOAA HRRR SMOKE FORECASTS</h1>
    <div>
      <button @click="() => setMode('sfc_smoke')">Near Surface Smoke</button>
      <button @click="() => setMode('vi_smoke')">
        Vertically Integrated Smoke
      </button>
      <button @click="() => setMode('sfc_visibility')">
        Surface Visibility
      </button>
    </div>
    <div v-if="mode === 'sfc_smoke'">
      <h3>Near Surface Smoke</h3>
      <div class="forecast-container">
        <Forecast
          v-for="forecast in forecasts"
          :key="forecast.near_surface_smoke_video_url"
          :timestamp="forecast.timestamp"
          :url="forecast.near_surface_smoke_video_url"
        >
        </Forecast>
      </div>
    </div>
    <div v-if="mode === 'vi_smoke'">
      <h3>Vertically Integrated Smoke</h3>
      <div class="forecast-container">
        <Forecast
          v-for="forecast in forecasts"
          :key="forecast.vertically_integrated_smoke_video_url"
          :timestamp="forecast.timestamp"
          :url="forecast.vertically_integrated_smoke_video_url"
        >
        </Forecast>
      </div>
    </div>
    <div v-if="mode === 'sfc_visibility'">
      <h3>Surface Visibility</h3>
      <div class="forecast-container">
        <Forecast
          v-for="forecast in forecasts"
          :key="forecast.surface_visibility_video_url"
          :timestamp="forecast.timestamp"
          :url="forecast.surface_visibility_video_url"
        >
        </Forecast>
      </div>
    </div>
    <div v-if="isLoading">...LOADING...</div>
    <h2 v-if="!isLoading && forecasts.length === 0">
      No Forecasts Found! Let
      <a href="https://twitter.com/jaredpotter">Jared Know</a>
    </h2>
    <div class="credit">
      <div>
        Created by <a href="https://twitter.com/jaredpotter">Jared Potter</a>
      </div>
      <div>
        Code Found at:
        <ul class="links-list">
          <li>
            <a
              href="https://github.com/JaredPotter/noaa-hrrr-smoke-video-generator"
              >NOAA HRRR Video Generator</a
            >
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-api"
              >Laravel API</a
            >
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-vue-web-app"
              >Vue Web App</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// const CODE_TO_TYPE = {
//   sfc_smoke: 'near-surface-smoke',
//   vi_smoke: 'vertically-integrated-smoke',
//   sfc_visibility: 'surface-visibility',
// };
import axios from 'axios';
import moment from 'moment';
import Forecast from './components/Forecast.vue';

export default {
  name: 'App',
  components: {
    Forecast,
  },
  data() {
    return {
      mode: 'sfc_smoke',
      forecasts: [],
      isLoading: false,
    };
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      const response = await axios.get(
        'https://noaa-hrrr-smoke-api.herokuapp.com/forecasts'
        // 'http://localhost:8000/forecasts'
      );
      // eslint-disable-next-line no-debugger
      // debugger;

      this.forecasts = response.data.data;

      for (const forecast of this.forecasts) {
        forecast.timestamp = moment(forecast.timestamp).format(
          'dddd MMMM Do, h:mma'
        );
      }
    } catch (error) {
      this.isLoading = false;
      console.log(error);
      throw error;
    }

    this.isLoading = false;
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

.credit {
  .links-list {
    list-style: none;
  }
}
</style>
