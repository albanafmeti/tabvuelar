<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <table-per-page :perPage="perPage" v-if="defaultPerPage"></table-per-page>
                <slot name="__perPage"></slot>

                <button v-if="defaultRefresh" class="table-refresh-btn btn btn-default" @click.prevent="onRefreshTable"
                        title="Refresh Table">
                    Refresh
                </button>

                <table-filter v-if="defaultFilter"></table-filter>
                <slot name="__filter"></slot>

                <slot name="__toolbar"></slot>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="table-responsive table-div">
            <table :class="[tableClass]">
                <thead>
                <tr>
                    <table-th
                            v-bind:field="field"
                            v-bind:sortable="field.sortable"
                            v-bind:key="field.name"
                            v-for="field in fields"></table-th>
                </tr>
                </thead>
                <tbody v-if="tableData">
                <tr v-for="(item, index) in tableData.data">

                    <table-td
                            :index="index"
                            :item="item"
                            :field="field"
                            :key="field.name + index"
                            :transformers="transformers"
                            v-for="(field, index) in fields">
                        <template slot="tr-actions" slot-scope="data">
                            <slot name="__actions" :item="data.item"></slot>
                        </template>

                        <template slot="__slot" slot-scope="{item}" v-if="isSpecialField(field, '__slot')">
                            <slot :name="field.slotName" :item="item"></slot>
                        </template>

                    </table-td>

                </tr>
                </tbody>
            </table>

            <!-- No Data Message -->
            <p v-if="tableData && tableData.meta.total === 0" class="no-data-message" v-html="noDataMessage"></p>

            <!-- Loading Spinner -->
            <div class="loading-div" v-if="loadingSpinner">
                <div class="pulse-loader">
                    <pulse-loader></pulse-loader>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>
        <div class="row" v-if="tableData && tableData.meta.last_page > 1">
            <div class="col-md-12">
                <table-info :tableData="tableData" v-if="defaultInfo"></table-info>
                <slot name="__info" :tableData="tableData"></slot>

                <table-pagination
                        :tableData="tableData"
                        v-if="defaultPagination">
                </table-pagination>
                <slot name="__pagination" :tableData="tableData"></slot>
            </div>
        </div>
    </div>
</template>
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
                'default': 'table table-striped table-hover'
            },
            transformers: {
                type: Object,
                required: false,
                'default': function () { return {} }
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

<style lang="scss">

    table th {
        cursor: pointer;
    }

    .table-refresh-btn {
        float: left;
        margin: 0 10px;
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
