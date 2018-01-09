<template>
    <td class="table-td">

        <table-row-actions v-if="isSpecialField(field, '__actions')" :item="item">

            <template slot="table-row-actions" slot-scope="data">
                <slot name="tr-actions" :item="data.item"></slot>
            </template>

        </table-row-actions>

        <table-row-checkbox v-if="isSpecialField(field, '__checkbox')" :item="item">
        </table-row-checkbox>

        <p v-if="isSpecialField(field, '__slot')">
            <slot name="__slot" :item="item"></slot>
        </p>

        <span v-if="isSpecialField(field, '__sequence')">{{ index + 1 }}</span>
        <span v-if="hasCallback(field)" v-html="callCallback(field, item)"></span>
        <span v-else v-html="item[field.name]"></span>

    </td>


</template>
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