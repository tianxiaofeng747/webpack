<template>
  <section class="container_setion">
    <yl-dialog :title="dialogConfig.title" :show.sync="shows" :width="dialogConfig.width" :hideSubmitButton="true" :appendToBody="true" @reset="handleClose">
      <!-- <div slot="content"> -->
        <el-row class="transfer mgb5" :gutter="10">
          <el-col :span="9" class="transfer-left">
            <!-- 左侧穿梭框 平台端字典项 -->
            <h3 class="transfer-title">
              <span>平台端字典项</span>
            </h3>
            <!-- 内容区 -->
            <div class="transfer-main">
              <el-table :data="platformDictData" ref="transferLeftTable" style="width: 100%" @selection-change="leftSelectChange" :height="dialogConfig.tableHeight" :loading="leftLoading" border>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="字典项内容" prop="modValue"></el-table-column>
                <el-table-column label="字典项编码" prop="number"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="2" class="transfer-center" :style="{paddingTop: transferCenterPosition}">
            <!-- 穿梭区 按钮框 -->
            <el-button type="primary" @click="trnasferData" size="mini" :disabled="!toRight">
              <i class="el-icon-d-arrow-right"></i>
            </el-button>
          </el-col>
          <el-col :span="13" class="transfer-right">
            <!-- 右侧穿梭框 目标框 -->
            <h3 class="transfer-title">企业端字典项</h3>
            <!-- 内容区 -->
            <el-form ref="form" :model="form" class="transfer-main">
              <el-table :data="form.dictItems" ref="transferRightTable" style="width: 100%" @selection-change="rightSelectChange" :height="dialogConfig.tableHeight" :loading="rightLoading" border>
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="字典项内容" prop="dictVal">
                  <template slot-scope="scope">
                    <el-form-item :rules="dictRules.dictVal" :prop="'dictItems.'+scope.row.index+'.dictVal'">
                      <el-input v-model.trim="scope.row.dictVal" placeholder="请输入字典项内容" size="mini" :maxlength='64'></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="字典项编码 " prop="dictNumber">
                  <template slot-scope="scope">
                    <el-form-item :rules="dictRules.dictNumber" :prop="'dictItems.'+scope.row.index+'.dictNumber'">
                      <el-input v-model.trim="scope.row.dictNumber" placeholder="请输入字典项编码" size="mini" v-if="scope.row.save" :maxlength='64'></el-input>
                      <span v-text="scope.row.dictNumber" v-else></span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort" width="90">
                  <template slot-scope="scope">
                    <el-form-item :rules="dictRules.sort" :prop="'dictItems.'+scope.row.index+'.sort'">
                      <el-input v-model.trim="scope.row.sort" placeholder="请输入排序" size="mini" 
                         v-if="scope.row.save"
                        type="number" :max="9999" :maxlength='4'></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column type="type" label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <span class="dictionary-btns" v-if="scope.row.save" @click="saveRow(scope.row)">
                      <yl-icon className="icon-icon_baocun" style="font-size: 16px;"></yl-icon>
                    </span>
                    <span class="dictionary-btns" v-if="scope.row.add" @click="addRow(scope.row.index)">
                      <yl-icon className="icon-jia" style="font-size: 16px;"></yl-icon>
                    </span>
                    <span class="dictionary-btns" v-if="scope.row.cut" @click="delRow(scope.row)">
                      <yl-icon className="icon-jian" style="font-size: 16px;"></yl-icon>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-col>
        </el-row>
      <!-- </div> -->
    </yl-dialog>
  </section>
