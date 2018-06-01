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
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="editDialog"
            size="small">
            <el-table-column
                prop="user_name"
                label="姓名"
                align="center">
            </el-table-column>
            <el-table-column
                label="请假起止日期"
                align="center"
                min-width="140">
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
                label="预计补班日期"
                align="center"
                min-width="160">
                <template slot-scope="scope">
                    <span>{{scope.row.expect_exchange_date.length === 0 ? ' 无': scope.row.expect_exchange_date.join('/')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="实际补班日期"
                align="center"
                min-width="190">
                <template slot-scope="scope">
                    <span>{{scope.row.actual_exchange_date.length === 0 ? '无': scope.row.actual_exchange_date.join('/')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="timeoff_type"
                label="类型"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                fixed="right">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            icon="el-icon-delete"
                            size="small"
                            @click="deleteTableItem(scope.row)">
                        </el-button>
                        <el-button
                            icon="el-icon-more"
                            size="small">
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
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
            //表格临时数据
            temp: [],
            //表格数据
            tableData: [{
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Thu, 31 May 2018 08:05:56 GMT",
                "desc": null,
                "division": "030",
                "email": "kengyu.chen@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "64944475787192571532",
                "timeoff_date": [
                  "2018-05-30",
                  "2018-05-30"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Thu, 31 May 2018 08:05:56 GMT",
                "user_name": "\u9648\u94ff\u5b87"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 10:02:13 GMT",
                "desc": "\u751f\u75c5",
                "division": "095",
                "email": "zhixin.chen@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": true,
                "is_paid": "no",
                "primary_id": "86428716981672858296",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-31"
                ],
                "timeoff_days": 3,
                "timeoff_type": "\u75c5\u5047",
                "update_time": "Wed, 30 May 2018 11:55:32 GMT",
                "user_name": "\u9648\u82b7\u82af"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 08:56:56 GMT",
                "desc": "vv",
                "division": "095",
                "email": "wenting.zou@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "yes",
                "primary_id": "43733899285186526752",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u5a5a\u5047",
                "update_time": "Wed, 30 May 2018 08:56:56 GMT",
                "user_name": "\u90b9\u6587\u5a77"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 08:16:54 GMT",
                "desc": "123",
                "division": "045",
                "email": "jian.zhou@ihandysoft.com",
                "expect_exchange_date": [
                  "2018-06-03",
                  "2018-06-04",
                  "2018-07-04"
                ],
                "expect_exchange_days": 1,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "15977744147638718314",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 08:16:54 GMT",
                "user_name": "\u5468\u575a"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 11:30:07 GMT",
                "desc": "123",
                "division": "084",
                "email": "zexin.zhang@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "83772711323623499536",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 11:30:07 GMT",
                "user_name": "\u5f20\u6cfd\u946b"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 08:18:02 GMT",
                "desc": "123",
                "division": "050",
                "email": "yating.liu@ihandysoft.com",
                "expect_exchange_date": [
                  "2018-05-31"
                ],
                "expect_exchange_days": 1,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "11217841323551162883",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 08:18:02 GMT",
                "user_name": "\u5218\u4e9a\u5a77"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 11:53:32 GMT",
                "desc": "123",
                "division": "099",
                "email": "hh@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "28438736385327142248",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 11:53:32 GMT",
                "user_name": "\u9ec4\u6ec9"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 08:22:06 GMT",
                "desc": "\u554a\u554a\u554a",
                "division": "084",
                "email": "bichen.cui@ihandysoft.com",
                "expect_exchange_date": [
                  "2018-05-31"
                ],
                "expect_exchange_days": 1,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "31399522914933868476",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u75c5\u5047",
                "update_time": "Wed, 30 May 2018 08:22:06 GMT",
                "user_name": "\u5d14\u78a7\u6668"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 08:08:09 GMT",
                "desc": "2",
                "division": "082",
                "email": "tianhang.chen@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "59297315883191447843",
                "timeoff_date": [
                  "2018-05-29",
                  "2018-05-29"
                ],
                "timeoff_days": 1,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 08:08:09 GMT",
                "user_name": "\u9648\u5929\u822a"
              },
              {
                "actual_exchange_date": [],
                "actual_exchange_days": 0,
                "create_time": "Wed, 30 May 2018 02:38:10 GMT",
                "desc": null,
                "division": "085",
                "email": "yan.xu@ihandysoft.com",
                "expect_exchange_date": [],
                "expect_exchange_days": 0,
                "is_approval_timeoff": "yes",
                "is_canceled": "no",
                "is_confirm_exchange": false,
                "is_paid": "no",
                "primary_id": "42513477989868837156",
                "timeoff_date": [
                  "2018-05-28",
                  "2018-05-30"
                ],
                "timeoff_days": 3,
                "timeoff_type": "\u4e8b\u5047",
                "update_time": "Wed, 30 May 2018 02:38:10 GMT",
                "user_name": "\u8bb8\u7131"
            }],
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
        },
        //删除表格数据
        deleteTableItem (item) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // let temp = [];
                for (let i = 0,len = this.tableData.length; i < len; i++) {
                     console.log(i);
                     console.log(this.tableData);
                    if (this.tableData[i].primary_id !== item.primary_id) {
                        this.temp.push(this.tableData[i]);
                        console.log("this.temp");
                    }
                }
                this.tableData = this.temp;
                this.$notify({
                    title: '成功',
                    message: '删除成功!',
                    type: 'success'
                });
            }).catch(() => {

            });
        }
    }
}
</script>

<style lang="css">
.editDialog {
    margin: 40px auto;
}
</style>
