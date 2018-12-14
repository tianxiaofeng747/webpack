import HelloWorld from './components/HelloWorld';
const components  =[
	HelloWorld
];
const install = function(Vue) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}
export default {
	install
};