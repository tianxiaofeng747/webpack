<template>
    <yl-dialog title="页面说明" :show.sync="shows" width="1200px" :hide-submit-button="true">
        <slot name="content"></slot>
    </yl-dialog>
</template>

<script>
export default {
    name: 'PageTips',
    data () {
        return {};
    },
    props: {
        show: {
            type: Boolean,
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
pre {
    margin: 0;
}
.yl-dialog .el-dialog__body {
    padding: 10px;
}
</style>