</template>
<script>
const URL = {
    findPlatformByNumber: 'ddc.dict.platform.findByNumber',	// 平台端字典（传入字典编码）
    findEngerpriseByNumber: 'ddc.dict.enterprise.findByNumber',	// 企业字典（传入企业编号和字典编码）
    saveEnterpriseDict: 'ddc.dict.enterprise.save',	// 新增保存
    updateEnterpriseDict: 'ddc.dict.enterprise.update',	// 修改保存
    batchSaveEnterpriseDict: 'ddc.dict.enterprise.saveList',	// 批量增加保存
    deleteDict: 'ddc.dict.enterprise.delete'	// 删除企业字典项
};
export default {
    name: 'corpDict',
    data () {
        var checkDictName = (rule, value, callback) => {
                let repeatCount = 0;
                this.form.dictItems.forEach(item => {
                    if (item.dictVal === value) {
                        repeatCount++;
                    }
                });
                if (!value) {
                    return callback(new Error('请输入字典项内容'));
                } else if (repeatCount > 1) {
                    return callback(new Error('字典项内容有重复'));
                } else {
                    callback();
                }
            },
            checkDictNumber = (rule, value, callback) => {
                let repeatCount = 0;
                this.form.dictItems.forEach(item => {
                    if (item.dictNumber === value) {
                        repeatCount++;
                    }
                });
                if (!value) {
                    return callback(new Error('请输入字典项编码'));
                } else if (repeatCount > 1) {
                    return callback(new Error('字典项编码有重复'));
                } else {
                    callback();
                }
            };
        return {
            platformDictData: [],	// 平台端字典子项
            form: {
                dictItems: []	// 企业端字典子项
            },
            leftLoading: false,
            rightLoading: false,
            toLeft: true,
            toRight: false,
            selectLeft: [],
            selectRight: [],
            parentCode: '',	// 平台端字典父项
            selectRight: [],
            dialogConfig: {},
            // 字典项规则
            dictRules: {
                dictVal: [{ required: true, validator: checkDictName, trigger: 'blur' }],
                dictNumber: [{ required: true, validator: checkDictNumber, trigger: 'blur' }],
                sort: [{ required: true, pattern: /^\d{1,4}$/, message: '请输入排序值，限4位数值', trigger: 'blur' }]
            }
        };
    },
    props: {
    // 对话框是否显示
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        // 关闭按钮后，是否显示字典项更新后的数据，默认不显示
        showUpdatedData: {
            type: Boolean,
            default: false
        },
        // 企业编号
        enterpriseNo: {
            type: String,
            required: true,
            default: ''
        },
        // 字典编号
        dictNumber: {
            type: String,
            required: true,
            default: ''
        },
        // 对话框配置
        dialog: {
            type: Object,
            default () {
                return {};
            }
        },
        labelValue: {
            type: [Array],
            default () {
                return [];
            }
        }
    },
    created () {
        this.dialogConfig = Object.assign({
            title: '企业字典',
            width: '1000px',
            tableHeight: '360px'
        }, this.dialog);
    },
    computed: {
        shows: {
            get () {
                return this.show;
            },
            set (newValue) {
                this.$emit('update:show', newValue);
            }
        },
        transferCenterPosition () {
            return (parseInt(this.dialogConfig.tableHeight) - 40) / 2 + 'px';
        }
    },
    mounted () {
        if (!this.dictNumber) {
            this.$message({
                message: '请传入字典编码',
                type: 'warning'
            });
            return;
        }
        if (!this.enterpriseNo) {
            this.$message({
                message: '请传入企业编号',
                type: 'warning'
            });
            return;
        }
        this.leftLoading = true;
        this.Http(URL.findPlatformByNumber, {
            number: this.dictNumber
        }).then(res => {
            this.parentCode = res.data.code;
            this.platformDictData = res.data.children;
            this.leftLoading = false;
        }).catch(error => {
            this.leftLoading = false;
        });
        this.refreshEnterpriseData();
    },
    methods: {
        // 导入平台字典数据（后端暂时未提供批量保存方法）
        trnasferData () {
            let paramsList = [];
            this.selectLeft.forEach(item => {
                paramsList.push({
        			parentCode: this.parentCode,
        			enterpriseNo: this.enterpriseNo,
        			dictNumber: item.number,
        			dictVal: item.modValue,
        			code: item.code
        		});
            });
            this.Http(URL.batchSaveEnterpriseDict, {
        		params: paramsList
        	}).then(res => {
        		// 提示信息
        		this.$message({
        			message: '添加成功',
        			type: 'success'
        		});
        		// 刷新
        		this.refreshEnterpriseData();
            	this.selectLeft = [];
                this.toRight = false;
        	});
        },
        // 刷新企业字典
        refreshEnterpriseData () {
            this.rightLoading = true;
            this.Http(URL.findEngerpriseByNumber, {
	        	enterpriseNo: this.enterpriseNo,
	            number: this.dictNumber
	        }).then(res => {
	            this.form.dictItems = (res.data.children && res.data.children.length > 0) ? res.data.children : [{
                    dictVal: '',
                    dictNumber: '',
                    sort: '1',
                    add: true,
                    cut: true,
                    save: true
                }];

	            this.updateList();
	            this.rightLoading = false;
	        }).catch(error => {	        	
	            this.rightLoading = false;
	        });
        },
        leftSelectChange (val) {
            this.selectLeft = [];
            if (val.length) {
                val.forEach(item => {
                    this.selectLeft.push(item);
                });
                this.toRight = true;
            } else {
                this.toRight = false;
                this.selectLeft = [];
            }
        },
        rightSelectChange (val) {
            // if (val.length) {
            //     this.toLeft = false;
            //     val.forEach(item => {
            //         this.selectRight.push(item.code);
            //     });
            // } else {
            //     this.toLeft = true;
            //     this.selectRight = [];
            // }
        },
        // 保存字典项
        saveRow (row) {
            let index = row.index;
            this.$refs.form.validateField('dictItems.' + index + '.dictVal', (errorMsg) => {
                if (!errorMsg) {
                    this.$refs.form.validateField('dictItems.' + index + '.dictNumber', (errorMsg) => {
                        if (!errorMsg) {              
                            this.Http(!row.code ? URL.saveEnterpriseDict : URL.updateEnterpriseDict, {
                                params: {
                                    parentCode: this.parentCode,
                                    enterpriseNo: this.enterpriseNo,
                                    dictNumber: row.dictNumber,
                                    dictVal: row.dictVal,
                                    sort: row.sort,
                                    code: row.code,
                                    opRevsion: row.opRevsion
                                }
                            }).then(res => {
                                // 提示信息
                                this.$message({
                                    message: row.code ? '修改成功' : '添加成功',
                                    type: 'success'
                                });
                                // 将code填充进去            
                                this.form.dictItems = this.form.dictItems.filter((item, index) => {
                                    if (index === row.index) {
                                        if (res.data.code) {
                                            // 两个接口返回数据不同，新增保存返回数据，修改保存不返回数据
                                            item.code = res.data.code;
                                            item.opRevsion = res.data.opRevsion;
                                        }                        
                                    }
                                    return item;
                                });
                            }).catch(error => {
                                // this.$message({
                                //  message: error.message,
                                //  type: 'error'
                                // });
                            });
                        }
                    });
                }
            });
        },
        // 新增一行字典项
        addRow () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.dictItems.push({
                        dictVal: '',
                        dictNumber: '',
                        sort: '1',
                        add: true,
                        cut: true,
                        save: true
                    });
                    this.updateList();
                }
            });
        },
        // 删除一行字典项
        delRow (row) {
            if (row.code) {
                this.Http(URL.deleteDict, {
                    code: row.code,
                    enterpriseNo: this.enterpriseNo,
                    opRevsion: row.opRevsion
                }).then(res => {
                    this.form.dictItems = this.form.dictItems.filter((item, index) => {
                        if (index !== row.index) {
                            return item;
                        }
                    });
                    this.updateList();
                });
            } else {
                this.form.dictItems.splice(row.index, 1);
                this.updateList();
            }
        },
        // 更新子项数据
        updateList () {
            let len = this.form.dictItems.length;
            if (len === 1) {
                this.form.dictItems[0].add = true;
                this.form.dictItems[0].save = true;
                this.form.dictItems[0].cut = false;
                this.form.dictItems[0].index = 0;
            } else {
                this.form.dictItems = this.form.dictItems.map((item, index) => {
                    if (index + 1 === len) {
                        item.save = true;
                        item.cut = true;
                        item.add = true;
                    } else {
                        item.save = true;
                        item.cut = true;
                        item.add = false;
                    }
                    item.index = index;

                    return item;
                });
            }
            this.$refs.transferLeftTable.clearSelection();
            // 迫使 Vue 实例重新渲染
            this.$forceUpdate();
        },
        handleClose () {
            if (this.showUpdatedData === true) {
                let dictItems = [];
                // labelValue有值，则返回更新的字典项
                if (this.labelValue.length === 2) {
                    dictItems = this.form.dictItems.map(item => {
                        item[this.labelValue[0]] = item.dictVal;
                        item[this.labelValue[1]] = item.code;
                        return item;
                    });
                } else {
                    dictItems = this.form.dictItems;
                }
                console.log('关闭字典项：', dictItems);
                this.$emit('update', dictItems);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.transfer-title {
  font-weight: normal;
  margin-bottom: 10px;
  background-color: #fafbfd;
}
::v-deep.el-form-item {
	margin-bottom: 0;
}
.dictionary-btns {
  cursor: pointer;
  font-size: 14px;
  color: #666;
  padding-right: 5px;
  &:hover {
    color: #2c9cea;
  }
}
.transfer-center {
  padding-top: 150px;
  text-align: center;

  .batch-btn {
    display: initial;
  }
}
</style>