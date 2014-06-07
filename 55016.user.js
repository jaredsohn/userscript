// ==UserScript==
// @name           ajaxian - apostrophe fix (â¬")
// @namespace      http://userscripts.org/users/40332
// @description    The apostrophe is sometimes displayed as "â¬"". This script fixes that issue.
// @include        http://ajaxian.com/*
// ==/UserScript==

var apostrophe = String.fromCharCode(226) + String.fromCharCode(8364) + String.fromCharCode(8482);
var re = new RegExp(apostrophe, 'g');
document.body.innerHTML = document.body.innerHTML.replace(re, '\'');