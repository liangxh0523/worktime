<template>
    <div id="app">
        <el-container>
            <el-aside width="250px">
                <div>
                    <img
                        src="@/assets/logo.png"
                        alt="公司的图标"
                        class="business_logo">
                </div>
                <div
                    class="personal_position">
                    <img
                        src="@/assets/profile.png"
                        alt="个人的头像"
                        class="personal_logo">
                </div>
                <div class="personal_name">
                    <p>{{personalName}}</p>
                </div>
                <i-aside
                    class="menu"/>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Aside from '@/components/Aside/Aside';

export default {
  name: 'App',
  data() {
      return {
          personalName: "生活要向我这只小猫咪动手啦"
      }
  },
  components: {
      iAside: Aside
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.business_logo {
    width: 20%;
}
.personal_position {
    text-align: center;
}
.personal_logo {
    width: 20%;
    height: 20%;
}
.personal_name {
    text-align: center;
    font-size: 16px;
}

</style>
