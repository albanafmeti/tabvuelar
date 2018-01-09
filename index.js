import 'fontawesome';
import TableComponent from './components/Table.vue';

const TabVueLar = {
    install(Vue, options) {
        Vue.component(TableComponent.name, TableComponent)
    }
};

export default TabVueLar;