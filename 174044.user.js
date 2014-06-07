// ==UserScript==
// @name        Netflix Remove FB
// @namespace   http://*.netflix.com/*
// @include     http://*.netflix.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function()
{
    var fb = document.getElementsByClassName('fb');
    i=0;
    for(i=0;i<fb.length;i++)
    {
        var fbEl = fb[i];
        fbEl.parentNode.removeChild(fbEl);
    }
})();
