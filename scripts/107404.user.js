// ==UserScript==
// @name           Esconder areas sin utilidad / Encuentra24.com
// @namespace      Panama24
// @description    hides all non-sense except other stuff
// @include        http://www.encuentra24.com/*
// @include        http://encuentra24.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("li > a[title='Calculador'], td[width='480'] > div:first-child, div.box.shadow2.w815>div.content.w815>div.dataFlexibox.gradientX>h3, div.box.shadow2.w815>div.content.w815>div.dataFlexibox.gradientX>ul.detail-links, td div.box.shadow2.w330>div.content.w330>div.dataFlexibox.gradientX>table[width], #___plusone_0, fb, div.TitleAd, #header, #top, #topnav, div.dataFlexibox breadcrumb, div.box shadow2 w330, div.box.shadow2.w815 > div.content.search.w815 > div.dataFlexibox.breadcrumb, ins ins, #google_ads_frame2, #sendmessage, #right, #commentsholder, #footer { display: none; }"); //hides undesired info
    
addGlobalStyle("td:first-child div.box.shadow2.w330>div.content.w330>div.dataFlexibox.gradientX, #id element.classname { display: inline; }"); //unhides info
