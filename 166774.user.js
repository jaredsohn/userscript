// ==UserScript==
// @name           Bbox2
// @namespace      bcg
// @description    Auto connect to Bbox2
// @include        https://192.168.1.1/
// @include        http://192.168.1.1/
// ==/UserScript==
sn = "your Bbox2 S/N"
document.forms['form_contents'].elements[9].value = sn;
SendPassword();



