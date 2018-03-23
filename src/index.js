/**
 * Created by Administrator on 2018/3/23.
 */
import vueClock from './components/vueClock.vue'

const vueTest = {
    install: function (Vue) {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }
        Vue.component('vueClock', vueClock)
    }
}

export default vueTest;