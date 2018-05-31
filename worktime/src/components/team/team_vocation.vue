<template lang="html">
    <div class="">
        <el-row :gutter="10">
            <el-col :span="4">
                <div class="">
                    <el-input
                        placeholder="请输入姓名"
                        suffix-icon="el-icon-search"
                        size="small"
                        v-model="userName"
                        @change="handleNameChange">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="">
                </div>
            </el-col>
            <el-col :span="3">
                <div class="">
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    data() {
        return {
            userName: '',
        }
    },
    methods: {
        handleNameChange() {
            console.log("搜索姓名");
        }
    }
}
</script>

<style lang="css">
</style>
