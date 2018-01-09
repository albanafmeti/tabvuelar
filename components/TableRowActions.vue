<template>
    <div class="table-row-actions">
        <slot name="table-row-actions" :item="item"></slot>
    </div>
</template>
<script>

    export default {
        name: 'table-row-actions',
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>