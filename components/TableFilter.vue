<template>
    <div class="table-filter">
        <form class="form-inline mb-20 pull-right">
            <div class="form-group">
                <div class="input-group">
                    <input type="text" v-model="filterText" class="form-control" @keyup.enter="doFilter"
                           placeholder="Search...">
                    <div class="input-group-btn">
                        <button class="btn btn-success" @click.prevent="doFilter">Go</button>
                    </div>
                </div>
                <button class="btn btn-info" @click.prevent="resetFilter">Reset</button>
            </div>
        </form>
    </div>
</template>
<script>
    import Env from '../env';

    export default {
        name: 'table-filter',
        data() {
            return {
                filterText: ''
            }
        },
        methods: {
            doFilter() {
                this.$events.$emit(Env.eventsPrefix + 'filter-set', this.filterText);
            },
            resetFilter() {
                this.filterText = '';
                this.$events.$emit(Env.eventsPrefix + 'filter-reset');
            }
        }
    }
</script>