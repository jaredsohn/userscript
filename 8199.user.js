// ==UserScript==
// @name           Uncheck Boxes
// @namespace      http://userscripts.org/users/24385/
// @description    Unchecks check boxes that are checked by default.
// @include        http://*
// @include        https://*
// ==/UserScript==

var cBoxes=document.getElementsByTagName('input')

for (var i=0; i < cBoxes.length; i++) {

    if (cBoxes[i].type=="checkbox") {

	cBoxes[i].checked=false

    }

}