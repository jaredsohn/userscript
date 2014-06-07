// ==UserScript==
// @name    kolz_internal_use_skip_popup_ads
// @namespace    www.raphael-go.com
// @include    http://*.mimima.com/*
// ==/UserScript==

function f()
{
    form = document.getElementsByTagName("form")[0];
    form.onsubmit = function(){return true;};
}

f();