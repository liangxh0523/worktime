<template lang="html">
    <div class="">
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="">
                    <el-input
                        placeholder="请输入姓名"
                        suffix-icon="el-icon-search"
                        v-model="userName"
                        size="small"
                        @click="handleNameChange">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="teamTableData">
            <el-table-column
                prop="user_name"
                label="姓名"
                align="center">
            </el-table-column>
            <el-table-column
                 prop="paid_timeoff_all_days"
                 label="带薪请假天数"
                 align="center">
            </el-table-column>
            <el-table-column
                 prop="no_paid_timeoff_all_days"
                 label="非带薪请假天数"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="expect_exchange_all_days"
                label="预计补班天数"
                align="center">
            </el-table-column>
            <el-table-column
                 prop="actual_exchange_all_days"
                 label="实际补班天数"
                 align="center">
            </el-table-column>
            <el-table-column
                 prop="annual_leave_use_days"
                 label="年假使用天数"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="annual_leave_unuse_days"
                label="年假未使用天数"
                align="center">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="34">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //姓名
            userName: '',
            //当前页
            currentPage: 1,
            //表格数据
            tableData: [{
                "actual_exchange_all_days":1,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"qianyun.chen@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":1,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":1,
                "user_name":"\u9648\u5343\u4e91"
            },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"tian.chen@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":3,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":3,
                "user_name":"\u9648\u751c"
                },{
                "actual_exchange_all_days":1,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"chengwen.cui@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":1,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":1,
                "user_name":"\u5d14\u627f\u6587"
            },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"yiming.dong@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":1,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":1,
                "user_name":"\u8463\u4e00\u9e23"
                },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":2,
                "division":"010",
                "email":"baoqi.guo@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":1,
                "paid_timeoff_all_days":2,
                "total_timeoff_days":3,
                "user_name":"\u90ed\u5b9d\u742a"
                },{
                "actual_exchange_all_days":2,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"xinyuan.hu@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":2,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":2,
                "user_name":"\u80e1\u6b23\u6e90"
                },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"kemin.jiang@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":22,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":22,
                "user_name":"\u848b\u53ef\u654f"
                },{
                "actual_exchange_all_days":1,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":3,
                "division":"010",
                "email":"meng.jin@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":1,
                "paid_timeoff_all_days":3,
                "total_timeoff_days":4,
                "user_name":"\u91d1\u840c"
                },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":0,
                "division":"010",
                "email":"danmeng.li@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":3,
                "paid_timeoff_all_days":0,
                "total_timeoff_days":3,
                "user_name":"\u674e\u4e39\u68a6"
                },{
                "actual_exchange_all_days":0,
                "annual_leave_all_days":0,
                "annual_leave_unuse_days":0,
                "annual_leave_use_days":2,
                "division":"010",
                "email":"hao.li@ihandysoft.com",
                "expect_exchange_all_days":0,
                "no_paid_timeoff_all_days":0,
                "paid_timeoff_all_days":2,
                "total_timeoff_days":2,
                "user_name":"\u674e\u8c6a"
                }],
        }
    },
    methods: {
        //搜索姓名
        handleNameChange(item) {
            console.log(item)
        },
        //每页的个数变化
        handleSizeChange(item) {
            console.log(item);
        },
        //跳转到某一页
        handleCurrentChange(item) {
            console.log(item);
        }
    }
}
</script>

<style lang="css">
.teamTableData {
    margin: 40px auto;
}
</style>
