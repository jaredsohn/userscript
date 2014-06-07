// ==UserScript==
// @name        Flickr - Fix Jumping & disable slow-down effects - by Kamil I http://kamil-1.tumblr.com
// @namespace   http://kamil-1.tumblr.com
// @description Fixes Flickr from jumbing when scrolling and disable slow-down css effects.
// @include     http://www.flickr.com/*
// @include     https://secure.flickr.com/*
// @version     1.8
// @run-at      document-start
// @grant    GM_addStyle
// ==/UserScript==
var style = 'body.with-eyebrow > #eyebrow {display: none !important;} *{-ms-transform: none!important;-webkit-transform: none!important;-o-transform: none!important;-moz-transform: none!important;transform: none!important;-moz-transition: none 0s ease 0s !important;-webkit-transition: none 0s ease 0s !important;-ms-transition: none 0s ease 0s !important;-o-transition: none 0s ease 0s !important;transition: none 0s ease 0s !important;text-shadow:none !important;-moz-box-shadow: none !important;-webkit-box-shadow:none !important;box-shadow:none !important;} .photo-display-container.ju .photo-display-item .meta{display:none;}#eyebrow, #refresh-announcement{display:none!important;}#gb-ac-wrap{z-index:999!important;}body.new-header{padding-top:0px!important} #global-nav{position:static !important}.with-eyebrow .subnav-refresh {margin-top: 0px !important;}';
GM_addStyle(style);
useEyebrow = false;

window.onload = function(){
document.body.classList.remove("with-eyebrow");
GM_addStyle(style);
(function (F) {
    var OFFSETS = {
        GLOBAL_NAV: null,
        UNIVERSAL_HEADER: null
    };

    function alignToAnchor(anchor, preventDelay) {
        return false;
    }

    function normalizeAnchor() {
        return false;
    }

    function handleEvent(elt, eventName, handler, useCapture) {
        return false;
    }
    F.anchorRepositioner = {
        init: function () {
            return false;
        }
    };
}(F));
F.anchorRepositioner.init();
}