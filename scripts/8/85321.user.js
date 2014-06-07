// ==UserScript==
// @name        BU UIS courses information
// @namespace   BUuis
// @description 
// @include     https://iss.hkbu.edu.hk/sisweb/Guard/subj_main.jsp?*
// @version     0.0.1
// ==/UserScript==

var onloadFunction = function() {

document.body.innerHTML = document.body.innerHTML.replace(/<a href="javascript: popupwin = window.open(\'(.*)\',\'(.*)\',\'(.*)\');(.*)">/, '<a href="$1">');

}

document.addEventListener("load", onloadFunction, true);