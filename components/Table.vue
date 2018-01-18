<script>
    import Vue from 'vue';
    import VueEvents from 'vue-events';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    import TableFilter from './TableFilter.vue';
    import TableHeadCell from './TableHeadCell.vue';
    import TableDataCell from './TableDataCell.vue';
    import TablePagination from './TablePagination.vue';
    import TableInfo from './TableInfo.vue';
    import TablePerPage from './TablePerPage.vue';

    import Helpers from '../helpers';
    import Env from '../env';

    Vue.use(VueEvents);

    export default {
        name: 'tabvuelar',
        components: {
            'table-filter': TableFilter,
            'table-th': TableHeadCell,
            'table-td': TableDataCell,
            'table-pagination': TablePagination,
            'table-info': TableInfo,
            'table-per-page': TablePerPage,
            PulseLoader
        },
        data: function () {
            return {
                tableData: null,
                sort: null,
                filter: null,
                itemsPerPage: null,

                // Config:
                loadingSpinner: false
            }
        },
        props: {
            apiUrl: {
                type: String,
                required: true
            },
            fields: {
                type: Array,
                required: true
            },
            perPage: {
                type: Number,
                required: false,
                'default': 10
            },
            noDataMessage: {
                type: String,
                required: false,
                'default': 'There is no data.'
            },
            tableClass: {
                type: String,
                required: false,
                'default': 'table-striped table-hover'
            },
            transformers: {
                type: Object,
                required: false,
                'default': function () {
                    return {}
                }
            },
            defaultFilter: {
                type: Boolean,
                required: false,
                'default': true
            },
            defaultPagination: {
                type: Boolean,
                required: false,
                'default': true
            },
            defaultInfo: {
                type: Boolean,
                required: false,
                'default': true
            },
            defaultPerPage: {
                type: Boolean,
                required: false,
                'default': true
            },
            defaultRefresh: {
                type: Boolean,
                required: false,
                'default': true
            },
        },
        created: function () {

            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table.html');

            this.itemsPerPage = this.perPage;
            this.loadTableData();
        },
        methods: {
            loadTableData(url = null) {

                this.showLoadingSpinner(true);

                const api_url = url ? url : this.apiUrl;
                let _this = this;

                axios.get(api_url, {
                    params: {
                        perPage: this.itemsPerPage,
                        sort: this.sort,
                        filter: this.filter
                    }
                })
                    .then(response => {

                        if (response.status === 200) {
                            this.tableData = response.data;
                            _this.$events.$emit(Env.eventsPrefix + 'load-success', response.data);
                        }
                        this.showLoadingSpinner(false);

                    }).catch(error => {
                    _this.$events.$emit(Env.eventsPrefix + 'load-failed', error);
                    console.log(error);
                })
            },
            showLoadingSpinner(show = true) {
                this.loadingSpinner = show;
            },
            onRefreshTable() {
                this.loadTableData();
            },
            isSpecialField(field, value) {
                return Helpers.specialField(field) === value;
            },
        },
        events: {
            [Env.eventsPrefix + 'reload-table']: function () {
                this.loadTableData();
            },
            [Env.eventsPrefix + 'sort-table']: function (data) {
                this.sort = data.field + '|' + data.type;

                this.$events.$emit(Env.eventsPrefix + 'reset-sort', data);
                this.loadTableData();
            },
            [Env.eventsPrefix + 'filter-set']: function (keywords) {
                this.filter = keywords;
                this.loadTableData();
            },
            [Env.eventsPrefix + 'filter-reset']: function () {
                this.filter = null;
                this.loadTableData();
            },
            [Env.eventsPrefix + 'per-page-set']: function (perPage) {
                this.itemsPerPage = perPage;
                this.loadTableData();
            },
            [Env.eventsPrefix + 'pagination-action']: function (data) {
                if (data.link) {
                    this.loadTableData(data.link);
                }
                if (data.page) {
                    this.loadTableData(this.apiUrl + '?page=' + data.page);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    table th {
        cursor: pointer;
    }

    .table-refresh-btn {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .table-div {
        position: relative;
    }

    .no-data-message {
        text-align: center;
    }

    .loading-div {
        position: absolute;
        text-align: center;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .loading-div > .pulse-loader {
        position: absolute;
        top: 50%;
        width: 100%;
    }

</style>
