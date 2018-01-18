<script>
    import Helpers from '../helpers';

    export default {
        name: 'table-pagination',
        props: {
            tableData: {
                type: Object,
                required: true
            }
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-info.html');
        }
    }
</script>
<style lang="scss" scoped>
    #table-info {
        float: left;
    }

    .table-info-txt {
        font-size: 13px;
    }
</style>
