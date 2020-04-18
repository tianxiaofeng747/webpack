<template>
    <div slot="label">
        {{label}}
        <span class="text-badge" :class="{'info': type === 'info','warning': type === 'warning','success': type === 'success','gray': type === 'gray'}" v-text="num" v-if="showNum"></span>
    </div>
</template>

<script>
export default {
    /* 待审核的数量红色圆点 */
    name: 'textBadge',
    data () {
        return {};
    },
    props: {
        label: {
            type: String
        },
        showNum: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: '' // warning success info  gray
        },
        num: [String, Number]
    }
};
</script>

<style scoped lang="scss">
.text-badge {
    background-color: red;
    border-radius: 5px;
    padding: 0 3px;
    color: #fff;

    &.info {
        background-color: color("info");
    }
    &.warning {
        background-color: color("warning");
    }
    &.gray {
        background-color: color("gray");
    }
    &.success {
        background-color: color("success");
    }
}
</style>
