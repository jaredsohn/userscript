// ==UserScript==
// // @name        Facebook Cleaner
// // @namespace   http://bitantics.com/
// // @description Removes ticker and ads from Facebook
// // @include     http://facebook.com/*
// // @include     http://*.facebook.com/*
// // @include     https://facebook.com/*
// // @include     https://*.facebook.com/*
// // @author      Kevin Sullivan
// // @version     0.1
// // ==/UserScript==

(function() {
    // we will remove these with CSS, as Facebook's AJAX design will
    // keep spawning DOM nodes. So, let's not fight fire with fire.

    // make style element in the head
    var style = document.createElement('style');
    document.head.appendChild(style);

    // put in appropriate CSS
    style.innerHTML =
        '#pagelet_rhc_ticker, #pagelet_ego_pane, #pagelet_ticker, .fbSidebarGripper { \
            display: none;                                                            \
         }';
})();
