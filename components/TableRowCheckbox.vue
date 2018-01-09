<template>
    <div class="table-row-checkbox">
        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
            <input v-model="state" type="checkbox" class="custom-control-input" @change="stateChanged">
            <span class="custom-control-indicator"></span>
        </label>
    </div>
</template>
<script>

    import Env from '../env';

    export default {
        name: 'table-row-checkbox',
        data: function () {
            return {
                state: false
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        created: function () {
            let _this = this;
            this.$events.$on(Env.eventsPrefix + 'select-all-checkboxes', function () {
                _this.state = true;
            });
            this.$events.$on(Env.eventsPrefix + 'deselect-all-checkboxes', function () {
                _this.state = false;
            });
        },
        methods: {
            stateChanged: function (event) {
                this.$events.$emit(Env.eventsPrefix + 'checkbox-state-changed', {
                    item: this.item,
                    state: this.state,
                    event: event
                })
            }
        }
    }
</script>