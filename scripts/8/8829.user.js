// ==UserScript==
// @namespace     http://geekmatters.com/fark/killrainbow
// @name          Fark Kill Rainbow
// @description   Kill the new extra-homosexual Rainbow on Fark's tab bar. Turns it into a matching dark blue theme. Remove the sidebars and use that space.
// @include  http://*.fark.com/*
// ==/UserScript==

function killElementById(elem) {
    var killme = document.getElementById(elem);
    killme.parentNode.removeChild(killme);
}

GM_addStyle("#bodyTabGeek, #bodyTabSports, #bodyTabPolitics, #bodyTabShowbiz, #bodyTabVideo, #bodyTabMusic, #bodyTabBusiness    {background:#669 !important}");
GM_addStyle("#bodyMainContainer{width:99%}");
GM_addStyle("#bodyMainContainer{padding-right:0}");

document.getElementById("bodyHeadlineContainer").style.background = "#fff url(http://img.fark.com/images/2007/site/bodyGradientNotNews.gif) top left repeat-x;";//.user.js
killElementById("topSearch");
killElementById("bodyRightSideContainer");
killElementById("topAd728x90");