// ==UserScript==
// @name           Peterzahlt Auto Click
// @namespace      http://userscripts.org/users/ant21
// @description    Auto click Peterzahlt ads and you can lie on bed to call.
// @include        http://www.peterzahlt.de/*
// ==/UserScript==

window.detect = function()
{
    location.href = "javascript:void(clickbanner(0));"; //click banner
}

window.setInterval(detect, 10000);
