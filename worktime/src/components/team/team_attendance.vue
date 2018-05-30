<template lang="html">
    <div class="">
        <el-row :gutter="10">
            <el-col :span="4">
                <div class="">
                    <el-input
                        placeholder="请输入姓名"
                        suffix-icon="el-icon-search"
                        v-model="userName"
                        @change="searchUserName">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="">
                    <el-date-picker
                        v-model="userDateRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="searchUserDate"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="">
                    <el-button
                        type="primary"
                        icon="el-icon-bell"
                        @click="infoNotify"
                        :disabled="selectionItem.length === 0? true: false">
                        发送提醒
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="dataTable"
            @filter-change="handleFilterChange"
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'attendance_date', order: 'descending'}"
            >
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="user_name"
                label="姓名"
                align="center">
            </el-table-column>
            <el-table-column
                prop="attendance_date"
                label="打卡日期"
                sortable
                align="center">
            </el-table-column>
            <el-table-column
                label="打卡记录"
                align="center">
                <template slot-scope="scope">
                    <div :class="{red: (scope.row.status === '异常'), blue: ((scope.row.status === '补打卡') || (scope.row.status === '请假')) }">
                        <span>{{scope.row.updated_start_time}}</span>
                        <span>--</span>
                        <span>{{scope.row.updated_end_time}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="工作时长(h)"
                align="center">
                <template slot-scope="scope">
                    <span :class="{red:(scope.row.status === '异常'), blue: ((scope.row.status === '请假') || (scope.row.status === '补打卡')) }">
                        {{((scope.row.updated_duration)/3600).toFixed(1)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="status"
                column-key="status"
                :filters="tableStatus"
                align="center">
                <template slot-scope="scope">
                    <span :class="{red: scope.row.status === '异常', blue: ((scope.row.status === '补打卡') || (scope.row.status === '请假'))}">
                        {{scope.row.status}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                fixed="right">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            icon="el-icon-edit"
                            size="small"
                            @click="openEditDialog(scope.row)">
                        </el-button>
                        <el-button
                            icon="el-icon-more"
                            size="small">
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20">
        </el-pagination>
        <el-dialog
            title="状态更改"
            :visible.sync="editDialogVisible"
            width="50%"
            :before-close="editHandleClose">
            <el-row :gutter="20">
                <el-col :span="3" :offset="4">
                    <div class="">
                        原始状态
                    </div>
                </el-col>
                <el-col :span="17">
                    <div class="">
                        {{oldStatus}}
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="4">
                    <div class="">
                        更改状态
                    </div>
                </el-col>
                <el-col :span="17">
                    <el-select v-model="newStatus" placeholder="请选择">
                        <el-option
                          v-for="item in statusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //用户名
            userName: '',
            //日期
            userDateRange: [],
            //信息被选中的列表
            selectionItem: [],
            //
            tableStatus: [{ text: '异常', value: '异常' },{ text: '正常', value: '正常' },{ text: '请假', value: '请假' },{ text: '打卡', value: '打卡' }],
            //默认页
            currentPage: 1,
            //编辑对话框的展示与退出
            editDialogVisible: false,
            //原始状态
            oldStatus: '',
            // 新状态
            newStatus: '',
            //状态选择器内备选项
            statusOptions: [{
                value: 'patch',
                label: '补打卡'
            },{
                value: 'timeoff',
                label: '请假'
            }],
            //日历选择器的快捷选项
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
            //模拟表格数据
            tableData: [
                {
                "attendance_date": "2018-05-14",
                "create_time": 1527561778,
                "division": "030",
                "email": "yuqing.han@ihandysoft.com",
                "id": "yuqing.han@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u5f02\u5e38",
                "update_time": 1527561778,
                "updated_duration": 0,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u97e9\u96e8\u6674",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-16",
                "create_time": 1527561778,
                "division": "095",
                "email": "peishan.han@ihandysoft.com",
                "id": "peishan.han@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u6b63\u5e38",
                "update_time": 1527561778,
                "updated_duration": 56006,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u97e9\u4f69\u73ca",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-19",
                "create_time": 1527561778,
                "division": "010",
                "email": "shisheng.huang@ihandysoft.com",
                "id": "shisheng.huang@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u8bf7\u5047",
                "update_time": 1527561778,
                "updated_duration": 56006,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u9ec4\u8bd7\u665f",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-22",
                "create_time": 1527561766,
                "division": "045",
                "email": "shengnan.huang@ihandysoft.com",
                "id": "shengnan.huang@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u8865\u6253\u5361",
                "update_time": 1527561766,
                "updated_duration": 0,
                "updated_end_time": "21:05",
                "updated_start_time": "21:05",
                "user_name": "\u9ec4\u80dc\u6960",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-25",
                "create_time": 1527561778,
                "division": "085",
                "email": "yueqin.huang@ihandysoft.com",
                "id": "yueqin.huang@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u5f02\u5e38",
                "update_time": 1527561778,
                "updated_duration": 56006,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u9ec4\u8d8a\u94a6",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-17",
                "create_time": 1527561777,
                "division": "099",
                "email": "hh@ihandysoft.com",
                "id": "hh@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u6b63\u5e38",
                "update_time": 1527561777,
                "updated_duration": 0,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u9ec4\u6ec9",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-26",
                "create_time": 1527561778,
                "division": "050",
                "email": "xiaotao.lei@ihandysoft.com",
                "id": "xiaotao.lei@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u8865\u6253\u5361",
                "update_time": 1527561778,
                "updated_duration": 0,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u96f7\u5c0f\u6d9b",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-13",
                "create_time": 1527561778,
                "division": "050",
                "email": "qi.li.des@ihandysoft.com",
                "id": "qi.li.des@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 56006,
                "status": "\u8bf7\u5047",
                "update_time": 1527561778,
                "updated_duration": 0,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u674e\u7426",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-11",
                "create_time": 1527561778,
                "division": "081",
                "email": "mingzhi.li@ihandysoft.com",
                "id": "mingzhi.li@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 0,
                "status": "\u5f02\u5e38",
                "update_time": 1527561778,
                "updated_duration": 0,
                "updated_end_time": "",
                "updated_start_time": "",
                "user_name": "\u674e\u660e\u5fd7",
                "workday": 1
                },
                {
                "attendance_date": "2018-05-19",
                "create_time": 1527561766,
                "division": "095",
                "email": "yuan.li@ihandysoft.com",
                "id": "yuan.li@ihandysoft.com2018-05-28",
                "is_changed": false,
                "original_duration": 56006,
                "status": "\u8bf7\u5047",
                "update_time": 1527561766,
                "updated_duration": 0,
                "updated_end_time": "10:05",
                "updated_start_time": "10:05",
                "user_name": "\u674e\u5a9b",
                "workday": 1
            }]
        }
    },
    methods: {
        //输入框内输入姓名，1.回车 2.点击右侧的搜索图标
        // 可以获得输入框输入的内容。将值传给后台，调用接口即可。
        searchUserName(item) {
            console.log(item);
            console.log('筛选姓名');
        },
        //日历选择器上选择好日期，即可获得此时的输入内容
        searchUserDate(item) {
            console.log(item);
            console.log('筛选日期');
        },
        //如果在下侧的表格中选中了数据，则点击此按钮，可以将选中的信息发给后台
        infoNotify() {
            console.log('发送提醒');
        },
        //处理筛选条件变化，向后台发送数据，重新获取信息就可以
        handleFilterChange(filters) {
            console.log(filters);
            console.log('筛选条件变化');
        },
        //处理复选框状态修改
        handleSelectionChange(item) {
            console.log(item);
            this.selectionItem = item

        },
        //要跳转的页
        handleCurrentChange(item) {
            if (item === 2) {
                this.tableData = [{
                    "attendance_date": "2018-05-27",
                    "create_time": 1527561778,
                    "division": "082",
                    "email": "tianhang.chen@ihandysoft.com",
                    "id": "tianhang.chen@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u8865\u6253\u5361",
                    "update_time": 1527561778,
                    "updated_duration": 5976,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u9648\u5929\u822a",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-28",
                    "create_time": 1527561778,
                    "division": "095",
                    "email": "zhixin.chen@ihandysoft.com",
                    "id": "zhixin.chen@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u5f02\u5e38",
                    "update_time": 1527561778,
                    "updated_duration": 6585,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u9648\u82b7\u82af",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-12",
                    "create_time": 1527561778,
                    "division": "010",
                    "email": "chengwen.cui@ihandysoft.com",
                    "id": "chengwen.cui@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u5f02\u5e38",
                    "update_time": 1527561778,
                    "updated_duration": 4512,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u5d14\u627f\u6587",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-27",
                    "create_time": 1527561766,
                    "division": "085",
                    "email": "guangyu.dong@ihandysoft.com",
                    "id": "guangyu.dong@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u6b63\u5e38",
                    "update_time": 1527561766,
                    "updated_duration": 9876,
                    "updated_end_time": "09:20",
                    "updated_start_time": "09:20",
                    "user_name": "\u8463\u5e7f\u5b87",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-28",
                    "create_time": 1527561777,
                    "division": "095",
                    "email": "lingling.fan@ihandysoft.com",
                    "id": "lingling.fan@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u8bf7\u5047",
                    "update_time": 1527561777,
                    "updated_duration": 56006,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u8303\u73b2\u73b2",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-04-28",
                    "create_time": 1527561778,
                    "division": "089",
                    "email": "yutian.gan@ihandysoft.com",
                    "id": "yutian.gan@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u8bf7\u5047",
                    "update_time": 1527561778,
                    "updated_duration": 50000,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u7518\u96e8\u7530",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-02-28",
                    "create_time": 1527561766,
                    "division": "085",
                    "email": "ni.gao@ihandysoft.com",
                    "id": "ni.gao@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u8865\u6253\u5361",
                    "update_time": 1527561766,
                    "updated_duration": 53221,
                    "updated_end_time": "10:27",
                    "updated_start_time": "10:27",
                    "user_name": "\u9ad8\u59ae",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-03-28",
                    "create_time": 1527561778,
                    "division": "010",
                    "email": "baoqi.guo@ihandysoft.com",
                    "id": "baoqi.guo@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u5f02\u5e38",
                    "update_time": 1527561778,
                    "updated_duration": 0,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u90ed\u5b9d\u742a",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-05",
                    "create_time": 1527561778,
                    "division": "050",
                    "email": "yimeng.guo@ihandysoft.com",
                    "id": "yimeng.guo@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u8865\u6253\u5361",
                    "update_time": 1527561778,
                    "updated_duration": 0,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u90ed\u4f9d\u840c",
                    "workday": 1
                    },
                    {
                    "attendance_date": "2018-05-09",
                    "create_time": 1527561778,
                    "division": "085",
                    "email": "ruyan.guo@ihandysoft.com",
                    "id": "ruyan.guo@ihandysoft.com2018-05-28",
                    "is_changed": false,
                    "original_duration": 0,
                    "status": "\u6b63\u5e38",
                    "update_time": 1527561778,
                    "updated_duration": 0,
                    "updated_end_time": "",
                    "updated_start_time": "",
                    "user_name": "\u90ed\u5982\u8273",
                    "workday": 1
                }];
            }
            console.log(item);
            console.log('跳转到指定页');
        },
        //处理每页显示数量变化的函数
        handleSizeChange(item) {
            console.log(item);
            console.log('每页的数量变化');
        },
        //点击编辑按钮后，打开编辑对话框
        openEditDialog(item) {
            console.log(item);
            this.editDialogVisible = true;
            this.oldStatus = item.status;
            console.log('打开编辑对话框');
        },
        //关闭对话框之前，先清空数据，最后关闭对话框
        editHandleClose() {
            this.oldStatus = '';
            this.editDialogVisible = false;
            console.log('退出编辑对话框');
        }
    }
}
</script>

<style lang="css">
.dataTable {
    margin: 40px auto;
}
.red {
    color: red;
}
.blue {
    color: #409EFF;
}
</style>
