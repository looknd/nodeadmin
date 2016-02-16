define('modules/widget/adminheader/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('admin-header', {
      template: "<!-- BEGIN HEADER -->\r\n<div class=\"header navbar  navbar-fixed-top\">\r\n    <!-- BEGIN TOP NAVIGATION BAR -->\r\n    <div class=\"header-inner\">\r\n        <!-- BEGIN LOGO -->\r\n        <div class=\"page-logo\">\r\n            <a href=\"index.html\">\r\n                <img src=\"/static/img/logo.png\" alt=\"logo\"/>\r\n            </a>\r\n        </div>\r\n\r\n        <!-- END LOGO -->\r\n        <!-- BEGIN RESPONSIVE MENU TOGGLER -->\r\n        <a href=\"javascript:;\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n            <img src=\"/static/img/menu-toggler.png\" alt=\"\"/>\r\n        </a>\r\n        <!-- END RESPONSIVE MENU TOGGLER -->\r\n        <!-- BEGIN TOP NAVIGATION MENU -->\r\n        <ul class=\"nav navbar-nav pull-right\">\r\n            <!-- BEGIN NOTIFICATION DROPDOWN -->\r\n            <dropdown id=\"header_notification_bar\">\r\n                <dropdown-toggle icon=\"bell\" icontype=\"icon\" bname=\"6\" btype=\"success\"></dropdown-toggle>\r\n                <dropdown-menu css=\"extended notification\">\r\n                    <li><p>You have 14 new notifications</p></li>\r\n                    <li>\r\n                        <dropdown-menu-list>\r\n                            <notification-item href=\"#\" icon=\"plus\" type=\"success\" time=\"Just now\">New user registered.</notification-item>\r\n                            <notification-item href=\"#\" icon=\"bell\" type=\"danger\" time=\"15 mins\">Server #12 overloaded. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"plus\" type=\"warning\" time=\"22 mins\">Server #2 not responding. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"bullhorn\" type=\"info\" time=\"40 mins\">Application error. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"bolt\" type=\"danger\" time=\"2 hrs\">Database overloaded 68%. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"bolt\" type=\"danger\" time=\"5 hrs\">2 user IP blocked. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"bell\" type=\"warning\" time=\"45 mins\">Storage Server #4 not responding. </notification-item>\r\n                            <notification-item href=\"#\" icon=\"bullhorn\" type=\"info\" time=\"55 mins\">System Error.</notification-item>\r\n                            <notification-item href=\"#\" icon=\"bolt\" type=\"danger\" time=\"2 hrs\">Database overloaded 68%.</notification-item>\r\n                        </dropdown-menu-list>\r\n                    </li>\r\n                    <li class=\"external\">\r\n                        <link-item iconend=\"angle-right\"> See all notifications </link-item>        \r\n                    </li>\r\n                </dropdown-menu>            \r\n             </dropdown>\r\n            <!-- END NOTIFICATION DROPDOWN -->\r\n\r\n            <li class=\"devider\">\r\n                 &nbsp;\r\n            </li>\r\n\r\n            <!-- BEGIN USER LOGIN DROPDOWN -->      \r\n            <dropdown css=\"user\">\r\n                <dropdown-toggle imgsrc=\"/static/img/avatar3_small.jpg\" iconend=\"angle-down\">\r\n                    <span class=\"username\"> Nick </span>\r\n                </dropdown-toggle>\r\n                <dropdown-menu>\r\n                    <li>\r\n                        <link-item href=\"extra_profile.html\" icon=\"user\"> My Profile </link-item>\r\n                    </li>\r\n                    <li>\r\n                        <link-item href=\"page_calendar.html\" icon=\"calendar\"> My Calendar </link-item>\r\n                    </li>\r\n                    <li>\r\n                        <link-item href=\"page_inbox.html\" icon=\"envelope\" bname=\"3\" btype=\"danger\"> My Inbox </link-item>                       \r\n                    </li>\r\n                    <li>\r\n                        <link-item icon=\"tasks\" bname=\"7\" btype=\"success\"> My Tasks </link-item>\r\n                    </li>\r\n                    <li class=\"divider\"> </li>\r\n                    <li>\r\n                        <link-item href=\"login.html\" icon=\"key\"> Log Out </link-item>\r\n                    </li>\r\n                </dropdown-menu>\r\n            </dropdown>\r\n            <!-- END USER LOGIN DROPDOWN -->\r\n        </ul>\r\n        <!-- END TOP NAVIGATION MENU -->\r\n    </div>\r\n    <!-- END TOP NAVIGATION BAR -->\r\n</div>\r\n<!-- END HEADER -->",
      ready: function ready() {}
  });

});
