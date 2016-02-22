var Vue = require('lib/vue');
//Vue.config.debug = true;

var validator = require('common/validator');
var Msg = require('/modules/widget/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined,
            item:undefined
        };
    },
    methods: {
        showModal: function(data) {

            this.item = data;

            this.$refs.user.init();

            this.$children[0].show();
        },
        hideModal: function() {
            this.$children[0].hide();
        },
        reportSuccess: function(data) {
            this.$dispatch('savesuccess', data);
        },
        checkOwnerId: function(name) {
            this.jqForm.valid();
        },
        saveSubmit: function(msg) {
            // 提交表单
            this.jqForm.submit();
        }
    },
    ready: function() {
        // 缓存该值，避免重复获取
        this.jqForm = $('form', $(this.$el));

        _init(this);
    }
});

function _init(vm) {
    $(function() {
        handleValidator(vm);
    });
}


function handleValidator(vm) {
    validator.check(vm.jqForm, {
        name: {
            required: {
                rule: true,
                message: '用户名不能为空！'
            },
            minlength: {
                rule: 2,
                message: '最小长度为2'
            },
            maxlength: {
                rule: 6,
                message: '最大长度为6'
            }
        }
    }, {
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(responseText, statusText) {
                    if (statusText !== 'success' || responseText.errno !== 0) {
                        // 提示失败
                        Msg.error('保存' + JSON.stringify(responseText.data) + '出错！');
                    } else {
                        // 提示成功
                        Msg.success('保存' + JSON.stringify(responseText.data) + '成功！');

                        // 关闭对话框
                        vm.hideModal();

                        // 刷新列表
                        vm.reportSuccess(responseText.data);
                    }
                }
            });
        }
    });
}