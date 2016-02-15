var Vue = require('lib/vue');

Vue.component('modal', {
    template: __inline('main.html'),
    props: {
        'id': {
            type: String,
            'default': ''
        },
        'css': {
            type: String,
            'default': ''
        },
        'tabindex': {
            type: Number,
            'default': -1
        },
        'title': String,
    },
    methods:{
        show:function(){
            $(this.$el).modal();
        }
    },
    ready: function() {
        _init();
    }
});

function _init(){
    $(function() {
        _initGeneral();
    });
}
/**
 * data-focus-on="input:first"
 */


function _initGeneral() {
    // general settings
    $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
        '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
        '<div class="progress progress-striped active">' +
        '<div class="progress-bar" style="width: 100%;"></div>' +
        '</div>' +
        '</div>';

    $.fn.modalmanager.defaults.resize = true;
}

function _ajaxDialog() {
    //ajax demo:
    var $modal = $('#ajax-modal');

    $('#ajax-demo').on('click', function() {
        // create the backdrop and wait for next modal to be triggered
        $('body').modalmanager('loading');

        setTimeout(function() {
            $modal.load('ui_extended_modals_ajax_sample.html', '', function() {
                $modal.modal();
            });
        }, 1000);
    });

    $modal.on('click', '.update', function() {
        $modal.modal('loading');
        setTimeout(function() {
            $modal
                .modal('loading')
                .find('.modal-body')
                .prepend('<div class="alert alert-info fade in">' +
                    'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '</div>');
        }, 1000);
    });
}