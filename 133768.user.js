// ==UserScript==
// @name        Hotmail Navigator
// @namespace   http://www.webmonkey.com
// @description A  Navigation Pane for Hotmail Inbox

// @version     v1.0
//@include      %mail.live.com%
//@Author       JITHIL P PONNAN
// ==/UserScript==

var _msn_live_navigation_pane_listner_setting_up_div_rem_class_set_attr_var = document.getElementById('contentLeft');_msn_live_navigation_pane_listner_setting_up_div_rem_class_set_attr_var.removeAttribute('class');_msn_live_navigation_pane_listner_setting_up_div_rem_class_set_attr_var.setAttribute('style', 'margin-top:48px;padding-bottom:12px;font-size:medium;padding-left:5px;position:fixed;overflow:scroll;font-size:small');_msn_live_navigation_pane_listner_setting_up_div_rem_class_set_attr_var.setAttribute('class', 'ContentLeft');