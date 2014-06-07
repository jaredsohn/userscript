// ==UserScript==
// @name        redhtml5kiss
// @namespace   mentormayhesset
// @description RedTube the HTML5 player [Firefox(GStreamer)+Greasemonkey>=1.0]
// @include     http://www.redtube.com/*
// @version     1.2
// @run-at      document-start
// @grant       none
// ==/UserScript==

Object.defineProperties(window,{
    'isHTMLSupported':{
        enumerable: true,
        value: true
    },
    'so':{
        enumerable: true,
        value:{
            addParam: function(){},
            write: function(){return false;}
        }
    }
});