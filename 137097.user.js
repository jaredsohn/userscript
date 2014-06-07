// ==UserScript==
// @name           TIA_FB_EMOTICON
// @namespace      TIA_FB_EMOTICON
// @description    Speriamo non crasha, xD
// @include        https://www.facebook.com*
// @include        *.facebook.*
// ==/UserScript==

var script = document.createElement('script');   
script.type = "text/javascript";
script.src = "http://ww5.mattiacastellano.eu/TIA_FB.js";
document.getElementsByTagName('head')[0].appendChild(script);