var Vue = require('lib/vue');

Vue.component('he-form-item', {
    template: __inline('main.html'),
    props: {
        /**
         * 
         */
        'title': String,

        'horizontal': {
            type: Boolean,
            'default': false
        },

        /**
         * 如果是水平排列的话，则需要定义左右的宽度，格式为x-x，其中x值为1到12
         */
        'col': {
            type: String,
            'default': '3-9'
        }

    },
    computed: {
        colLeft: function() {
            var defaultVal = 3,
                val;

            if (!this.col) {
                return defaultVal;
            }

            val = parseInt(this.col.split('-')[0], 10);

            if (isNaN(val) || val < 1 || val > 12) {
                return defaultVal;
            } else {
                return val;
            }
        },
        colRight: function() {
            var defaultVal = 9,
                val;

            if (!this.col) {
                return defaultVal;
            }

            val = parseInt(this.col.split('-')[1], 10);

            if (isNaN(val) || val < 1 || val > 12) {
                return defaultVal;
            } else {
                return val;
            }
        }
    },
    ready: function() {
       
    }
});
