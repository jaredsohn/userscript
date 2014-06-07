// ==UserScript==
// @name           MultiUpload Box Checker
// @namespace      Temp Namespc
// @description    Changes MultiUpload boxes check
// @include        http://www.multiupload.com/
// ==/UserScript==


var objs = document.getElementsByName('service_10');
if (objs.length == 1) {
  objs[0].checked = true;
}


var objs = document.getElementsByName('service_7');
if (objs.length == 1) {
  objs[0].checked = false;
}