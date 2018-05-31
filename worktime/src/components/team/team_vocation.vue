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
            <el-col :span="20">
                <div class="">
                    <el-date-picker
                        v-model="userDate"
                        size="small"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="searchUserDate">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //搜索用户姓名
            userName: '',
            //搜索日历下的数据
            userDate: [],
            //日历选择器的快捷键
            pickerOptions: {
                shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
                }]
            },
        }
    },
    methods: {
        //搜索用户姓名的方法
        handleNameChange() {
            console.log("搜索姓名");
        },
        //按照日历搜索数据
        searchUserDate(item) {
            console.log(item);
        }
    }
}
</script>

<style lang="css">
</style>
