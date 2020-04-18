<template>
    <section class="advanced-search" v-if="shows">
        <div class="advanced-search-con block">
            <div class="block-tt mgb5">
                <h3>高级搜索<i @click="cancel" class="mgt5 right el-icon-close pointer"></i></h3>
            </div>
            <slot></slot>
            <el-divider></el-divider>
            <div class="text-center advanced-search-footer">
                <el-button size="mini" type="primary" @click="submit">查询</el-button>
                <el-button size="mini" @click="reset">重置</el-button>
                <el-button size="mini" @click="cancel">取消</el-button>
            </div>
        </div>
        <div class="advanced-search-mask"></div>
    </section>
</template>
<script>
export default {
    name: 'AdvancedSearch',
    data () {
        return {};
    },
    methods: {
        // 确认事件
        submit () {
            this.shows = false;
            this.$emit('submit');
        },
        // 重置事件
        reset () {
            this.shows = false;
            this.$emit('reset');
        },
        // 取消事件
        cancel () {
            this.shows = false;
            // this.$emit('cancel');
        }
    },
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    computed: {
        shows: {
            get () {
                return this.show;
            },
            set (newValue) {
                this.$emit('update:show', newValue);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.advanced-search {
    &-con {
        width: 1000px;
        left: 50%;
        margin-left: -500px;
        padding: 10px;
        background-color: #fff;
        position: absolute;
        z-index: 1001;
        top: 0;
        border-radius: 5px;
        h3 {
            color: $theam;
            line-height: 40px;
        }
    }

    &-footer {
        margin-top: 10px;
    }
    &-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba($color: #000, $alpha: 0.5);
    }
    .el-divider--horizontal {
        margin: 10px 0;
    }
}
</style>
