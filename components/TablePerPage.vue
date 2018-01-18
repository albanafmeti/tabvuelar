<script>
    import Helpers from '../helpers';
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

            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-per-page.html');

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
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>
