define('modules/widget/select2/main', function(require, exports, module) {

  /**
   * 有两种，一种是ajax请求的，一种是现成的
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.directive('select', {
      twoWay: true,
      priority: 1000,
  
      params: ['options'],
  
      bind: function bind() {
          var self = this;
          $(this.el).select2(this.params.options).on('change', function () {
              self.set(this.value);
          });
      },
      update: function update(value) {
          $(this.el).val(value).trigger('change');
      },
      unbind: function unbind() {
          $(this.el).off().select2('destroy');
      }
  });
  
  Vue.component('select2', {
      template: "<div>\r\n    <p>Selected: {{value}}</p>\r\n    <input type=\"hidden\" v-select=\"value\" :options=\"options\" style=\"width: 100%\" />\r\n</div>\r\n",
      props: {
          /**
           * 初始值
           */
          value: null,
          placeholder: {
              type: String,
              'default': '请选择'
          },
          allowClear: {
              type: Boolean,
              'default': false
          }
      },
      computed: {
          options: function options() {
              var result = {};
  
              result.data = [{
                  id: 1,
                  text: 'hello'
              }, {
                  id: 2,
                  text: 'world'
              }, {
                  id: 3,
                  text: 'what'
              }];
  
              console.log('-allowClear', this.allowClear);
  
              if (this.allowClear) {
                  result.allowClear = true;
              }
  
              result.placeholder = this.placeholder;
              console.log(result);
  
              return result;
          }
      },
      ready: function ready() {}
  });

});
