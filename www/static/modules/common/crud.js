define('modules/common/crud', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  /**
   * 用于定义Vue组件的通用的一些设置
   * @type {Object}
   */
  var commonOptions = {
      template: '<div> EMPTY </div>',
      data: function data() {
          return {
              jqForm: undefined
          };
      },
      methods: {
          /**
           * 弹出对话框之前执行，比如初始化对话框中的表单数据等
           */
          beforeShowModal: function beforeShowModal() {},
  
          getValidatorConfig: function getValidatorConfig() {
              return {};
          },
  
          /**
           * 弹出对话框
           */
          showModal: function showModal() {
              this.beforeShowModal();
  
              this.$children[0].show();
          },
  
          /**
           * 关闭对话框
           */
          hideModal: function hideModal() {
              this.$children[0].hide();
          },
  
          /**
           * 提交表单且返回成功之后，向上冒泡事件，以便父组件能够进行下一步处理
           */
          reportSuccess: function reportSuccess(data) {
              this.$dispatch('savesuccess', data);
          },
  
          /**
           * 提交对话框中的表单
           */
          saveSubmit: function saveSubmit(msg) {
              this.jqForm.submit();
          },
  
          /**
           * 表单校验
           */
          handleValidator: function handleValidator() {
              var self = this;
  
              validator.check(this.jqForm, this.getValidatorConfig(), {
                  submitHandler: function submitHandler(form) {
                      $(form).ajaxSubmit({
                          success: function success(responseText, statusText) {
                              console.log(responseText, statusText);
  
                              if (statusText !== 'success' || responseText.errno !== 0) {
                                  // 提示失败
                                  Msg.error('出错了~~！失败原因：' + JSON.stringify(responseText.errmsg));
                              } else {
                                  // 提示成功
                                  Msg.success('^_^ 处理成功！');
  
                                  // 关闭对话框
                                  self.hideModal();
  
                                  // 刷新列表
                                  self.reportSuccess(responseText.data);
                              }
                          },
                          error: function error(err) {
                              console.error(err);
  
                              if (err.status === 500) {
                                  Msg.error('内部错误，请联系管理员！');
                              } else {
                                  Msg.error('出错了~~！失败原因为：' + JSON.stringify(err));
                              }
                          }
                      });
                  }
              });
          }
      },
      events: {
          /**
           * 监听子组件中的 'valuechange' 事件，然后对其进行表单校验
           * @param  {string} name   表单中某一表单元素的name属性值
           * @param  {string} val    新值
           * @param  {string} oldVal 旧值
           * @return {boolean}        校验结果
           */
          valuechange: function valuechange(name, val, oldVal) {
              return validator.valid(this.jqForm, name);
          }
      },
      ready: function ready() {
          this.jqForm = $('form', this.$el);
  
          this.handleValidator();
      }
  };
  
  module.exports = {
      extend: function extend(param) {
          // TODO 此处合并还可以进一步优化
  
          var options = $.extend({}, commonOptions);
  
          // 如果没有参数或参数不是object，则返回默认值
          if (typeof param !== 'object') {
              return options;
          }
  
          // template
          if (typeof param.template === "string") {
              options.template = param.template;
          }
  
          // data       
          if (typeof param.data === "object") {
              // 注意，这里的data要和commonOptions中的合并，而不是覆盖
              var newData = $.extend(options.data(), param.data);
  
              options.data = function () {
                  return newData;
              };
          }
  
          // 'methods' 和 'events'
          ['methods', 'events'].forEach(function (p) {
              options[p] = $.extend({}, options[p] || {}, param[p] || {});
          });
  
          // ready
          if (typeof param.ready === 'function') {
              options.ready = param.ready;
          }
  
          // ['methods', 'filters', 'directives', 'data'].forEach(function(p) {
          //     merge[p] = $.extend({}, commonOptions[p] || {}, o[p] || {});
          // });
  
          return Vue.extend(options);
      }
  };

});
