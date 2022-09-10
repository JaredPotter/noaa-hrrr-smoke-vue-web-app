<template>
  <div id="app">
    <div class="fire-container">
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
    <h1>SMOKE 48-HOUR FORECAST (NOAA HRRR)</h1>
    <div>
      Created by <a href="https://twitter.com/jaredpotter">Jared Potter</a>
    </div>
    <div class="nav-bar">
      <router-link to="/north-west">North West</router-link> |
      <router-link to="/utah">Utah</router-link> |
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
        // flame.style['animation-play-state'] = 'paus
        // flame.style['animation'] = '1.5s ease-out';
        // animation: flameeven 1.5s ease-in infinite;
      });
    }, 2000);
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

.fire-container {
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: center;
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
