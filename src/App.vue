<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  // created(){
  //   const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
  //   console.log(process.env.APIPATH, process.env.CUSTOMPATH);
  //   this.$http.get(api).then((response) => {
  //   });
  // },
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common['Authorization'] = myCookie;
  }
}
</script>

<style lang="scss">

@import "./assets/all";
</style>
