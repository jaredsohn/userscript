// ==UserScript==
// @name	Page Visibility API emulation
// @description: Emulates page visibility API
// @version	2012.07.05
// @namespace	http://userscripts.org/scripts/show/137726
// @include	http://*
// @include	https://*
// @exclude	http://acid3.acidtests.org/*
// ==/UserScript==

;(function() {
    "use strict";

    if ( window.top !== window.self || document.visibilityState || document.webkitVisibilityState ||
        document.msVisibilityState || document.mozVisibilityState || document.oVisibilityState ) {
         return;
    }

    document.hidden = true;
    document.visibilityState = 'hidden';

    var event = null, i = 0;

    var fireEvent = function () {
        if (!event) {
            event = document.createEvent('HTMLEvents');
            event.initEvent('visibilitychange', true, true);
        }
        document.dispatchEvent(event);
    };
    var onfocus = function () {
        document.hidden = false;
        document.visibilityState = 'visible';
        fireEvent();
    };
    var onblur  = function () {
        document.hidden = true;
        document.visibilityState = 'hidden';
        fireEvent();
    };
    var onmousemove  = function () {
        if (document.hidden) {
            document.hidden = false;
            document.visibilityState = 'visible';
            fireEvent();
        }
        document.removeEventListener('mousemove',  onmousemove,  true);
    };

    window.addEventListener('focus', onfocus, true);
    window.addEventListener('blur',  onblur,  true);
    window.addEventListener('load',  fireEvent,  true);
    document.addEventListener('mousemove',  onmousemove,  true);
})();