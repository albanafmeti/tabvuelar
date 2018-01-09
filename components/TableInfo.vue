<template>
    <div id="table-info">
        <span class="table-info-txt">Showing {{ tableData.meta.from }} to {{ tableData.meta.to }} of {{ tableData.meta.total }} entries</span>
    </div>
</template>
<script>

    export default {
        name: 'table-pagination',
        props: {
            tableData: {
                type: Object,
                required: true
            }
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
