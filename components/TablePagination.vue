<script>
    import Helpers from '../helpers';
    import Env from '../env';

    export default {
        name: 'table-pagination',
        props: {
            tableData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                prev: null,
                next: null,
            }
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-pagination.html');
        },
        mounted: function () {
            this.updatePageNumbers();
        },
        watch: {
            'tableData': function () {
                this.updatePageNumbers()
            }
        },
        methods: {
            nextPage() {
                if (this.tableData.links.next) {
                    this.$events.$emit(Env.eventsPrefix + 'pagination-action', {
                        link: this.tableData.links.next
                    });
                }
            },
            previousPage() {
                if (this.tableData.links.prev) {
                    this.$events.$emit(Env.eventsPrefix + 'pagination-action', {
                        link: this.tableData.links.prev
                    });
                }
            },
            goToPage(page) {
                this.$events.$emit(Env.eventsPrefix + 'pagination-action', {
                    page: page
                });
            },
            updatePageNumbers() {

                this.prev = null;
                this.next = null;

                if (this.tableData.meta.current_page > 1) {
                    this.prev = this.tableData.meta.current_page - 1;
                }

                if (this.tableData.meta.last_page > this.tableData.meta.current_page) {
                    this.next = this.tableData.meta.current_page + 1;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

    #pagination-nav .pagination {
        margin: 0;
    }

    #pagination-nav .pagination .page-item .page-link {
        cursor: pointer;
    }

    #pagination-nav {
        float: right;
    }
</style>
