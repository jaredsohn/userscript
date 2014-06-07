// ==UserScript==
// @name           eXa
// @namespace      http://exa.servhome.org
// @description    Remove Meebo bar from wixi !!
// @include        http://*.wixi.com/*
// ==/UserScript==

//Version 1.1 - August 17th, 2009
//Added support for all wixi pages
//
//Version 1 - August 17th, 2009


var remove = function(elem_id) {
    var elem = document.getElementById(elem_id);
    var parentNode = elem.parentNode;
    parentNode.removeChild(elem);
    var brs = parentNode.getElementsByTagName("br");
    parentNode.removeChild(brs[0]);
}

remove("meebo");