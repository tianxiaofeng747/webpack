<template>
    <span class="status-tag" :class="'status-tag-' + type">
        <slot></slot>
    </span>
</template>
<script>
export default {
     name: 'ArrowTag',
    data () {
        return {};
    },
    props: {
        type: {
            type: String,
            default: 'info' // gray   success   warning   info   danger
        }
    }
};
</script>

<style lang="scss" scoped>
// 状态标签(参见 采购合同 => 合同档案管理)
.status-tag {
    padding: 0.2em 0.4em 0.3em;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    position: relative;
    color: #fff;
    z-index: 1;
    margin-left: 4px;
    margin-right: 4px;
    &:after,
    &:before {
        display: inline-block;
        content: "";
        position: absolute;
        top: 0;
        z-index: -1;
        border: 1px solid transparent;
        border-width: 10px 4px;
    }
    &:before {
        left: -4px;
        border-left-color: transparent !important;
    }
    &:after {
        right: -8px;
    }
    &-info {
        background-color: color("info");
        &:before {
            border-color: color("info");
        }
        &:after {
            border-left-color: color("info");
        }
    }
    &-gray {
        background-color: gray;
        &:before {
            border-color: gray;
        }
        &:after {
            border-left-color: gray;
        }
    }
    &-warning {
        background-color: color("warning");
        &:before {
            border-color: color("warning");
        }
        &:after {
            border-left-color: color("warning");
        }
    }
    &-success {
        background-color: color("success");
        &:before {
            border-color: color("success");
        }
        &:after {
            border-left-color: color("success");
        }
    }
    &-danger {
        background-color: color("danger");
        &:before {
            border-color: color("danger");
        }
        &:after {
            border-left-color: color("danger");
        }
    }
}
</style>
