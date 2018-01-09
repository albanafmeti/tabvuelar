<template>
    <div id="table-per-page">
        <div class="input-group">
            <div class="input-group-addon">Show entries:</div>
            <select v-model="itemsPerPage" class="form-control" @change.prevent="setPerPage(itemsPerPage)">
                <option :value="value" v-for="value in options">{{ value }}</option>
            </select>
        </div>
    </div>
</template>
<script>
    import Env from '../env';

    export default {
        name: 'table-per-page',
        props: {
            perPage: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                options: [
                    10,
                    25,
                    50,
                    100
                ],
                itemsPerPage: null
            }
        },
        created: function () {
            this.itemsPerPage = this.perPage
        },
        methods: {
            setPerPage(value) {
                this.$events.$emit(Env.eventsPrefix + 'per-page-set', value);
            }
        }
    }
</script>
<style lang="scss" scoped>
    #table-per-page {
        width: 200px;
        float: left;
    }
</style>
