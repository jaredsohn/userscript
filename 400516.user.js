// ==UserScript==
// @name        erkajw https handler
// @namespace   http://userscripts.org/user/587636
// @include     http://erkajw1.t15.org/*
// @version     1
// @grant       none
// ==/UserScript==
function myReplace(str, group1) {
    return '<a target="_blank" href="' + group1 + '">' + group1 + '</a>';
}
var lyst = document.getElementsByTagName('tr')
for (var i = 0; i < lyst.length; i++) {
    var el = lyst[i].lastChild
    if (typeof (el) != 'undefined' && el != null) {
        el.firstChild.innerHTML = el.firstChild.innerHTML.replace(/ (https:\/\/[^" ><]*)/gi, myReplace)
        el.firstChild.innerHTML = el.firstChild.innerHTML.replace(/^(https:\/\/[^" ><]*)/gi, myReplace)
    }
}
