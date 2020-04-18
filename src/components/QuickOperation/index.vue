<template>
    <section class="quick-operation" :class="isShowQuickOperation ? 'open' : 'close'" @mouseover="open">
        <div class="switch" @click="close">
            <yl-icon :icon="
                    isShowQuickOperation ? 'icon-cuocha_kuai' : 'icon-shandian'
                " @click="isShowQuickOperation = false"></yl-icon>
        </div>
        <dl>
            <dt>
                <yl-icon icon="icon-shandian" class="icon"></yl-icon>
                <span>快捷操作</span>
            </dt>
            <dd @click="fullScreen">
                <yl-icon :icon="isFullScreen ? 'icon-quanping' : 'icon-quanping1'" class="icon"></yl-icon>
                <span v-text="isFullScreen ? '缩放' : '全屏'"></span>
            </dd>
        </dl>
    </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'QuickOperation',
    data () {
        return {
            isShowQuickOperation: false,
            isHover: true
        };
    },
    computed: {
        ...mapGetters(['isFullScreen'])
    },
    methods: {
        open () {
            if (!this.isShowQuickOperation && this.isHover) {
                this.isShowQuickOperation = true;
            }
        },
        close () {
            if (this.isShowQuickOperation) {
                this.isShowQuickOperation = false;
                this.isHover = false;

                setTimeout(() => {
                    this.isHover = true;
                }, 300);
            }
        },
        fullScreen () {
            this.$store.commit('TOGGLE_FULLSCREEN');
        }
    },
    created () {}
};
</script>

<style lang="scss" scoped>
.quick-operation {
    position: fixed;
    // right: 0;
    top: 88px;
    z-index: 110;
    width: 160px;
    background-color: #fff;
    border: 2px solid orange;
    transition: right 0.3s;
    &.close {
        right: -160px;
        .switch {
            opacity: 0.6;
        }
    }
    &.open {
        right: 0;
    }
    .switch {
        position: absolute;
        left: -30px;
        top: -2px;
        width: 30px;
        height: 30px;
        background: orange;
        border-radius: 5px 0 0 5px;
        cursor: pointer;
        color: #fff;
        .yl-icon {
            width: 20px;
            height: 20px;
            margin-top: 5px;
            margin-left: 5px;
        }
    }

    dl {
        dt {
            background-color: #ecf2f7;
            color: #8090a0;
            border-bottom-color: #bcd4e5;
            text-shadow: none;
            padding: 0 10px;
            line-height: 34px;
            font-size: 13px;
            font-weight: bold;
            text-transform: none;
            border-bottom: 1px solid #b7cade;
            .icon {
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                font-weight: bold;
            }
        }
        dd {
            line-height: 36px;
            padding: 0 10px;
            border-bottom: 1px solid #e4ecf3;
            background-color: #fff;
            cursor: pointer;
            &:hover {
                background-color: #f4f9fc;
            }
            .icon {
                color: $theam;
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                font-weight: bold;
            }
        }
    }
}
</style>
