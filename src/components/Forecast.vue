<template>
  <div class="forecast-container">
    <div v-if="isLoading" class="fire-container">
      <div class="fire">
        <div class="flames">
          <div class="flame"></div>
          <div class="flame"></div>
          <div class="flame"></div>
          <div class="flame"></div>
        </div>
        <div class="logs"></div>
      </div>
    </div>
    <h2 v-if="!isLoading && !currentForecast">
      No Forecasts Found! Let
      <a href="https://twitter.com/jaredpotter">Jared</a> Know
    </h2>
    <div v-if="currentForecast" class="current-forecast-container">
      <h3>
        Latest Forecast - Last Updated {{ timeAgo }} (updates every ~6 hours)
      </h3>
      <div v-if="mode === 'sfc_smoke' && !isLoading">
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
      <div v-if="mode === 'vi_smoke' && !isLoading">
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
      <button
        class="button"
        :class="{ 'button-selected button': mode === 'sfc_smoke' }"
        @click="() => setMode('sfc_smoke')"
      >
        Near Surface Smoke
      </button>
      <button
        class="button"
        :class="{ 'button-selected button': mode === 'vi_smoke' }"
        @click="() => setMode('vi_smoke')"
      >
        Vertically Integrated Smoke
      </button>
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
  orderBy,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

export default {
  data() {
    return {
      mode: 'sfc_smoke',
      currentForecast: null,
      isLoading: false,
      timeAgo: null,
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
        let q = query(
          forecastsCollectionRef,
          orderBy('timestamp', 'desc'),
          where('areaCode', '==', area)
        );
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
          const timestamp = this.currentForecast.timestamp;
          const momentTimestamp = moment.unix(timestamp);

          this.formattedTimestamp = momentTimestamp.format(
            'yyyy dddd MMMM Do, h:mma'
          );
          // this.timeAgo = new moment(this.currentForecast.timestamp).fromNow();
          this.timeAgo = momentTimestamp.fromNow();
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        throw error;
      }

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
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

  .button-selected {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    opacity: 0.75;
  }

  .button:hover {
    opacity: 0.75;
  }

  .video-element {
    width: 100%;
  }
}

.fire-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
}

.fire {
  height: 12rem;
  width: 12rem;
  margin-top: 8rem;
}
.fire .flames {
  width: 60%;
  height: 60%;
  transform: translateX(32%) translateY(2%) rotate(45deg);
}
.fire .flames .flame {
  position: absolute;
  right: 0%;
  bottom: 0%;
  width: 0%;
  height: 0%;
  background-color: #ffdc01;
  border-radius: 1vw;
}
.fire .flames .flame:nth-child(2n + 1) {
  animation: flameodd 1.5s ease-in infinite;
}
.fire .flames .flame:nth-child(2n) {
  animation: flameeven 1.5s ease-in infinite;
}
@keyframes with_delay {
  0% {
    background: red;
  }
  75% {
    background: green;
  }
  100% {
    background: green;
  }
}

.fire .flames .flame:nth-child(1) {
  animation-delay: 0s;
}
.fire .flames .flame:nth-child(2) {
  animation-delay: 0.375s;
}
.fire .flames .flame:nth-child(3) {
  animation-delay: 0.75s;
}
.fire .flames .flame:nth-child(4) {
  animation-delay: 1.125s;
}
.fire .logs {
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 15%;
}
.fire .logs:before,
.fire .logs:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  transform: rotate(20deg);
  height: 100%;
  width: 100%;
  border-radius: 1vw;
  background-color: #70392f;
}
.fire .logs:before {
  transform: rotate(-20deg);
  background-color: #612e25;
}
@keyframes flameodd {
  0%,
  100% {
    width: 0%;
    height: 0%;
  }
  25% {
    width: 100%;
    height: 100%;
  }
  0% {
    background-color: #ffdc01;
    z-index: 1000000;
  }
  40% {
    background-color: #fdac01;
    z-index: 1000000;
  }
  100% {
    background-color: #f73b01;
    z-index: -10;
  }
  0% {
    right: 0%;
    bottom: 0%;
  }
  25% {
    right: 1%;
    bottom: 2%;
  }
  100% {
    right: 150%;
    bottom: 170%;
  }
}
@keyframes flameeven {
  0%,
  100% {
    width: 0%;
    height: 0%;
  }
  25% {
    width: 100%;
    height: 100%;
  }
  0% {
    background-color: #ffdc01;
    z-index: 1000000;
  }
  40% {
    background-color: #fdac01;
    z-index: 1000000;
  }
  100% {
    background-color: #f73b01;
    z-index: -10;
  }
  0% {
    right: 0%;
    bottom: 0%;
  }
  25% {
    right: 2%;
    bottom: 1%;
  }
  100% {
    right: 170%;
    bottom: 150%;
  }
}
</style>
