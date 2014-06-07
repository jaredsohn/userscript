// ==UserScript==
// @name           unDisable_ChangeResidence
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://www.erepublik.com/*/citizen/change-residence
// @description    Allows you to check on moving distance requirements while still employed.
// ==/UserScript==

document.addEventListener('DOMNodeInserted', function(event) {

var option = document.getElementsByTagName('option');

for (var i=0; i < option.length; i++) {
    thisOption = option[i];
thisOption.disabled = "";

}


}, false);