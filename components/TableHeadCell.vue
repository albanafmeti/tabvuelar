<script>
    import Helpers from '../helpers';
    import Env from '../env';

    export default {
        name: 'table-th',
        props: {
            field: {
                type: Object,
                required: true
            },
            sortable: {
                type: Boolean,
                required: false,
                'default': true
            },
            sorted: {
                type: Boolean,
                required: false,
                'default': false
            },
            sortType: {
                type: String,
                required: false,
                'default': 'asc'
            },
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-head-cell.html');
        },
        data() {
            return {
                dataSortType: null,
                dataSorted: null,
                state: null
            }
        },
        watch: {
            'sortType': function (val) {
                this.dataSortType = val;
            },
            'sorted': function (val) {
                this.dataSorted = val;
            }
        },
        methods: {
            sortField() {
                if (this.sortable && !this.isSpecialField(this.field.name)) {

                    this.dataSortType = (this.dataSortType === 'asc') ? 'desc' : 'asc';

                    this.$events.$emit(Env.eventsPrefix + 'sort-table', {
                        field: this.field.name,
                        type: this.dataSortType
                    });

                    this.dataSorted = true;
                }
            },
            stateChanged() {
                if (this.state) {
                    this.$events.$emit(Env.eventsPrefix + 'select-all-checkboxes');
                } else {
                    this.$events.$emit(Env.eventsPrefix + 'deselect-all-checkboxes');
                }
            },
            specialField(field) {
                return Helpers.specialField(field);
            },
            isSpecialField(field) {
                return Helpers.isSpecialField(field);
            },
        },
        events: {
            [Env.eventsPrefix + 'reset-sort']: function (eventData) {
                if (eventData.field !== this.field.name) {
                    this.dataSorted = false;
                    this.dataSortType = 'desc';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-th {
        position: relative;
    }

    .table-th > .sort {
        position: absolute;
        right: 0;
        color: grey;
        font-size: 17px;
    }

    .table-th > .sort-disabled {
        color: lightgray;
        opacity: 0.5
    }

    .table-th > .sort-up {
        bottom: 45%;
    }

    .table-th > .sort-bottom {
        top: 45%;
    }
</style>
