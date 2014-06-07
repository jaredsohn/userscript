// ==UserScript==
// @name          Digg Confirm Avoid
// @namespace     http://promote-my-site.com
// @description   Script to bypass Digg's Are you sure you want to delete this dialog
// @include       http://digg.com/users/*/friends/shoutsin*
// ==/UserScript==

document.location =
'javascript:function confirm(message) {' +
'return 1;'+
'}';
