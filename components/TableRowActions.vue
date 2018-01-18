<script>
    import Helpers from '../helpers';

    export default {
        name: 'table-row-actions',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-row-actions.html');
        }
    }
</script>