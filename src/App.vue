<template>
  <div id="app1">
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
      <!--<b-navbar-brand to="/" @click="resetUserInput"><img class="ml-2" src="assets/textlogo.png" alt="Question-Machine" title="Question-Machine" height="30"></b-navbar-brand>-->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" class="ml-2">qanda/machine</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <main role="main" class="container">
      <router-view/>
    </main>
    <hr class="mt-5" />
    <footer class="footer">
      <div class="container">
        <p class="text-muted text-center"><small>qandamachine is a project of the <a href="https://www.uts.edu.au/">University of Technology, Sydney</a>  &copy; 2021</small></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    this.$store.commit('setRefEntities',{reload: true})
  }
}
</script>


<style lang="scss">
#app1 {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
}
</style>