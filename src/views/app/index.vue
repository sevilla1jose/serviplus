<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
    </main>
  </div>
</template>
<script>

import TopNav from '@/container/TopNav'

export default {
  data () {
    return { 
      show: false
    }
  },
  components: {
    TopNav
  }
}
</script>