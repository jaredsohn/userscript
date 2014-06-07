// ==UserScript==
// @name           Bleach Exile - No download counter
// @namespace      http://mablung.net
// @include        http://www.bleachexile.com/*
// ==/UserScript==

unsafeWindow.time = 0;
var b = document.getElementsByTagName('body')[0];
b.setAttribute('onload', 'document.downloadForm.submit(); ' +
'document.getElementById(\'enjoy\').removeAttribute(\'style\')');