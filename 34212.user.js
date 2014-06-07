// ==UserScript==
// @name          Unblock Right-Click at Wretch
// @version       1.0
// @description	  Unblock Right-Click at Wretch
// @namespace     http://webdev.yuan.cc/
// @include       http://*.wretch.cc/*

// Whats New
// =========
// v1.0 21/8/05 First release
//
// Description
// ===========
// Wretch blocks three attributes of HTML elements: onDragStart, oncontextmenu, 
// and onSelectStart. This script unblocks the three events.
//
// Contact
// =======
// CK ( http://webdev.yuan.cc/ )

// ==/UserScript==

(function() {

var Wretch = new Object();

Wretch.unblockRightClick = function() {

    var bodyElm = document.getElementsByTagName('body')[0];
    bodyElm.setAttribute('onDragStart','');
    bodyElm.setAttribute('oncontextmenu','');
    bodyElm.setAttribute('onSelectStart','');
}

Wretch.unblockRightClick();


})();
