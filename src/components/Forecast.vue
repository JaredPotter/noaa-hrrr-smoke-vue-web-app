<template>
  <div class="forecast-container">
    <div class="date-time">
      {{ timestamp }}
    </div>
    <video class="video-element" controls loop>
      <source :src="url" type="video/mp4" />
      <!-- <source src="movie.ogg" type="video/ogg" /> -->
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    timestamp: String,
    url: String,
  },
};
</script>

<style lang="scss">
.forecast-container {
  .video-element {
    width: 100%;
  }
}
</style>
