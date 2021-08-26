<template>
  <div class="forecast-container">
    <div class="date-time">
      {{ timestamp }}
    </div>
    <video class="video-element" controls loop playsinline>
      <source :src="vp9WebmUrl" type="video/webm" />
      <source :src="h265Mp4Url" type="video/mp4" />
      <source :src="h264Mp4Url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    timestamp: String,
    vp9WebmUrl: String,
    h265Mp4Url: String,
    h264Mp4Url: String,
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
