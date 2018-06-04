<template lang="html">
    <div class="">
        <div class="">
            <el-button
                type="primary"
                @click="timeoffFormDisplay"
                class="timeoffButton"
                size="small">
                请假申请
            </el-button>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="tableDatadisplay">
            <el-table-column
                label="请假日期"
                align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.timeoff_date[0]}}</span>
                    <span>--</span>
                    <span>{{scope.row.timeoff_date[1]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="timeoff_days"
                label="请假天数"
                align="center">
            </el-table-column>
            <el-table-column
                prop="timeoff_type"
                label="请假类型"
                align="center">
            </el-table-column>
            <el-table-column
                label="预计补班日期"
                align="center">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.expect_exchange_date.length === 0 ? '无': scope.row.expect_exchange_date.join('/') }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="实际补班日期"
                align="center">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.actual_exchange_date.length === 0 ? '无': scope.row.actual_exchange_date.join('/')}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 7, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="13">
        </el-pagination>
        <el-dialog
            title="请假申请单"
            :visible.sync="dialogFormVisible"
            :before-close="handleDialogClose">
            <el-form
                :model="timeoffForm"
                label-position="right"
                label-width="140px">
                <el-form-item
                    label="请假起止日期">
                    <el-date-picker
                        v-model="timeoffForm.timeoff_date"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="请假天数">
                    <el-input-number
                        v-model="timeoffForm.timeoff_day"
                        class="timeoffType"
                        :min="1"
                        size="small">
                    </el-input-number>
                </el-form-item>
                <el-form-item
                    label="请假类型">
                    <el-select
                        v-model="timeoffForm.timeoff_type"
                        placeholder="请选择请假类型"
                        class="timeoffType"
                        size="small">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="预计补班日期">
                    <el-date-picker
                        type="dates"
                        v-model="timeoffForm.expect_date"
                        placeholder="选择一个或多个日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="请假原因">
                    <el-input
                        class="timeoffDecs"
                        type="textarea"
                        :rows="5"
                        v-model="timeoffForm.decs"
                        size="small">
                    </el-input>
                </el-form-item>
            </el-form>
                <div
                    slot="footer"
                    class="dialog-footer">
                    <el-button
                        @click="handleDialogClose"
                        size="small">
                        取 消
                    </el-button>
                    <el-button
                        type="primary"
                        @click="submitForm"
                        size="small">
                        确 定
                    </el-button>
                </div>
          </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            //当前页
            currentPage: 1,
            //dialog的显示
            dialogFormVisible: false,
            //表单初始化
            timeoffForm: {
                timeoff_date: [],
                timeoff_day: 1,
                timeoff_type: '',
                expect_date: [],
                decs: ''
            },
            //选择器
            options: [{
                value: '事假',
                label: '事假'
            }, {
                value: '病假',
                label: '病假'
            }, {
                value: '婚假',
                label: '婚假'
            }, {
                value: '年假',
                label: '年假'
            }, {
                value: '产假',
                label: '产假'
            }, {
                value: '丧假',
                label: '丧假'
            }, {
                value: '陪产假',
                label: '陪产假'
            }],
            //表格数据
            tableData: [{
                "actual_exchange_date":[],
                "actual_exchange_days":0,
                "create_time":"Wed, 23 May 2018 02:18:07 GMT",
                "desc":null,
                "division":"089",
                "email":"xiaohui.liang@ihandysoft.com",
                "expect_exchange_date":["2018-06-16","2018-06-17"],
                "expect_exchange_days":0,
                "is_approval_timeoff":"yes",
                "is_canceled":"no",
                "is_confirm_exchange":false,
                "is_paid":"yes",
                "primary_id":"88455689581578618347",
                "timeoff_date":["2018-05-16","2018-05-17"],
                "timeoff_days":2,
                "timeoff_type":"\u5e74\u5047",
                "update_time":"Wed, 23 May 2018 02:18:07 GMT",
                "user_name":"\u6881\u6653\u6167"
            },{
                "actual_exchange_date":["2018-05-16","2018-05-17"],
                "actual_exchange_days":0,
                "create_time":"Thu, 17 May 2018 02:48:39 GMT",
                "desc":null,
                "division":"089",
                "email":"xiaohui.liang@ihandysoft.com",
                "expect_exchange_date":[],
                "expect_exchange_days":0,
                "is_approval_timeoff":"yes",
                "is_canceled":"no",
                "is_confirm_exchange":false,
                "is_paid":"no",
                "primary_id":"42736165436299273853",
                "timeoff_date":["2018-05-04","2018-05-04"],
                "timeoff_days":1,
                "timeoff_type":"\u4e8b\u5047",
                "update_time":"Thu, 17 May 2018 02:48:39 GMT",
                "user_name":"\u6881\u6653\u6167"
            }]
        }
    },
    methods: {
        //处理页面跳转请求
        handleCurrentChange(item) {
            console.log(item);
        },
        //处理每页的个数发生变化
        handleSizeChange(item) {
            console.log(item);
        },
        //打开请假申请单
        timeoffFormDisplay() {
            this.dialogFormVisible = true;
        },
        //当对话框关闭时，初始化数据
        handleDialogClose() {
            this.timeoffForm = {
                timeoff_date: [],
                timeoff_day: 1,
                timeoff_type: '',
                expect_date: [],
                decs: ''
            };
            this.dialogFormVisible = false;
        },
        //提交请假申请单
        submitForm() {
            console.log("提交请假申请单");
            this.handleDialogClose();
        }
    }
}
</script>

<style lang="css">
.timeoffButton {
    float: right;
}
.tableDatadisplay {
    margin-bottom: 40px;
}
.timeoffDecs {
    width: 350px;
}
.timeoffType {
    width: 220px;
}
</style>
