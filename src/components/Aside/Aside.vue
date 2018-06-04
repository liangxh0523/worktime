<template>
    <el-menu
        :default-active="defaultActive"
        router>
        <el-menu-item
            v-for="(item, index) in fullMenu"
            :index="item.pathname"
            :key="index"
            class="menu">
            <span slot="title">{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            fullMenu: [
                {
                   name: '团队出勤统计',
                   pathname: '/team_attendance'
               }, {
                   name: '团队请假统计',
                   pathname: '/team_vocation'
               }, {
                   name: '团队年度统计',
                   pathname: '/team_statistics'
               }, {
                   name: '个人出勤信息',
                   pathname: '/personal_attendance'
               }, {
                   name: '个人请假信息',
                   pathname: '/personal_vocation'
               }
            ]
        }
    },
    computed: {
        defaultActive() {
            return this.$route.path
        }
    }
}
</script>

<style lang="css">
.menu {
    text-align: center;
    font-size: 16px;
}
</style>
