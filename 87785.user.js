// ==UserScript==
// @name           Online Soccer Manager Ads Remover
// @author         Turkdale (turkdale.nl)
// @namespace      http://userscripts.org/users/turkdale
// @description    A simple javascript to remove the ads on Online Soccer Manager.
// @include        http://*.onlinesoccermanager.*/*
// @history        Script is rewrited and works!
// ==/UserScript==

var divAdBannerTop = document.getElementById('divAdBannerTop');
if (divAdBannerTop) {
    divAdBannerTop.parentNode.removeChild(divAdBannerTop);
}

var tableAdStandard = document.getElementById('tableAdStandard');
if (tableAdStandard) {
    tableAdStandard.parentNode.removeChild(tableAdStandard);
}

var divAdSkyscraper = document.getElementById('divAdSkyscraper');
if (divAdSkyscraper) {
    divAdSkyscraper.parentNode.removeChild(divAdSkyscraper);
}

var tdFirstBannerTop = document.getElementById('tdFirstBannerTop');
if (tdFirstBannerTop) {
    tdFirstBannerTop.parentNode.removeChild(tdFirstBannerTop);
}

var tdSecBannerTop = document.getElementById('tdSecBannerTop');
if (tdSecBannerTop) {
    tdSecBannerTop.parentNode.removeChild(tdSecBannerTop);
}

var divBannerRight = document.getElementById('divBannerRight');
if (divBannerRight) {
    divBannerRight.parentNode.removeChild(divBannerRight);
}

var divAds = document.getElementById('divAds');
if (divAds) {
    divAds.parentNode.removeChild(divAds);
}