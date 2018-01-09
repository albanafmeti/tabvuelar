<template>
    <nav aria-label="table page navigation" id="pagination-nav">
        <ul class="pagination justify-content-end">


            <li class="page-item" :class="{ disabled: (tableData.meta.current_page === 1) }">
                <a class="page-link" @click="goToPage(1)" :disabled="(tableData.meta.current_page === 1)">
                    <span class="fa fa-angle-double-left"></span>
                </a>
            </li>

            <li class="page-item" :class="{ disabled: !prev }">
                <a class="page-link" @click="previousPage()" :disabled="!prev">
                    <span class="sr-only">Previous</span>
                    <span class="fa fa-angle-left"></span>
                </a>
            </li>

            <li class="page-item" v-if="prev"><a class="page-link" @click="goToPage(prev)">{{ prev }}</a></li>

            <li class="page-item active"><a class="page-link">{{ tableData.meta.current_page }}</a></li>

            <li class="page-item" v-if="next"><a class="page-link" @click="goToPage(next)">{{ next }}</a></li>

            <li class="page-item" :class="{ disabled: !next }">
                <a class="page-link" @click="nextPage()" :disabled="!next">
                    <span class="fa fa-angle-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </li>

            <li class="page-item" :class="{ disabled: (tableData.meta.current_page === tableData.meta.last_page) }">
                <a class="page-link" @click="goToPage(tableData.meta.last_page)"
                   :disabled="(tableData.meta.current_page === tableData.meta.last_page)">
                    <span class="fa fa-angle-double-right"></span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
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
<style lang="scss">

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