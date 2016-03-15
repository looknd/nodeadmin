var Vue = require('lib/vue');

var Model = require('../model');
var saveModal = require('./savemodal/main');
var mixinsIndexModal = require('mixins/modal/crudindex/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'saveModal': saveModal,
    },
    mixins: [mixinsIndexModal],
    methods: {
        beforeShowDataGrid: function() {
            this.datagridTitle = '用户信息列表';
            this.datagridUrl = '/admin/user/getdata';

            this.datagridItem = Model.getDatagridItem([
                'id',
                'name',
                'pwd',
                'birthday',
                'createTime',
                'updateTime',
                'stateShow'
            ], {
                name: {
                    css: 'namecss'
                },
                pwd: {
                    hide: true
                }
            }, [{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }]);
        },
        beforeShowAddPage: function() {
            this.saveTitle = '新增用户信息';
            this.saveUrl = '/admin/user/add';

            this.initData = {
                birthday: '2016-03-01',
                state: '1',
            };
        },
        beforeShowModifyPage: function(data) {
            this.saveTitle = '修改用户信息';
            this.saveUrl = '/admin/user/modify';

            this.initData = $.extend({}, data);
        },
        beforeShowDetailPage: function(data) {
            this.detailTitle = '查看用户信息';

            this.initData = $.extend({}, data);
            this.detailField = Model.getNameMap([
                'id',
                'name',
                'birthday',
                'stateShow',
                'createTime',
                'updateTime'
            ]);
        },
        beforeShowDeletePage: function(data) {
            this.deleteTitle = '删除用户信息';
            this.deleteUrl = '/admin/user/delete';

            this.initData = $.extend({}, data);
            this.deleteField = Model.getNameMap([
                'id',
                'name',
                'stateShow',
                'createTime',
                'updateTime'
            ]);

            this.deleteParam = [{
                key: 'id',
                fieldName: 'id'
            }];
        },
    },
    ready: function() {

    }
});
