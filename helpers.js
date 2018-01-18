export default {
    inArray(needle, haystack) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] === needle) return true;
        }
        return false;
    },

    isSpecialField(field) {
        let specialFields = ['__actions', '__sequence', '__checkbox', '__slot'];
        return this.inArray(field, specialFields);
    },

    specialField(field) {
        if (typeof field === 'object') {
            return field.name;
        }
        return field;
    },

    getTemplateDir(ui) {
        if (ui === 'bootstrap') {
            return 'bootstrap';
        }

        return 'bootstrap';
    }
}