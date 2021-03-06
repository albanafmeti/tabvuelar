import TableComponent from './components/Table.vue';

const TabVueLar = {
    install(Vue, options = null) {

        options = options ? options : {
                ui: 'bootstrap'
            };

        Vue.prototype.$pluginOptions = {
            ui: options.ui
        };

        Vue.component(TableComponent.name, TableComponent);
    }
};

export default TabVueLar;
