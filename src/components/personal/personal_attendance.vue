<template lang="html">
    <div class="">
        <div class="">
            <div class="submitButton">
                <el-button
                    type="primary"
                    size="small"
                    @click="handleTimeoff">
                    请假申请
                </el-button>
            </div>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="personalTable">
            <el-table-column
                prop="attendance_date"
                label="日期"
                align="center">
            </el-table-column>
            <el-table-column
                label="打卡记录"
                align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.updated_start_time}}</span>
                    <span>--</span>
                    <span>{{scope.row.updated_end_time}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="工作时长"
                align="center">
                <template slot-scope="scope">
                    {{(scope.row.updated_duration/3600).toFixed(1)}}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="24">
        </el-pagination>
        <el-dialog
            title="请假申请单"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose">
            <el-form
                :model="timeoffForm"
                label-position="right"
                label-width="140px">
                <el-form-item
                    label="请假起止日期">
                    <el-date-picker
                        v-model="timeoffForm.timeoff_date"
                        type="daterange"
                        align="right"
                        unlink-panels
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
                        size="small"
                        :min="1"
                        class="inputForm">
                    </el-input-number>
                </el-form-item>
                <el-form-item
                    label="请假类型">
                    <el-select
                        v-model="timeoffForm.timeoff_type"
                        placeholder="请选择请假类型"
                        size="small"
                        class="inputForm">
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
                        v-model="timeoffForm.except_exchange_date"
                        placeholder="选择一个或多个日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="请假原因">
                    <el-input
                        type="textarea"
                        :rows="5"
                        v-model="timeoffForm.decs"
                        size="small"
                        class="textareaDecs">
                    </el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    @click="handleClose"
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
            //请假单的显示
            dialogFormVisible: false,
            //请假单
            timeoffForm: {
                timeoff_date: [],
                timeoff_day: 1,
                timeoff_type: '',
                except_exchange_date: [],
                decs: ''
            },
            //请假类型
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
                "attendance_date":"2018-05-30",
                "create_time":1527753859,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-30",
                "is_changed":false,
                "original_duration":43014,
                "status":"normal",
                "update_time":1527753859,
                "updated_duration":43014,
                "updated_end_time":"22:57",
                "updated_start_time":"10:00",
                "workday":1
            },{
                "attendance_date":"2018-05-29",
                "create_time":1527667627,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-29",
                "is_changed":false,
                "original_duration":36614,
                "status":"normal",
                "update_time":1527667627,
                "updated_duration":36614,
                "updated_end_time":"21:07",
                "updated_start_time":"09:57",
                "workday":1
            },{
                "attendance_date":"2018-05-28",
                "create_time":1527647622,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-28",
                "is_changed":false,
                "original_duration":36210,
                "status":"normal",
                "update_time":1527647622,
                "updated_duration":36210,
                "updated_end_time":"21:01",
                "updated_start_time":"09:57",
                "workday":1
            },{
                "attendance_date":"2018-05-26",
                "create_time":1527647620,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-26",
                "is_changed":false,
                "original_duration":34758,
                "status":"normal",
                "update_time":1527647620,
                "updated_duration":34758,
                "updated_end_time":"20:56",
                "updated_start_time":"10:16",
                "workday":1
            },{
                "attendance_date":"2018-05-25",
                "create_time":1527647616,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-25",
                "is_changed":false,
                "original_duration":35747,
                "status":"normal",
                "update_time":1527647616,
                "updated_duration":35747,
                "updated_end_time":"20:55",
                "updated_start_time":"09:59",
                "workday":1
            },{
                "attendance_date":"2018-05-24",
                "create_time":1527647613,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-24",
                "is_changed":false,"original_duration":35336,
                "status":"normal",
                "update_time":1527647613,
                "updated_duration":35336,
                "updated_end_time":"20:33",
                "updated_start_time":"09:44",
                "workday":1
            },{
                "attendance_date":"2018-05-23",
                "create_time":1527647609,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-23",
                "is_changed":false,
                "original_duration":40052,
                "status":"normal",
                "update_time":1527647609,
                "updated_duration":40052,
                "updated_end_time":"21:46",
                "updated_start_time":"09:38",
                "workday":1
            },{
                "attendance_date":"2018-05-22",
                "create_time":1527647608,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-22",
                "is_changed":false,
                "original_duration":36491,
                "status":"normal",
                "update_time":1527647608,
                "updated_duration":36491,
                "updated_end_time":"21:11",
                "updated_start_time":"10:03",
                "workday":1
            },{
                "attendance_date":"2018-05-21",
                "create_time":1527647604,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-21",
                "is_changed":false,
                "original_duration":35872,
                "status":"normal",
                "update_time":1527647604,
                "updated_duration":35872,
                "updated_end_time":"21:09",
                "updated_start_time":"10:12",
                "workday":1
            },{
                "attendance_date":"2018-05-20",
                "create_time":1527647604,
                "email":"xiaohui.liang@ihandysoft.com",
                "id":"xiaohui.liang@ihandysoft.com2018-05-20",
                "is_changed":false,
                "original_duration":0,
                "status":"normal",
                "update_time":1527647604,
                "updated_duration":0,
                "updated_end_time":"19:49",
                "updated_start_time":"19:49",
                "workday":0
            }]
        }
    },
    methods: {
        //打开请假申请表
        handleTimeoff() {
            this.dialogFormVisible = true;
        },
        //每页的个数发生变化
        handleSizeChange(item) {
            console.log(item);
        },
        //跳转到某页
        handleCurrentChange(item) {
            console.log(item);
        },
        //清空数据
        handleClose() {
            this.timeoffForm = {
                timeoff_date: [],
                timeoff_day: 1,
                timeoff_type: '',
                except_exchange_date: [],
                decs: ''
            };
            this.dialogFormVisible = false;
        },
        //提交表单
        submitForm() {
            console.log("提交成功");
            this.handleClose();
        }
    }
}
</script>

<style lang="css">
.submitButton {
    float:right;
}
.personalTable {
    margin-bottom: 40px
}
.textareaDecs {
    width: 350px;
}
.inputForm {
    width: 220px;
}
</style>
