// ==UserScript==
// @name          Ma.gnolia Ad Remover
// @namespace     http://raneses.com/firefox/greasemonkey/magnolia
// @description   Removes Ma.gnolia ads
// @version       1.1.0
// @include       http://ma.gnolia.com/*
// ==/UserScript==

removeAds();

function removeAds()
{
    GM_addStyle(".banner { display: none; }");
    GM_addStyle(".advert { display: none; }");
    GM_addStyle(".textads { display: none; }");
}
