<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>NOAA HRRR SMOKE FORECASTS</h1>
    <div>
      <button @click="mode = 'sfc_smoke'">Near Surface Smoke</button>
      <button @click="mode = 'vi_smoke'">Vertically Integrated Smoke</button>
      <button @click="mode = 'sfc_visibility'">Surface Visibility</button>
    </div>
    <div v-if="mode === 'sfc_smoke'">
      <h3>Near Surface Smoke</h3>
      <div class="forecast-container">
        <div v-for="forecast in forecasts" :key="forecast.id" class="forecast">
          <div class="date-time">
            {{ forecast.timestamp }}
          </div>
          <video width="1200" height="1200" controls loop>
            <source
              :src="forecast.near_surface_smoke_video_url"
              type="video/mp4"
            />
            <!-- <source src="movie.ogg" type="video/ogg" /> -->
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <div v-if="mode === 'vi_smoke'">
      <h3>Vertically Integrated Smoke</h3>
      <div class="forecast-container">
        <div v-for="forecast in forecasts" :key="forecast.id" class="forecast">
          <div class="date-time">
            {{ forecast.timestamp }}
          </div>
          <video width="1200" height="1200" controls loop>
            <source
              :src="forecast.vertically_integrated_smoke_video_url"
              type="video/mp4"
            />
            <!-- <source src="movie.ogg" type="video/ogg" /> -->
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <div v-if="mode === 'sfc_visibility'">
      <h3>Surface Visibility</h3>
      <div class="forecast-container">
        <div v-for="forecast in forecasts" :key="forecast.id" class="forecast">
          <div class="date-time">
            {{ forecast.timestamp }}
          </div>
          <video width="1200" height="1200" controls loop>
            <source
              :src="forecast.surface_visibility_video_url"
              type="video/mp4"
            />
            <!-- <source src="movie.ogg" type="video/ogg" /> -->
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <div v-if="isLoading">...LOADING...</div>
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

export default {
  name: 'App',
  components: {},
  data() {
    return {
      mode: 'sfc_smoke',
      forecasts: [],
      isLoading: false,
    };
  },
  async mounted() {
    try {
      this.isLoading = true;
      const response = await axios.get(
        'https://noaa-hrrr-smoke-api.herokuapp.com/forecasts'
        // 'http://localhost:8000/forecasts'
      );

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
