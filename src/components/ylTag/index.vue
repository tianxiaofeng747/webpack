<template>
    <div class="my-tag">
        <div class="my-tagBox" :class="type">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'yl-tag',
    data () {
        return {};
    },
    props: {
        name: {
            type: String,
            default: '空'
        },
        type: {
            type: String,
            default: ''
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped="scoped">
$success: #555;
.my-tag {
    color: #fff;
    display: block;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    height: 22px;
    margin-top: -11px;
    font-size: 12px;
    .my-tagBox {
        display: inline-block;
        position: relative;
        color: #666;
        padding: 0 3px;
        border-radius: 3px;
        border: solid 1px #666;
        transform: rotate(-10deg) scale(0.85);
        &.success {
            color: color(success);
            border-color: color(success);
        }
        &.info {
            color: color(info);
            border-color: color(info);
        }
        &.danger {
            color: color(danger);
            border-color: color(danger);
        }
        &.waring {
            color: color(waring);
            border-color: color(waring);
        }
    }
}
</style>