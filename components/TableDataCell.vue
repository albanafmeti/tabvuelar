<script>
    import TableRowActions from './TableRowActions.vue';
    import TableRowCheckbox from './TableRowCheckbox.vue';

    import Helpers from '../helpers';
    import Env from '../env';

    export default {
        name: 'table-td',
        components: {
            'table-row-actions': TableRowActions,
            'table-row-checkbox': TableRowCheckbox,
        },
        props: {
            index: {
                type: Number,
                required: true
            },
            item: {
                type: Object,
                required: true
            },
            field: {
                type: [Object, String],
                required: true
            },
            transformers: {
                type: Object,
                required: false,
                'default': {}
            },
        },
        created: function () {
            let templateDir = Helpers.getTemplateDir(this.$pluginOptions.ui);
            this.$options.template = require('../templates/' + templateDir + '/table-data-cell.html');
        },
        data() {
            return {}
        },
        methods: {
            isSpecialField(field, value) {
                return Helpers.specialField(field) === value;
            },
            hasCallback(field) {
                return !!field.callback;
            },
            callCallback(field, item) {
                if (!this.hasCallback(field)) return;

                if (typeof(field.callback) == 'function') {
                    return field.callback(item[field.name])
                }

                let args = field.callback.split('|');
                let func = args.shift();

                if (typeof this.transformers[func] === 'function') {
                    let value = item[field.name];

                    return (args.length > 0)
                        ? this.transformers[func].apply(this.transformers, [value].concat(args))
                        : this.transformers[func].call(this.transformers, value)
                }
                return null;
            },
        }
    }
</script>