<template>
  <div class="head">
    <ul>
      <li>
        <router-link to="/inMed"  active-class="focus">进药查询</router-link>
      </li>
      <li>
        <router-link to="/outMed"  active-class="focus">售药查询</router-link>
      </li>
      <li>
        <router-link to="/haveMed"  active-class="focus">库存查询</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'head-comp',
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  text-decoration: none;
  color: inherit;
}
ul{
  width: 100%;
  height: 60px;
  list-style: none;
  display: block;
  background:black;

}
ul li{
  float: left;
  width: 33%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 16px;
}

.focus{
  color:#f60;
}
</style>
