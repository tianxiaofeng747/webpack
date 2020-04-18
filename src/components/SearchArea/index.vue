<template>
    <el-cascader :options="options" ref="area" v-model="registerRegionCode" v-bind="$attrs" @change="handleChange" :placeholder="placeholder" filterable :size="size">
    </el-cascader>
</template>
<script>
import REGION_DATA from './data.js';
export default {
    name: 'SearchArea',
    data () {
        return {
            regions: REGION_DATA,
            options: [],
            areaVal: '',
            registerRegionCode: []
        };
    },
    props: {
        value: [String, Array],
        placeholder: {
            type: String,
            default: '请选择区域'
        },
        size: {
            type: String,
            default: 'small'
        },
        level: {
            type: [String, Number],
            default: 1
        }
    },
    watch: {
        value () {
            this.setVal();
        }
    },
    methods: {
        format (data, level = 0) {
            let arr = [];
            for (let [value, label] of Object.entries(data)) {
                let json = {
                    value,
                    label
                };
                let child = this.regions[value];
                if (
                    child &&
                    Object.keys(this.regions[value]).length &&
                    this.level > level
                ) {
                    json.children = this.format(child, level + 1);
                }
                arr.push(json);
            }
            return arr;
        },
        setVal () {
            if (typeof this.value === 'string') {
                this._getCodeList(this.value + '');
            } else {
                this.registerRegionCode = this.value || [];
            }
        },
        handleChange (val) {
            this.$emit('input', val[val.length - 1]);
            this.$emit('change', val[val.length - 1]);

            if (val && val.length) {
                setTimeout(() => {
                    this.$emit('blur', {
                        code: val[val.length - 1],
                        label: this.$refs.area.presentText.replace(/ \/ /g, '')
                    });
                }, 0);
            } else {
                this.$emit('blur', {
                    code: '',
                    label: ''
                });
            }
        },
        _getCodeList (val) {
            let s = val.slice(0, 2);
            let m = val.slice(2, 4);
            let l = val.slice(4);
            let sv = s + '0000';
            let mv = s + m + '00';
            let lv = s + m + l;
            if (m === '00') {
                if (l === '00') {
                    this.registerRegionCode = [val];
                } else {
                    this.registerRegionCode = [sv, val];
                }
            } else {
                if (l === '00') {
                    this.registerRegionCode = [sv, val];
                } else {
                    this.registerRegionCode = [sv, mv, lv];
                }
            }
        }
    },
    created () {
        this.options = this.format(this.regions['86']);
        if (this.value && typeof this.value === 'string') {
            this._getCodeList(this.value + '');
        } else {
            if (this.value && this.value.length) {
                this.registerRegionCode = this.value || [];
            }
        }
    }
};
</script>

<style lang="scss">
</style>
