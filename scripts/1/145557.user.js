// ==UserScript==
// @name        Back To The Future ! Multiline tabs for netvibes
// @namespace   nv_poweruser
// @description Bring back the multiline tabs for Netvibes
// @include     http://www.netvibes.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

var bttf = function () {
    document.getElementById('divTabs').childNodes[1].style.width = 'auto';
    document.getElementById('divTabs').childNodes[1].childNodes[0].childNodes[0].style.whiteSpace = 'normal';
    document.getElementById('newTab').style.height = '28px';
    unsafeWindow.App.tabView.scroller.scroller.elements.scroller.removeEvents('mousewheel');
    unsafeWindow.App.tabView.resize();
}

window.setTimeout(bttf, 200);
