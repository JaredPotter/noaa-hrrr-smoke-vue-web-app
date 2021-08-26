<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>NOAA HRRR SMOKE FORECASTS</h1>
    <div>
      <button @click="() => setMode('sfc_smoke')">Near Surface Smoke</button>
      <button @click="() => setMode('vi_smoke')">
        Vertically Integrated Smoke
      </button>
    </div>
    <div v-if="mode === 'sfc_smoke'">
      <h3>Near Surface Smoke</h3>
      <div class="forecast-container">
        <Forecast
          v-for="forecast in forecasts"
          :key="forecast.near_surface_smoke_video_url_h264"
          :timestamp="forecast.timestamp"
          :vp9WebmUrl="forecast.near_surface_smoke_video_url_vp9"
          :h265Mp4Url="forecast.near_surface_smoke_video_url_h265"
          :h264Mp4Url="forecast.near_surface_smoke_video_url_h264"
        >
        </Forecast>
      </div>
    </div>
    <div v-if="mode === 'vi_smoke'">
      <h3>Vertically Integrated Smoke</h3>
      <div class="forecast-container">
        <Forecast
          v-for="forecast in forecasts"
          :key="forecast.vertically_integrated_smoke_video_url_h264"
          :timestamp="forecast.timestamp"
          :vp9WebmUrl="forecast.vertically_integrated_smoke_video_url_vp9"
          :h265Mp4Url="forecast.vertically_integrated_smoke_video_url_h265"
          :h264Mp4Url="forecast.vertically_integrated_smoke_video_url_h264"
        >
        </Forecast>
      </div>
    </div>
    <div v-if="isLoading"><div class="lds-dual-ring"></div></div>
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
            - Hosted on private Mac Server, Uploads videos to Firebase Storage
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-api"
              >Laravel API</a
            >
            - Hosted on Heroku
          </li>
          <li>
            <a href="https://github.com/JaredPotter/noaa-hrrr-smoke-vue-web-app"
              >Vue Web App</a
            >
            - Hosted on Firebase
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

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #41b883;
  border-color: #41b883 transparent #41b883 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
