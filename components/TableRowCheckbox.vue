<script>
    import Helpers from '../helpers';
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

            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-row-checkbox.html');

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