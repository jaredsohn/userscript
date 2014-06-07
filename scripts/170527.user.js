// ==UserScript==
// @name        nwhere-skin
// @namespace   mythea.com
// @description nwhere skin
// @include     http://www.mythea.com/*
// @version     1
// ==/UserScript==
var css = "#nwhere div { background: url('http://i.imgur.com/sIXww.gif') no-repeat !important; }";
$(document).ready(function() {
    var el = document.createElement('style');
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
});
