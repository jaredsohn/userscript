// ==UserScript==
// @name           OMGPOP.COM - Top Ad Remover
// @description    Removes the top banner and cleans it up with some CSS tweaks
// @include        http://*.omgpop.com/*
// @author         SailorJerry
// @version        1.0
// ==/UserScript==

var adTopBanner = document.getElementById("flash-banner-top");

if (adTopBanner)
{
        adTopBanner.parentNode.removeChild(adTopBanner);
}

GM_addStyle('.flashcontent-wrapper-wide { top: 0px !important; height:100% !important; border-top: 0px !important;}');