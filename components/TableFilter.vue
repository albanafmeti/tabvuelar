<script>
    import Helpers from '../helpers';
    import Env from '../env';

    export default {
        name: 'table-filter',
        data() {
            return {
                filterText: ''
            }
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-filter.html');
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
<style lang="scss" scoped>
    #table-filter {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .reset-btn {
        margin-left: 10px;
    }
</style>