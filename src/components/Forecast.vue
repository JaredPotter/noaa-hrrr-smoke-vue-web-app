<template>
  <div class="forecast-container">
    <div v-if="isLoading"><div class="lds-dual-ring"></div></div>
    <h2 v-if="!isLoading && !currentForecast">
      No Forecasts Found! Let
      <a href="https://twitter.com/jaredpotter">Jared</a> Know
    </h2>
    <div v-if="currentForecast" class="current-forecast-container">
      <button class="button" @click="() => setMode('sfc_smoke')">
        Near Surface Smoke
      </button>
      <button class="button" @click="() => setMode('vi_smoke')">
        Vertically Integrated Smoke
      </button>
      <div class="date-time">
        {{ timestamp }}
      </div>
      <div v-if="mode === 'sfc_smoke'">
        <h3>Near Surface Smoke - Latest Forecast</h3>
        <div class="forecast-container">
          <video
            class="video-element"
            :key="currentForecast.near_surface_smoke_video_url_vp9"
            controls
            loop
            playsinline
            preload="metadata"
          >
            <source
              :src="currentForecast.near_surface_smoke_video_url_vp9 + '#t=0.1'"
              type="video/webm"
            />
            <source
              :src="
                currentForecast.near_surface_smoke_video_url_h265 + '#t=0.1'
              "
              type="video/mp4"
            />
            <source
              :src="
                currentForecast.near_surface_smoke_video_url_h264 + '#t=0.1'
              "
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div v-if="mode === 'vi_smoke'">
        <h3>Vertically Integrated Smoke - Latest Forecast</h3>
        <div class="forecast-container">
          <video
            class="video-element"
            :key="currentForecast.vertically_integrated_smoke_video_url_vp9"
            controls
            loop
            playsinline
            preload="metadata"
          >
            <source
              :src="
                currentForecast.vertically_integrated_smoke_video_url_vp9 +
                  '#t=0.1'
              "
              type="video/webm"
            />
            <source
              :src="
                currentForecast.vertically_integrated_smoke_video_url_h265 +
                  '#t=0.1'
              "
              type="video/mp4"
            />
            <source
              :src="
                currentForecast.vertically_integrated_smoke_video_url_h264 +
                  '#t=0.1'
              "
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import moment from 'moment';
import { app } from '../FirebaseService';
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

export default {
  data() {
    return {
      mode: 'sfc_smoke',
      currentForecast: null,
      isLoading: false,
    };
  },
  watch: {
    async $route() {
      await this.fetchForecast();
    },
  },
  async mounted() {
    await this.fetchForecast();
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
    async fetchForecast() {
      const area = this.$route.params.area;

      if (!area) {
        this.$router.push('/');
      }

      try {
        this.isLoading = true;

        const forecastsCollectionRef = collection(db, 'forecasts');
        const q = query(forecastsCollectionRef, where('areaCode', '==', area));
        const querySnapshot = await getDocs(q);

        const forecasts = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          forecasts.push(doc.data());
        });

        if (forecasts.length === 0) {
          console.log('No forecast found for ' + area);
          this.$router.push('/');
        } else {
          this.currentForecast = forecasts[0];
          this.currentForecast.timestamp = moment(
            this.currentForecast.timestamp
          ).format('dddd MMMM Do, h:mma');
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        throw error;
      }

      this.isLoading = false;
    },
  },
  props: {
    timestamp: String,
    forecast: Object,
  },
};
</script>

<style lang="scss">
.forecast-container {
  .button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 1rem;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.75;
  }

  .video-element {
    width: 100%;
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
