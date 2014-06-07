// ==UserScript==
// @name 		   JTrac : notification pane : taller
// @namespace	   http://jtrac.cib.net:8000/jtrac/app/item/
// @description	version 1 : pane is resizable, and default height is 30 lines.
// @include		http://jtrac.cib.net:8000/jtrac/app/item/*
// @include		http://jtrac.cib.net:8000/jtrac/app/item/form
// ==/UserScript==

window.xdx = function() {
    var styles= '.scrollable { height: 30em ! important ; resize: both;}';
    if (document.createStyleSheet) {
        document.createStyleSheet("javascript:'" + styles + "'");
    } else {
        var newSS; newSS=document.createElement('link');
        newSS.rel='stylesheet';
        newSS.href='data:text/css,' + escape(styles);
        document.getElementsByTagName('head')[0].appendChild(newSS);
    }
}

xdx();