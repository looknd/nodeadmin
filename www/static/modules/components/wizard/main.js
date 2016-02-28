define('modules/components/wizard/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var App = require('modules/common/app');
  var Validator = require('modules/common/validator');
  
  var WizardTitle = require('modules/components/wizard/title/main');
  var WizardSteps = require('modules/components/wizard/steps/main');
  var WizardProgress = require('modules/components/wizard/progress/main');
  var WizardTabPane = require('modules/components/wizard/tabpane/main');
  var WizardTabContent = require('modules/components/wizard/tabcontent/main');
  var WizardActions = require('modules/components/wizard/actions/main');
  
  var MSG_SUCCESS = 'TEST: Your form validation is successful!';
  var MSG_ERROR = 'TEST: You have some form errors. Please check below.';
  
  Vue.component('wizard', {
      template: "<div class=\"wizard\">\r\n    <portlet :title=\"title\" icon=\"reorder\" id=\"form_wizard_1\" bodycss=\"form\"> \r\n        <wizard-title slot=\"title\" :value=\"stepTitle\"></wizard-title>\r\n\r\n        <he-form id=\"submit_form\" inner=\"form-wizard\" actionscss=\"fluid\" horizontal>\r\n\r\n            <wizard-steps :index=\"stepIndex\" :items=\"stepItems\"></wizard-steps>\r\n            <wizard-progress :index=\"stepIndex\" :total=\"stepTotal\"></wizard-progress>\r\n\r\n            <wizard-tab-content>            \r\n                <tip-alert :type=\"msgType\" :msg=\"msgContent\" :hide=\"msgHide\"></tip-alert>\r\n                \r\n                <wizard-tab-pane css=\"active\" id=\"tab1\" title=\"Provide your account details\">\r\n                    <he-form-item title=\"用户名\" col=\"3-4\" help=\"Provide your username\" required horizontal>\r\n                        <input type=\"text\" name=\"username\" v-model=\"username\">\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab2\" title=\"Provide your profile details\">           \r\n                    <he-form-item title=\"Fullname\" col=\"3-4\" help=\"Provide your fullname\" required horizontal>\r\n                        <input type=\"text\" name=\"fullname\" v-model=\"fullname\">\r\n                    </he-form-item> \r\n\r\n                    <he-form-item title=\"Remarks\" col=\"3-4\" help=\"Provide your fullname\"  horizontal>\r\n                        <textarea rows=\"3\" name=\"remarks\"  v-model=\"remarks\"></textarea>\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab3\" title=\"Provide your billing and credit card details\">\r\n                    <he-form-item title=\"Card Holder Name\" col=\"3-4\" required horizontal>\r\n                        <input type=\"text\" name=\"card_name\" v-model=\"card_name\">\r\n                    </he-form-item> \r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab4\" title=\"Confirm your account\">\r\n\r\n                    <h4 class=\"form-section\">Account</h4>\r\n                    <he-form-item title=\"Username:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{username}} </p>\r\n                    </he-form-item>     \r\n\r\n                    <h4 class=\"form-section\">Profile</h4>     \r\n                    <he-form-item title=\"Fullname:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{fullname}} </p>\r\n                    </he-form-item>     \r\n                    <he-form-item title=\"Remarks:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{remarks}} </p>\r\n                    </he-form-item>      \r\n\r\n                    <h4 class=\"form-section\">Billing</h4>\r\n                    <he-form-item title=\"Card Holder Name:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{card_name}} </p>\r\n                    </he-form-item>      \r\n\r\n                </wizard-tab-pane>\r\n                \r\n            </wizard-tab-content>\r\n           \r\n            <wizard-actions slot=\"actions\" :index=\"stepIndex\" :total=\"stepTotal\"></wizard-actions>\r\n        </he-form>\r\n    </portlet>   \r\n</div>",
      components: {
          WizardTitle: WizardTitle,
          WizardSteps: WizardSteps,
          WizardProgress: WizardProgress,
          WizardTabPane: WizardTabPane,
          WizardTabContent: WizardTabContent,
          WizardActions: WizardActions
      },
      data: function data() {
          return {
              jqForm: undefined,
              stepIndex: 0,
              stepItems: [{
                  target: '#tab1',
                  title: 'Account Setup'
              }, {
                  target: '#tab2',
                  title: 'Profile Setup'
              }, {
                  target: '#tab3',
                  title: 'Billing Setup'
              }, {
                  target: '#tab4',
                  title: 'Confirm'
              }],
              msgContent: '',
              msgType: '',
              msgHide: true,
              username: '',
              fullname: '',
              remarks: '',
              card_name: ''
          };
      },
      computed: {
          /**
           * 一共有几个步骤
           */
          stepTotal: function stepTotal() {
              return this.stepItems.length;
          },
          /**
           * 在导航中显示的进度文字
           */
          stepTitle: function stepTitle() {
              return ' - Step ' + (this.stepIndex + 1) + ' of ' + this.stepTotal;
          }
      },
      props: {
          'title': String,
          'icon': String
      },
      methods: {
          showError: function showError(msg) {
              this.msgContent = msg || MSG_ERROR;
              this.msgType = 'danger';
              this.msgHide = false;
          },
          showSuccess: function showSuccess(msg) {
              this.msgContent = msg || MSG_SUCCESS;
              this.msgType = 'success';
              this.msgHide = false;
          },
          clearMsg: function clearMsg() {
              this.msgHide = true;
          },
          getRulesOptions: function getRulesOptions() {
              return {
                  //account
                  username: {
                      minlength: 5,
                      required: true
                  },
                  //profile
                  fullname: {
                      required: true
                  },
                  //payment
                  card_name: {
                      required: true
                  }
              };
          },
          init: function init() {
              if (!jQuery().bootstrapWizard) {
                  return;
              }
  
              var self = this,
                  form = this.jqForm;
  
              Validator.check(this.jqForm, this.getRulesOptions(), {
                  doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                  ignore: ':hidden',
  
                  invalidHandler: function invalidHandler(event, validator) {
                      //display error alert on form submit  
                      self.showError(MSG_ERROR);
  
                      App.scrollTo($('.alert-danger', form), -200);
                  },
  
                  success: function success(label) {
                      if (label.attr("for") == "gender" || label.attr("for") == "payment[]") {
                          // for checkboxes and radio buttons, no need to show OK icon
                          label.closest('.form-group').removeClass('has-error').addClass('has-success');
                          label.remove(); // remove error label here
                      } else {
                              // display success icon for other inputs
                              label.addClass('valid') // mark the current input as valid and display OK icon
                              .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                          }
                  },
  
                  submitHandler: function submitHandler(form) {
                      self.showSuccess(MSG_SUCCESS);
                      //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                  }
              });
  
              // default form wizard
              this._bootstrapWizard();
          },
          _bootstrapWizard: function _bootstrapWizard() {
              var self = this,
                  form = this.jqForm;
  
              var handleTitle = function handleTitle(tab, navigation, index) {
                  self.stepIndex = index;
  
                  App.scrollTo($('.page-title'));
              };
  
              $(this.$el).bootstrapWizard({
                  'nextSelector': '.button-next',
                  'previousSelector': '.button-previous',
                  onTabClick: function onTabClick(tab, navigation, index, clickedIndex) {
                      self.clearMsg();
  
                      if (form.valid() == false) {
                          return false;
                      }
  
                      handleTitle(tab, navigation, clickedIndex);
                  },
                  onNext: function onNext(tab, navigation, index) {
                      self.clearMsg();
  
                      if (form.valid() == false) {
                          return false;
                      }
  
                      handleTitle(tab, navigation, index);
                  },
                  onPrevious: function onPrevious(tab, navigation, index) {
                      self.clearMsg();
  
                      handleTitle(tab, navigation, index);
                  },
                  onTabShow: function onTabShow(tab, navigation, index) {
                      self.index = index;
                  }
              });
          }
      },
      ready: function ready() {
          this.jqForm = $('form', this.$el);
          this.init();
      }
  });

});
